import type { TextUnderButtonProps } from '@/shared/components/ui/TextUnderButton/TextUnderButton';
import TextUnderButton from '@/shared/components/ui/TextUnderButton/TextUnderButton';
import { Box, Typography } from '@mui/material';

interface AuthPagesWrapperProps {
  title: string;
  description: string;
  form: React.ReactElement;
  textUnderButton?: TextUnderButtonProps;
}

export function AuthPagesWrapper({
  title,
  description,
  form,
  textUnderButton,
}: AuthPagesWrapperProps) {
  return (
    <Box
      mx='auto'
      maxWidth='580px'
      width='100%'
      my={4}
      sx={{
        boxSizing: 'border-box',
        p: 2,
      }}
    >
      <Typography
        variant='h3'
        fontWeight={500}
        mb={1}
        sx={{
          transition:
            'font-size 0.3s ease-in-out, line-height 0.3s ease-in-out',
          fontSize: { xs: '30px', sm: '38px', lg: '45px' },
        }}
      >
        {title}
      </Typography>

      <Typography
        variant='body1'
        fontWeight={300}
        mb={3}
        sx={{
          color: 'color-mix(in srgb, black 60%, transparent)',
          transition:
            'font-size 0.3s ease-in-out, line-height 0.3s ease-in-out',
          fontSize: { xs: '10px', sm: '12px', lg: '15px' },
        }}
      >
        {description}
      </Typography>

      {form}

      {textUnderButton && (
        <TextUnderButton
          text={textUnderButton.text}
          linkText={textUnderButton.linkText}
          href={textUnderButton.href}
        />
      )}
    </Box>
  );
}
