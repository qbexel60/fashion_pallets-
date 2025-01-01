import BrandShowcase from '@/components/BrandShowcase';
import { ContactUsForm } from '@/components/contact-us-form/ContactUsForm';
import HeroDoor from '@/components/HeroDoor';

import React from 'react';

export default function page() {
  return (
    <div className="">
      <HeroDoor />
      <BrandShowcase />
      <ContactUsForm/>
    </div>
  );
}
