import BrandShowcase from '@/components/BrandShowcase';
import { ContactUsForm } from '@/components/contact-us-form/ContactUsForm';
import HeroDoor from '@/components/HeroDoor';
import HowItWorks from '@/components/HowItWorks';
import SocialLinks from '@/components/SocialLinks';
import SwiperSlider from '@/components/VideoSlider/SwiperSlider';

import React from 'react';


export default function page() {
  return (
    <div className="">
      <HeroDoor />
      <BrandShowcase />
      <SwiperSlider/>
      <HowItWorks />
      <SocialLinks />
      <ContactUsForm />
    </div>
  );
}
