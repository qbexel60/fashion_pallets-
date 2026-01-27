import React from 'react';
import Container from './Container';
import ShowcaseSection from './ShowcaseSection';
import { sectionImages } from '@/constants/SectionImages';

export default function BrandShowcase() {
  return (
    <div className="mt-8 font-sans">
      <Container>
        <h2 className="text-3xl font-bold mb-5 text-white  drop-shadow-[0_0_15px_rgba(255,255,255,0.7)]">
          How Strong as brand are we
        </h2>
        <div className='grid grid-cols-1 gap-10'>
          <ShowcaseSection
            title="Pre-Orders Gallery"
            description="90+ types of products Pre-Order has taken so far"
            images={sectionImages.preOrdered}
            section="preOrdered"
          />
          <ShowcaseSection
            title="Real Pictures Gallery"
            description="Real pictures of pre-ordered products after arriving in Bangladesh"
            images={sectionImages.real}
            section="real"
          />
          <ShowcaseSection
            title="Reviews"
            description="1000+ reviews from our satisfied customers"
            images={sectionImages.reviews}
            section="reviews"
          />
        </div>
      </Container>
    </div>
  );
}
