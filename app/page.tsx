'use client';

import { CustomButton } from './components';

export default function HomePage() {
  return (
    <main className='space-y-4 p-8'>
      <h1 className='mb-6 text-2xl font-bold'>Custom Button Examples</h1>
      <div className='space-x-4'>
        <CustomButton
          variant='primary'
          onClick={() => console.log('Primary clicked')}
        >
          Primary Button
        </CustomButton>
        <CustomButton
          variant='secondary'
          onClick={() => console.log('Secondary clicked')}
        >
          Secondary Button
        </CustomButton>
        <CustomButton
          variant='tertiary'
          onClick={() => console.log('Tertiary clicked')}
        >
          Tertiary Button
        </CustomButton>
      </div>
      <div className='space-x-4'>
        <CustomButton
          variant='outline'
          onClick={() => console.log('Outline clicked')}
        >
          Outline Button
        </CustomButton>
        <CustomButton
          variant='text'
          onClick={() => console.log('Ghost clicked')}
        >
          Text Button
        </CustomButton>
        <CustomButton
          variant='primary'
          size='small'
          onClick={() => console.log('Small clicked')}
        >
          Small
        </CustomButton>
        <CustomButton
          variant='primary'
          size='medium'
          onClick={() => console.log('Medium clicked')}
        >
          Medium
        </CustomButton>
        <CustomButton
          variant='primary'
          size='large'
          onClick={() => console.log('Large clicked')}
        >
          Large
        </CustomButton>
        <CustomButton variant='primary' disabled>
          Disabled Button
        </CustomButton>
      </div>
    </main>
  );
}
