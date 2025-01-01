import { SectionImage } from '@/constants/SectionImages';
import Image from 'next/image';
import Link from 'next/link';
import React from 'react';

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
          <RenderImage key={index} image={image} />
        ))}
      </div>
      <Link href={`/gallery/${section}`}>
        <button className="mt-5 text-[#ffffff] bg-[#B947C7] border-2 py-2 px-4 inline-block font-medium rounded-full">
          See More
        </button>
      </Link>
    </div>
  );
}

function RenderImage({ image }: { image: SectionImage }) {
  return (
    <div>
      <Image
        src={image.url}
        className="rounded-lg aspect-[3/2] object-cover"
        alt={image.name}
        width={300}
        height={200}
      />
    </div>
  );
}
