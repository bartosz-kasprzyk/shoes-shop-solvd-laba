'use client';

import { ArrowUp, RobotIcon } from '@/shared/icons';
import type { UIMessage } from '@ai-sdk/react';
import { useChat } from '@ai-sdk/react';
import {
  Box,
  Collapse,
  Grow,
  IconButton,
  Paper,
  TextField,
  Tooltip,
} from '@mui/material';
import type { UIDataTypes, UIMessagePart, UITools } from 'ai';
import { useSession } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import { useEffect, useRef, useState } from 'react';
import UserMessage from '../UserMessage';
import BotMessage from '../BotMessage';

export default function Chatbot() {
  const [isOpen, setIsOpen] = useState(false);
  const { data: session } = useSession();

  const [input, setInput] = useState('');
  const router = useRouter();

  const { messages, sendMessage, addToolResult, error, setMessages } = useChat({
    async onToolCall({ toolCall }) {
      if (error) {
        return;
      }
      // Check if it's a dynamic tool first for proper type narrowing
      if (toolCall.dynamic) {
        return;
      }

      // switch(toolCall.toolName) {
      //   case 'redirect': {
      //     const {} = toolCall.
      //   }
      //   case 'filter': {

      //   }

      // }

      if (toolCall.toolName === 'redirect') {
        const { url, message } = toolCall.input as {
          url?: string | null;
          message: string;
        };

        router.push(url ? url : '');

        addToolResult({
          tool: 'redirect',
          toolCallId: toolCall.toolCallId,
          output: message,
        });
      }

      if (toolCall.toolName === 'search') {
        console.log('tool is working');
        const input = toolCall.input as {
          gender?: string;
          brand?: string | string[];
          color?: string | string[];
          size?: string | string[];
          category?: string;
          message: string;
        };

        console.log('something wrong');

        const normalize = (v?: string | string[]) =>
          v ? (Array.isArray(v) ? v : [v]) : [];

        const gender = normalize(input.gender);
        const brand = normalize(input.brand);
        const color = normalize(input.color);
        const size = normalize(input.size);
        const category = normalize(input.category);

        console.log({ gender, brand, color, size, category });
        const result = applyFilters({ gender, brand, color, size, category });

        router.push(result ? result : '');

        addToolResult({
          tool: 'search',
          toolCallId: toolCall.toolCallId,
          output: input.message,
        });
      }
    },
  });

  useEffect(() => {
    setMessages([
      {
        id: 'initial',
        role: 'assistant',
        parts: [
          {
            text: 'Hello! I’m your AI assistant. How can I help you today?',
            type: 'text',
          } as UIMessagePart<UIDataTypes, UITools>,
        ],
      } as UIMessage<unknown, UIDataTypes, UITools>,
    ]);
  }, []);

  const messagesEndRef = useRef<HTMLDivElement | null>(null);
  useEffect(() => {
    if (messagesEndRef.current) {
      messagesEndRef.current.scrollIntoView({ behavior: 'smooth' });
    }
  }, [messages]);

  const renderParts = (message: UIMessage<unknown, UIDataTypes, UITools>) =>
    message.parts.map((part, i) => {
      switch (part.type) {
        case 'text':
          return <div key={`${message.id}-${i}`}>{part.text}</div>;

        case 'tool-redirect': {
          const callId = part.toolCallId;
          if (part.state === 'output-available') {
            const outputText =
              typeof part.output === 'string' ? part.output : '';
            return <div key={callId}>{outputText}</div>;
          } else if (part.state === 'output-error') {
            return (
              <div key={callId}>Something went wrong, try again later.</div>
            );
          }
          return null;
        }

        case 'tool-search': {
          const callId = part.toolCallId;
          if (part.state === 'output-available') {
            const outputText =
              typeof part.output === 'string' ? part.output : '';
            return <div key={callId}>{outputText}</div>;
          } else if (part.state === 'output-error') {
            return (
              <div key={callId}>Something went wrong, try again later.</div>
            );
          }
          return null;
        }

        default:
          return null;
      }
    });

  return (
    <Box position='fixed' bottom='16px' right='16px' zIndex={999}>
      <Tooltip
        title='Chat with our assistant!'
        arrow
        placement='left'
        slotProps={{
          tooltip: { sx: { bgcolor: '#FE645E', fontSize: '0.9rem', p: 1.5 } },
          arrow: {
            sx: {
              color: '#FE645E',
            },
          },
        }}
      >
        <IconButton
          onClick={() => setIsOpen(!isOpen)}
          sx={{
            bgcolor: '#FE645E',
            transition: 'box-shadow 0.3s ease',
            borderRadius: '50%',
            display: 'flex',
            boxShadow: '0px 4px 10px 0px #00000026',
            flexDirection: 'column',
            justifyContent: 'center',
            alignItems: 'center',
            zIndex: 999,
            '&:hover': {
              bgcolor: '#FE645E',
              boxShadow:
                '0px 6px 12px 0px color-mix(in srgb, var(--color-primary) 50%, #00000026)',
            },
            position: 'relative',
          }}
        >
          <RobotIcon color='#fff' />
        </IconButton>
      </Tooltip>

      {/* Chat box */}
      <Collapse in={isOpen}>
        <Grow
          in={isOpen}
          mountOnEnter
          unmountOnExit
          style={{ transformOrigin: 'bottom right' }}
          timeout={500}
        >
          <Paper
            elevation={3}
            sx={{
              width: { xs: '300px', md: '400px', lg: '500px' },
              height: '500px',
              transition: 'width 0.3s ease-in-out',
              position: 'absolute',
              bottom: '56px', // space above button
              right: 0,
              borderRadius: '8px',
              overflow: 'hidden',
              display: 'flex',
              flexDirection: 'column',
              // boxSizing: 'border-box',
            }}
          >
            <Box sx={{ p: 2, flex: 1, minHeight: 0 }}>
              <Box
                sx={{
                  flex: 1,
                  minHeight: 0,
                  display: 'flex',
                  flexDirection: 'column',
                  justifyContent: 'space-between',
                  width: '100%',
                  mx: 'auto',
                  height: '100%',
                  maxHeight: '100%',
                }}
              >
                <Box
                  sx={{
                    py: 2,
                    flex: 1,
                    minHeight: 0,
                    overflowY: 'auto',
                    display: 'flex',
                    flexDirection: 'column',
                    gap: 2,
                    // scrollbarGutter: 'stable',
                    scrollbarWidth: 'none',
                    '&::-webkit-scrollbar': { display: 'none' },
                  }}
                >
                  {messages.map((message) =>
                    message.role === 'user' ? (
                      <UserMessage key={message.id} session={session}>
                        {renderParts(message)}
                      </UserMessage>
                    ) : (
                      <BotMessage key={message.id}>
                        {renderParts(message)}
                      </BotMessage>
                    ),
                  )}

                  <Box component={'div'} ref={messagesEndRef}></Box>
                </Box>

                <Box
                  component='form'
                  autoComplete='off'
                  onSubmit={(e) => {
                    e.preventDefault();
                    sendMessage({ text: input });
                    setInput('');
                  }}
                  sx={{ height: '40px' }}
                >
                  <TextField
                    fullWidth
                    variant='outlined'
                    value={input}
                    placeholder='Enter your prompt here...'
                    onChange={(e) => setInput(e.currentTarget.value)}
                    sx={{
                      '& .MuiInputBase-root': {
                        // alignItems: 'flex-start', // align text top when multiline
                        // border: '1px solid brown',
                      },

                      '& textarea': {
                        overflow: 'auto', // make textarea scrollable
                      },
                      height: '100%',
                      boxSizing: 'border-box',
                      // marginBottom: '40px',
                    }}
                    slotProps={{
                      input: {
                        sx: {
                          height: '100%',
                          padding: '5px',
                          // border: '1px solid red',
                        },
                      },
                    }}
                  />
                </Box>
              </Box>
            </Box>
          </Paper>
        </Grow>
      </Collapse>
    </Box>
  );
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
