import Image from 'next/image';
import React from 'react';

export default function Logo() {
  return (
    <div className='mt-4 ml-4'>
      <Image
        src="/logo/fashionpallet.webp"
        alt="Logo"
        width={100}
        height={100}
      />
    </div>
  );
}
