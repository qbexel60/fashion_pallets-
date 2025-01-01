import Image from 'next/image';
import Link from 'next/link';
import React from 'react';

export default function Logo() {
  return (
    <div className="mt-4 ml-4">
      <Link href={`/`}>
        <Image
          src="/logo/fashionpallet.webp"
          className='cursor-pointer w-[100px] h-[50px]'
          alt="Logo"
          width={100}
          height={100}
        />
      </Link>
    </div>
  );
}
