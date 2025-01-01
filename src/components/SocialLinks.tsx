import Image from 'next/image';
import React from 'react';
import Container from './Container';
import socialLinks from '@/constants/socialLinks';

export default function SocialLinks() {
  return (
    <Container>
      <h2 className="text-3xl font-bold mb-5 text-white">Social Links</h2>
      <div className="grid grid-cols-2 gap-4">
        <div className="flex justify-center items-center bg-[#252525a2] rounded-lg p-4">
          <a href={socialLinks.facebook} target="_blank" rel="noreferrer">
            <Image
              src="/icons/facebook.png"
              width={204}
              height={204}
              alt="Facebook"
              className="w-[80px] h-[80px]"
            />
          </a>
        </div>
        <div className="flex justify-center items-center bg-[#252525a2] rounded-lg p-4">
          <a href={socialLinks.instagram} target="_blank" rel="noreferrer">
            <Image
              src="/icons/insta.png"
              width={204}
              height={204}
              alt="Instagram"
              className="w-[80px] h-[80px]"
            />
          </a>
        </div>
        <div className="flex justify-center items-center bg-[#252525a2] rounded-lg p-4">
          <a href={socialLinks.tiktok} target="_blank" rel="noreferrer">
            <Image
              src="/icons/TikTok.png"
              width={204}
              height={204}
              alt="Twitter"
              className="w-[80px] h-[80px]"
            />
          </a>
        </div>
        <div className="flex justify-center items-center bg-[#252525a2] rounded-lg p-4">
          <a href={socialLinks.whatsApp} target="_blank" rel="noreferrer">
            <Image
              src="/icons/whatsApp.png"
              width={204}
              height={204}
              alt="TikTok"
              className="w-[80px] h-[80px]"
            />
          </a>
        </div>
      </div>
    </Container>
  );
}
