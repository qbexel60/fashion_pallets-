import React from 'react';
import Link from 'next/link';
import { useParams } from 'next/navigation';

const GalleryNavigation = () => {
  const params = useParams();
  const currentSection = (params.section as string) || 'preOrdered';

  const sections = [
    { href: '/gallery/preOrdered', label: 'Pre-Orders' },
    { href: '/gallery/real', label: 'Real Pictures' },
    { href: '/gallery/reviews', label: 'Reviews' },
  ];

  return (
    <div className="flex flex-wrap gap-4 mb-8">
      {sections.map((section) => (
        <Link key={section.href} href={section.href} className="block">
          <button
            className={`
              px-6 py-2.5 
              rounded-full
              font-medium
              transition-all
              duration-200
              ${
                section.href.includes(currentSection)
                  ? 'bg-[#B947C7] text-white shadow-lg scale-105'
                  : 'bg-gray-100 text-gray-700 hover:bg-gray-200 hover:scale-105'
              }
            `}
          >
            {section.label}
          </button>
        </Link>
      ))}
    </div>
  );
};

export default GalleryNavigation;
