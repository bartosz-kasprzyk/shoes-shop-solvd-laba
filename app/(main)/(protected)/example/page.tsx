'use client';

import { Box, TextField } from '@mui/material';
import { useState } from 'react';
import { UIMessage, useChat } from '@ai-sdk/react';
import { ScrollableContainer } from '@/features/layout/components/ScrollableContainer';
import { useRouter } from 'next/navigation';
import ProductDetails from '@/features/products/components/ProductDetails';
import { ProductApiResponse } from '@/features/products/types/shared.interface';
import ProductCard from '@/features/products/components/ProductCard';
import ProductsContainer from '@/features/products/components/ProductsContainer';

export default function ExampleScrollablePage() {
  const [input, setInput] = useState('');
  const router = useRouter();
  const { messages, sendMessage } = useChat({
    async onToolCall({ toolCall }) {
      // Check if it's a dynamic tool first for proper type narrowing
      if (toolCall.dynamic) {
        return;
      }

      if (toolCall.toolName === 'redirect') {
        const { url } = toolCall.input as { url: string };
        // console.log(url);
        router.push(url);
      }
    },
  });

  return (
    <Box
      sx={{
        display: 'flex',
        flexDirection: 'column',
        width: '100%',
        maxWidth: '28rem',
        py: 2,
        mx: 'auto',
        height: '80%',
        border: '1px solid green',
      }}
    >
      <ScrollableContainer>
        {messages.map((message) => (
          <div key={message.id} className='whitespace-pre-wrap'>
            {message.role === 'user' ? 'User: ' : 'AI: '}
            {message.parts.map((part, i) => {
              switch (part.type) {
                case 'text':
                  return <div key={`${message.id}-${i}`}>{part.text}</div>;
                // case 'tool-search':
                //   if (part.state === 'output-available') {
                //     console.log('received value', part.output);
                //     return (
                //       <ProductsContainer
                //         key='wqrwe'
                //         products={part.output}
                //       />
                //     );
                //   }
              }
            })}
          </div>
        ))}
      </ScrollableContainer>

      <form
        onSubmit={(e) => {
          e.preventDefault();
          sendMessage({ text: input });
          setInput('');
        }}
      >
        <Box
          sx={{
            position: 'fixed',
            bottom: 0,
            width: '100%',
            maxWidth: '28rem',
            mb: 2,
            px: 0,
            left: '50%',
            transform: 'translateX(-50%)',
          }}
        >
          <TextField
            fullWidth
            variant='outlined'
            value={input}
            placeholder='Say something...'
            onChange={(e) => setInput(e.currentTarget.value)}
            sx={{
              bgcolor: (theme) =>
                theme.palette.mode === 'dark' ? 'grey.900' : 'background.paper',
              borderRadius: 1,
              boxShadow: 3,
              '& .MuiOutlinedInput-root': {
                borderColor: (theme) =>
                  theme.palette.mode === 'dark' ? 'grey.800' : 'grey.300',
              },
            }}
          />
        </Box>
      </form>
    </Box>
  );
}
