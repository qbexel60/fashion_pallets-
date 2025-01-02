'use client'
import React, { useState } from 'react';
import Container from './Container';
import { howItWorksParagaraph } from '@/constants/howIoOrder';

export default function HowItWorks() {
  const [isExpanded, setIsExpanded] = useState(false);

  const toggleText = () => {
    setIsExpanded(!isExpanded);
  };

  const text = howItWorksParagaraph

  const truncatedText = text.split(' ').slice(0, 30).join(' ');

  return (
    <Container>
      <div
        id="howitworks"
        className="mb-20 mt-10 flex flex-col gap-3 font-sans"
      >
        <h2 className="text-4xl font-bold">Order Process</h2>
        <h3 className="text-xl font-bold ">
          How Fashion Pallet Bd Pre-Order System Works & Our Business Model
        </h3>
        <p className="text-white">
          {isExpanded ? text : `${truncatedText}...`}
        </p>
        <button
          onClick={toggleText}
          className="self-start px-6 py-2 font-sans bg-[#8B34AA] text-white font-semibold rounded-full shadow-md hover:bg-[#8B34AA]/80 focus:outline-none focus:ring-2 focus:ring-blue-400 transition-all duration-300"
        >
          {isExpanded ? 'Show Less' : 'Show Full'}
        </button>
      </div>
    </Container>
  );
}
