import Image from 'next/image';

export default function SignInDisplay() {
  return (
    <>
      <Image
        src='/shoe-welcome-3.png'
        alt='overlay image'
        fill
        sizes='(max-width: 1200px) 0vw, 50vw'
        style={{ objectFit: 'cover' }}
        priority
      />
    </>
  );
}
