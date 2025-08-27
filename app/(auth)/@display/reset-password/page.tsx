import Image from 'next/image';

export default function ResetDisplay() {
  return (
    <>
      <Image
        src='/shoe-welcome-2.png'
        alt='overlay image'
        fill
        sizes='(max-width: 1200px) 0vw, 50vw'
        style={{ objectFit: 'cover' }}
        priority
      />
    </>
  );
}
