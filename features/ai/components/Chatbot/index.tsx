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
  Typography,
} from '@mui/material';
import type { UIDataTypes, UIMessagePart, UITools } from 'ai';
import { useSession } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import { useEffect, useRef, useState } from 'react';
import UserMessage from '../UserMessage';
import BotMessage from '../BotMessage';
import { XIcon } from '@/shared/icons/XIcon';
import { applyFilters } from '../../utils/utils';

export default function Chatbot() {
  const [isOpen, setIsOpen] = useState(false);
  const { data: session } = useSession();

  const [input, setInput] = useState('');
  const router = useRouter();

  const { messages, sendMessage, addToolResult, error, setMessages, status } =
    useChat({
      async onToolCall({ toolCall }) {
        if (error) {
          return;
        }
        // Check if it's a dynamic tool first for proper type narrowing
        if (toolCall.dynamic) {
          return;
        }

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
          const input = toolCall.input as {
            gender?: string;
            brand?: string | string[];
            color?: string | string[];
            size?: string | string[];
            category?: string;
            message: string;
          };

          const normalize = (v?: string | string[]) =>
            v ? (Array.isArray(v) ? v : [v]) : [];

          const gender = normalize(input.gender);
          const brand = normalize(input.brand);
          const color = normalize(input.color);
          const size = normalize(input.size);
          const category = normalize(input.category);

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
      messagesEndRef.current.scrollIntoView({
        behavior: 'smooth',
        block: 'nearest',
        inline: 'nearest',
      });
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
          popper: {
            sx: {
              bgcolor: '#FE645E',
              fontSize: '0.9rem',
              p: 1.5,
              '& .MuiTooltip-tooltip': {
                bgcolor: '#FE645E',
              },
            },
          },
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
              width: { xs: '300px', md: '400px' },
              height: '500px',
              position: 'absolute',
              bottom: '56px',
              right: 0,
              borderRadius: '8px',
              overflow: 'hidden',
              display: 'flex',
              flexDirection: 'column',
            }}
          >
            {/* Header */}
            <Box
              sx={{
                height: '60px',
                flexShrink: 0,
                display: 'flex',
                alignItems: 'center',
                gap: 2,
                px: 2,
                borderBottom: '1px solid #ddd',
                bgcolor: 'white',
              }}
            >
              <RobotIcon color='#5C5C5C' />
              <Typography sx={{ color: '#5C5C5C' }}>AI Assistant</Typography>
              <IconButton
                onClick={() => setIsOpen(false)}
                sx={{
                  width: '36px',
                  height: '36px',
                  bgcolor: 'white',
                  ml: 'auto',
                  '&:hover': {
                    borderRadius: '10px',
                  },
                }}
              >
                <XIcon color='#5C5C5C' />
              </IconButton>
            </Box>

            {/* Messages */}
            <Box
              sx={{
                flex: 1,
                minHeight: 0,
                overflowY: 'auto',
                display: 'flex',
                flexDirection: 'column',
                gap: 2,
                p: 2,
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
              <Box ref={messagesEndRef} />
            </Box>

            {/* Form */}
            <Box
              component='form'
              autoComplete='off'
              onSubmit={(e) => {
                e.preventDefault();
                if (input.length > 0) {
                  sendMessage({ text: input });
                  setInput('');
                }
              }}
              sx={{
                height: '60px',
                flexShrink: 0,
                display: 'flex',
                alignItems: 'center',
                gap: 2,
                borderTop: '1px solid #ddd',
                px: 2,
                bgcolor: 'white',
              }}
            >
              <TextField
                fullWidth
                variant='outlined'
                value={input}
                placeholder='Enter your prompt here...'
                onChange={(e) => setInput(e.currentTarget.value)}
                sx={{
                  '& fieldset': { border: 'none' },
                  '& .MuiOutlinedInput-input': {
                    px: 0,
                    fontSize: '16px',
                  },
                  height: '100%',
                }}
              />
              <IconButton
                type='submit'
                sx={{
                  width: '40px',
                  height: '40px',
                  borderRadius: '50%',
                  bgcolor: '#FE645E',
                  overflow: 'hidden',
                  transition: 'box-shadow 0.3s ease',
                  '&:hover': {
                    bgcolor: '#FE645E',
                    boxShadow:
                      '0px 4px 10px 0px color-mix(in srgb, var(--color-primary) 50%, #00000026)',
                  },
                }}
                disabled={status === 'streaming' || input.length < 1}
              >
                <ArrowUp color='white' />
              </IconButton>
            </Box>
          </Paper>
        </Grow>
      </Collapse>
    </Box>
  );
}
