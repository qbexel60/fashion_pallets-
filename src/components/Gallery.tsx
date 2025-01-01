'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Image from 'next/image';
import { useParams } from 'next/navigation';
import Modal from './GalleryImagePreviewModal';
import { sectionImages } from '@/constants/SectionImages';
import GalleryNavigation from './GalleryNavigations';

interface GalleryProps {
  defaultSection?: string;
}

export default function Gallery({ defaultSection }: GalleryProps) {
  const params = useParams();
  const section = (params.section as string) || defaultSection;

  const images = section
    ? sectionImages[section as keyof typeof sectionImages] || []
    : [];

  const [selectedImage, setSelectedImage] = useState<string | null>(null);
  const [loadedImages, setLoadedImages] = useState<boolean[]>(
    new Array(images.length).fill(false),
  );

  if (!images.length) {
    return (
      <div className="p-4 text-center text-gray-500">
        No images available for this section.
      </div>
    );
  }

  const handleImageLoad = (index: number) => {
    setLoadedImages((prev) => {
      const newLoadedImages = [...prev];
      newLoadedImages[index] = true;
      return newLoadedImages;
    });
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <div>
        <GalleryNavigation />
        <h2 className="text-2xl font-semibold mb-8">
          {section === 'reviews'
            ? 'Reviews'
            : section === 'real'
            ? 'Real Pictures'
            : 'Pre-Orders'}{' '}
          Gallery
        </h2>
      </div>
      <motion.div
        className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        {images.map((src, index) => (
          <motion.div
            key={`gallery-image-${index}-${src.url}`}
            className="relative aspect-[3/4] overflow-hidden rounded-lg shadow-lg cursor-pointer"
            whileHover={{ scale: 1.03 }}
            whileTap={{ scale: 0.98 }}
            layoutId={`image-${section}-${index}`}
            onClick={() => setSelectedImage(src.url)}
          >
            {!loadedImages[index] && (
              <div className="absolute inset-0 bg-gray-200 animate-pulse" />
            )}
            <Image
              src={src.url}
              alt={`Gallery image ${index + 1}`}
              fill
              className={`object-cover transition-transform duration-300 ${
                loadedImages[index] ? 'opacity-100' : 'opacity-0'
              }`}
              sizes="(max-width: 640px) 100vw, (max-width: 768px) 50vw, (max-width: 1024px) 33vw, 25vw"
              priority={index < 4}
              onLoadingComplete={() => handleImageLoad(index)}
            />
          </motion.div>
        ))}
      </motion.div>

      <AnimatePresence mode="wait">
        {selectedImage && (
          <Modal image={selectedImage} onClose={() => setSelectedImage(null)} />
        )}
      </AnimatePresence>
    </div>
  );
}
