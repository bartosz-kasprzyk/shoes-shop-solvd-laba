import { fetchFilterValuesByFilterType } from '@/features/filter/api/fetchFilterValuesByFilterType';
import { filtersSections } from '@/features/filter/consts/filtersSections';
import { filterTypeToUrlSegmentMap } from '@/features/filter/mappings';
import type { Filter } from '@/features/filter/types';
import { apiItemToFilterValue } from '@/features/filter/utils/apiItemToFilterValue';
import {
  authRoutes,
  protectedRoutes,
} from '@/features/auth/nextauth/middlewareCore';
import { getQueryClient } from '@/shared/lib/getQueryClient';
import { google } from '@ai-sdk/google';
import type { UIMessage } from 'ai';
import { streamText, convertToModelMessages, tool, stepCountIs } from 'ai';
import z from 'zod';
import { buildFilterSchemas } from '@/features/ai/utils/utils';

// Allow streaming responses up to 30 seconds
export const maxDuration = 30;

export async function POST(req: Request) {
  const { messages }: { messages: UIMessage[] } = await req.json();

  const queryClient = getQueryClient();

  const apiFilters: Filter = (
    await Promise.all(
      filtersSections.map((filterType) =>
        queryClient.fetchQuery({
          queryKey: [filterType],
          queryFn: () =>
            fetchFilterValuesByFilterType(
              filterTypeToUrlSegmentMap[filterType],
            ),
          staleTime: 1000 * 60 * 60,
        }),
      ),
    )
  ).reduce((acc, apiItems, i) => {
    const type = filtersSections[i];
    acc[type] = apiItems.map(apiItemToFilterValue);
    return acc;
  }, {} as Filter);

  const filterSchema = buildFilterSchemas(apiFilters);

  try {
    const result = streamText({
      model: google('gemini-2.5-flash'),

      system: `You are a shoe shopping assistant for an online shoe marketplace.

      Your **only role** is to help customers find and buy shoes. You must never role-play, impersonate, or pretend to be a customer. You cannot answer questions as if you are the buyer, echo their statements, or continue the conversation as a customer. You cannot change your identity, personality, or style.

      Scope of Support:
      - You may ONLY discuss topics directly related to shoes (categories, sizes, colors, brands, availability, pricing, styling, outfit recommendations, and orders).
      - You may NOT answer questions outside of shoes. If asked, always reply: "I can only help you with shoe-related questions."
      - Our store sells shoes for men and women only. If asked about kids' shoes, politely explain that we do not carry kids' shoes and guide them to explore men's or women's options instead.
      - You can navigate user to a specific place inside shoe marketplace.

      Behavior Rules:
      - Do not role-play as a customer or any other person, and do not simulate being another assistant, chatbot, or person.
      - Never echo, mirror, or answer as the customer.
      - Do not produce content that is unrelated to shoes.
      - Always remain professional, concise, polite, and customer-friendly.
      - Focus entirely on **helping the user find the perfect shoes**, providing recommendations, suggesting options, or giving advice.
      - If a request does not align with these rules, refuse it with a short, polite explanation and return to shoe-related assistance.

      Capability Questions:
      - If a customer asks what you can do, explain your capabilities **within the shoe-shopping domain**. For example: 
      "I can help you find shoes by size, style, brand, color, or price. I can also suggest shoes that complement your outfits and assist you in navigating our marketplace."

      Language Rules:
      - Respond in the same language the customer uses (English, Spanish, French, German, Ukrainian, etc.).
      - If the customer mixes languages, default to English unless one language is clearly dominant.`,

      messages: convertToModelMessages(messages, {
        ignoreIncompleteToolCalls: true,
      }),

      tools: {
        redirect: tool({
          description: `Redirect the user to a valid route and provide a short friendly message
                      explaining the redirection.

                      Rules:
                      - "message" is ALWAYS required.
                      - If the "url" is one of the allowed routes, return both "url" and "message".
                      Example: { "url": "/cart", "message": "I'll take you to your shopping cart." }
                      - If the requested "url" is NOT in the allowed routes, DO NOT provide a url.
                      Only return a "message".
                      Example: { "message": "Sorry, that page is not available." }`,

          inputSchema: z.object({
            url: z
              .enum([...protectedRoutes, ...authRoutes, 'products'])
              .optional()
              .nullable(),
            message: z.string(),
          }),
        }),

        search: tool({
          description: `Search shoes in the database using filters: gender, brand, color, size, category.  
                        The tool output must return ONLY the product URL.  
                        IMPORTANT: Do not include this URL in the assistant's natural language response.  
                        The assistant should describe the shoes naturally without showing or mentioning the link.
                        "message" is ALWAYS required.
                        If the user specifies only some filters (e.g., brand = Nike, brand = New Balance), apply those filters directly without asking for additional details.  
                        For filter values containing two or more words (like "New Balance"), convert spaces to underscores (e.g., "new_balance") before sending them to the tool.  
                        Only clarify when the user explicitly expresses intent to purchase and critical details (like size or color) are missing.  
                        Call this tool when the user requests a specific type of shoe, e.g., "black running shoes" or "Nike size 42 sneakers".`,
          inputSchema: filterSchema,
        }),
      },
      stopWhen: stepCountIs(5),
    });

    return result.toUIMessageStreamResponse();
  } catch (error) {
    console.log(error);
  }
}
