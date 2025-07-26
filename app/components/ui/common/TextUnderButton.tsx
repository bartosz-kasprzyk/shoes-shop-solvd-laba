import { Typography, Link } from '@mui/material';

interface TextUnderButtonProps {
  text?: string;
  linkText: string;
  href: string;
}

export default function TextUnderButton({
  text,
  linkText,
  href,
}: TextUnderButtonProps) {
  return (
    <Typography
      align='center'
      sx={{
        fontWeight: 500,
        mt: { xs: 2, lg: 3 },
        mb: { xs: 2, lg: 3 },
        fontSize: { xs: '10px', sm: '12px', lg: '15px' },
        transition: 'all 0.3s ease-in-out',
      }}
    >
      {text && `${text} `}
      <Link
        href={href}
        sx={{
          color: text ? 'var(--color-primary)' : 'var(--color-text-primary)',
          textDecoration: 'none',
          position: 'relative',
          '&::after': {
            content: '""',
            position: 'absolute',
            left: 0,
            bottom: -2,
            width: 0,
            height: '1px',
            backgroundColor: 'currentColor',
            transition: 'width 0.3s ease',
          },
          '&:hover::after': {
            width: '100%',
          },
        }}
      >
        {linkText}
      </Link>
    </Typography>
  );
}
