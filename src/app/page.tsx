import AnimatedNavbar from '@/components/AnimatedNavbar';
import Container from '@/components/Container';
import HeroDoor from '@/components/HeroDoor';

import Logo from '@/components/Logo';
import React from 'react';

export default function page() {
  return (
    <div className="">
      <Logo />
      <HeroDoor />
      <Container>
      <div></div>
      </Container>
      <AnimatedNavbar />
    </div>
  );
}
