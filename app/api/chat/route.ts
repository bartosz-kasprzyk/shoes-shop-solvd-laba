import { fetchFilterValuesByFilterType } from '@/features/filter/api/fetchFilterValuesByFilterType';
import { filtersSections } from '@/features/filter/consts/filtersSections';
import { filterTypeToUrlSegmentMap } from '@/features/filter/mappings';
import type { Filter } from '@/features/filter/types';
import { apiItemToFilterValue } from '@/features/filter/utils/apiItemToFilterValue';
import { authRoutes, protectedRoutes } from '@/middleware';
import { getQueryClient } from '@/shared/lib/getQueryClient';
// import { mistral } from '@ai-sdk/mistral';
import { google } from '@ai-sdk/google';
import type { InferUITools, UIDataTypes, UIMessage } from 'ai';
import { streamText, convertToModelMessages, tool, stepCountIs } from 'ai';
import z from 'zod';

// Allow streaming responses up to 30 seconds
export const maxDuration = 30;

// const tools = {
//   redirect: tool({
//     description: `
//    Redirect the user to a valid route and provide a short friendly message
//    explaining the redirection.

//    Rules:
//    - "message" is ALWAYS required.
//    - If the "url" is one of the allowed routes, return both "url" and "message".
//      Example: { "url": "/cart", "message": "I'll take you to your shopping cart." }
//    - If the requested "url" is NOT in the allowed routes, DO NOT provide a url.
//      Only return a "message".
//      Example: { "message": "Sorry, that page is not available." }
//  `,
//     inputSchema: z.object({
//       url: z.enum([...protectedRoutes, ...authRoutes, 'products']).optional(),
//       message: z.string(),
//     }),
//   }),

// search: tool({
//   description: `Search shoes in the database using filters: gender, brand, color, size, category, and price.
//                     Call this tool when the user requests a specific type of shoe, e.g., "black running shoes" or "Nike size 42 sneakers".`,
//   inputSchema: filterSchema,
//   // outputSchema: z.object({
//   //   url: z.string(),
//   // }),
//   outputSchema: z.object({
//     url: z.string(),
//   }),
//   execute: async (input) => {
//     const normalize = (v?: string | string[]) =>
//       v ? (Array.isArray(v) ? v : [v]) : [];

//     const gender = normalize(input.gender);
//     const brand = normalize(input.brand);
//     const color = normalize(input.color);
//     const size = normalize(input.size);
//     const category = normalize(input.category);

//     console.log({ gender, brand, color, size, category });
//     const result = applyFilters({ gender, brand, color, size, category });
//     console.log(result);

//     return {
//       url: result,
//     };
//   },
// }),
// };

// export type ChatTools = InferUITools<typeof tools>;
// export type ChatMessage = UIMessage<never, UIDataTypes, ChatTools>;

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
        }),
      ),
    )
  ).reduce((acc, apiItems, i) => {
    const type = filtersSections[i];
    acc[type] = apiItems.map(apiItemToFilterValue);
    return acc;
  }, {} as Filter);

  const filterSchema = buildFilterSchemas(apiFilters);

  const result = streamText({
    // model: mistral('mistral-large-latest'),
    model: google('gemini-2.5-flash-lite'),

    system: `You are a helpful and knowledgeable assistant for a shoe marketplace.
            Your role is to guide customers in finding and buying the right shoes.
            
            Our website sells shoes for men and women only. 
            If a customer asks for kids' shoes, politely explain that we do not carry kids' shoes 
            and guide them to explore men's or women's options instead. 
            Do NOT just repeat the fallback message.

            Language rules:
            - Respond in the same language the user uses (support English, Spanish, French, German, Ukrainian, etc.).
            - If the user mixes languages, default to English unless otherwise clear.
            - Keep tone concise, polite, and customer-friendly.

            Instructions:
            - Only answer questions related to shoes, categories, sizes, colors, brands, availability, pricing, orders.
            - Do NOT answer general knowledge questions (e.g., math, history, trivia, or unrelated topics).
            If asked such a question, politely reply: "I can only help you with shoe-related questions."
           
            - Provide styling and outfit recommendations where relevant.
            - Be concise, polite, and customer-friendly.
            - If information is missing, ask clarifying questions or explain how to find it in the store.`,

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
                      The client application is responsible for displaying the URL separately.
                      Call this tool when the user requests a specific type of shoe, e.g., "black running shoes" or "Nike size 42 sneakers".`,
        inputSchema: filterSchema,
        // outputSchema: z.object({
        //   url: z.string(),
        // }),
        outputSchema: z.object({
          url: z.string(),
        }),
        execute: async (input) => {
          const normalize = (v?: string | string[]) =>
            v ? (Array.isArray(v) ? v : [v]) : [];

          const gender = normalize(input.gender);
          const brand = normalize(input.brand);
          const color = normalize(input.color);
          const size = normalize(input.size);
          const category = normalize(input.category);

          console.log({ gender, brand, color, size, category });
          const result = applyFilters({ gender, brand, color, size, category });
          // console.log(result);

          return {
            url: result,
          };
        },
      }),
    },
    // tools,
    stopWhen: stepCountIs(5),
  });

  // result.

  return result.toUIMessageStreamResponse();
}

function extractEnumValues(arr: { slug: string }[]) {
  return arr.map((item) => item.slug) as [string, ...string[]];
}

function safeEnum(values: { slug: string }[] | undefined) {
  if (!values || values.length === 0) {
    return z.string();
  }
  return z.enum(extractEnumValues(values));
}

function buildFilterSchemas(filters: any) {
  return z.object({
    gender: z
      .union([safeEnum(filters.gender), z.array(safeEnum(filters.gender))])
      .optional(),
    brand: z
      .union([safeEnum(filters.brand), z.array(safeEnum(filters.brand))])
      .optional(),
    color: z
      .union([safeEnum(filters.color), z.array(safeEnum(filters.color))])
      .optional(),
    size: z
      .union([safeEnum(filters.size), z.array(safeEnum(filters.size))])
      .optional(),
    category: z
      .union([safeEnum(filters.category), z.array(safeEnum(filters.category))])
      .optional(),
  });
}

function applyFilters(filters: Partial<Record<string, string[]>>) {
  const segments: string[] = Object.entries(filters).map(
    ([filterType, filterSlugs]) =>
      Array.isArray(filterSlugs) && filterSlugs.length > 0
        ? `${filterType}:${filterSlugs.join('-')}`
        : '',
  );
  return `/products/${segments.filter(Boolean).join('/')}`;
}
