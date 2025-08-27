'use client';

import { RobotIcon } from '@/shared/icons';
import type { UIMessage } from '@ai-sdk/react';
import { useChat } from '@ai-sdk/react';
import { Box, Collapse, IconButton, Paper, TextField } from '@mui/material';
import type { UIDataTypes, UITools } from 'ai';
import { useSession } from 'next-auth/react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useEffect, useRef, useState } from 'react';
import UserMessage from '../UserMessage';
import BotMessage from '../BotMessage';

export default function Chatbot() {
  const [isOpen, setIsOpen] = useState(false);
  const { data: session } = useSession();

  const [input, setInput] = useState('');
  const router = useRouter();

  const { messages, sendMessage, addToolResult } = useChat({
    async onToolCall({ toolCall }) {
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

      //   if (toolCall.toolName === 'search') {
      //     // const { url } = toolCall. as { url: string };
      //     console.log(toolCall.dynamic?.valueOf);
      //     // console.log(url);
      //     // router.push(url);
      //   }
    },
  });

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
        case 'tool-search':
          const output = part.output;
          let href = '#';

          if (output && typeof output === 'object' && 'url' in output) {
            href = `${(output as { url: string }).url}`;
          }

          return (
            <pre key={`${message.id}-${i}`}>
              <Link href={href}>Filter result</Link>
              {/* <Box component={Link} href={href}>
                {message.
              </Box> */}
              {/* {JSON.stringify(part, null, 2)} */}
            </pre>
          );

        case 'tool-redirect': {
          const callId = part.toolCallId;

          switch (part.state) {
            case 'input-streaming':
              return <div key={callId}>Preparing redirection request...</div>;
            case 'input-available':
              return <div key={callId}>Getting location...</div>;
            case 'output-available': {
              const outputText =
                typeof part.output === 'string' ? part.output : '';
              return <div key={callId}>{outputText}</div>;
            }
            case 'output-error':
              return (
                <div key={callId}>Error getting location: {part.errorText}</div>
              );
          }
        }
      }
    });

  return (
    <Box position='fixed' bottom='16px' right='16px' zIndex={999}>
      <IconButton
        onClick={() => setIsOpen(!isOpen)}
        sx={{
          //   border: 1,
          bgcolor: '#FE645E',
          // transition:
          //   'opacity 0.3s ease, background-color 0.3s ease, boxShadow 0.3s ease',
          transition: 'box-shadow 0.3s ease',
          borderRadius: '50%',
          display: 'flex',
          boxShadow: '0px 4px 10px 0px #00000026',
          flexDirection: 'column',
          justifyContent: 'center',
          alignItems: 'center',
          zIndex: 2,
          '&:hover': {
            bgcolor: '#FE645E',
            boxShadow:
              '0px 6px 12px 0px color-mix(in srgb, var(--color-primary) 50%, #00000026)',
          },
          // ':hover': {
          //   bgcolor: '#FE645E',
          //   // bgcolor: 'color-mix(in srgb, #FE645E 20%, transparent)',
          // },
          position: 'relative',
          // zIndex: 999,
        }}
      >
        <RobotIcon color='#fff' />
      </IconButton>

      {/* Chat box */}
      <Collapse in={isOpen}>
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
                // gap: 4,
                // border: '1px solid green',
                // boxSizing: 'border-box',
              }}
            >
              <Box
                sx={{
                  py: 2,
                  flex: 1,
                  minHeight: 0,
                  overflowY: 'auto',
                  // pr: 2,
                  // border: '1px solid red',
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

              <form
                onSubmit={(e) => {
                  e.preventDefault();
                  sendMessage({ text: input });
                  setInput('');
                }}
              >
                <Box
                  sx={{
                    width: '100%',
                    // border: '1px solid red',
                    height: '40px',
                    m: 0,
                  }}
                >
                  <TextField
                    fullWidth
                    variant='outlined'
                    value={input}
                    placeholder='Enter your prompt here...'
                    onChange={(e) => setInput(e.currentTarget.value)}
                    slotProps={{
                      input: {
                        sx: {
                          height: '100%',
                          boxSizing: 'border-box',
                        },
                      },
                      root: {
                        sx: {
                          height: '100%',
                        },
                      },
                    }}
                  />
                </Box>
              </form>
            </Box>
          </Box>
        </Paper>
      </Collapse>
    </Box>
  );
}
