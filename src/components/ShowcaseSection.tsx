import { SectionImage } from '@/constants/SectionImages';
import { cn } from '@/lib/utils';
import Image from 'next/image';
import Link from 'next/link';
import React from 'react';
import { FaArrowRight } from 'react-icons/fa';

export default function ShowcaseSection({
  title,
  description,
  images,
  section,
}: {
  title: string;
  description: string;
  section: string;
  images?: SectionImage[];
}) {
  const imagesLengthShorten = images?.slice(0, 3);
  return (
    <div className="mb-10">
      <h3 className="text-xl border-[#B947C7] border-2 py-2 px-4 inline-block font-medium rounded-full mb-5">
        {title}
      </h3>
      <p className="text-[16px]">{description}</p>
      <div className="grid grid-cols-3 gap-4 mt-5">
        {imagesLengthShorten?.map((image, index) => (
          <RenderImage key={index} image={image} section={section} />
        ))}
      </div>
      <Link href={`/gallery/${section}`}>
        <button className="mt-5 text-[#ffffff] bg-[#B947C7] border-2 py-2 px-4 inline-flex items-center gap-2 font-medium rounded-full">
          <span>See More</span>
          <FaArrowRight />
        </button>
      </Link>
    </div>
  );
}

function RenderImage({
  image,
  section,
}: {
  image: SectionImage;
  section: string;
}) {
  const aspectRatio = section === 'reviews' ? 'aspect-[9/16]' : 'aspect-[1/1]';
  return (
    <div>
      <Image
        src={image.url}
        className={cn('rounded-lg object-cover', aspectRatio)}
        alt={image.name}
        width={300}
        height={300}
      />
    </div>
  );
}
