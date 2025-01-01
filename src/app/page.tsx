import AnimatedNavbar from '@/components/AnimatedNavbar';
import BrandShowcase from '@/components/BrandShowcase';
import HeroDoor from '@/components/HeroDoor';

import Logo from '@/components/Logo';
import React from 'react';

export default function page() {
  return (
    <div className="">
      <Logo />
      <HeroDoor />
      <BrandShowcase />
      <AnimatedNavbar />
    </div>
  );
}
