'use client';

import { CustomButton, Input, InputsRow } from './components';

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
      <h1 className='mb-6 text-2xl font-bold'>Input Examples</h1>
      <InputsRow>
        <Input title='Name' id='name' placeholder='Hayman Andrews' required />
        <Input
          title='Email'
          id='email'
          type='email'
          placeholder='example@mail.com'
        />
        <Input
          title='Password'
          id='password'
          type='password'
          placeholder='at least 8 characters'
          required
        />
        <Input
          title='Confirm password'
          id='confirm-password'
          type='password'
          placeholder='at least 8 characters'
          required
        />
      </InputsRow>
      <InputsRow>
        <Input
          title='Address'
          id='address'
          placeholder='street, apartment, block'
        />
      </InputsRow>
    </main>
  );
}
