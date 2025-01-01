'use client';

import { motion } from 'framer-motion';
import Image from 'next/image';
import { X } from 'lucide-react';

interface ModalProps {
  image: string;
  onClose: () => void;
}

export default function GalleryImagePreviewModal({ image, onClose }: ModalProps) {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 bg-black bg-opacity-90 flex items-center justify-center z-50 p-4"
      onClick={onClose}
    >
      <motion.div
        layoutId={`image-${image}`}
        className="relative w-full max-w-3xl aspect-[3/4] rounded-lg overflow-hidden"
        onClick={(e) => e.stopPropagation()}
      >
        <Image
          src={image}
          alt="Full-screen image"
          fill
          className="object-cover"
          sizes="100vw"
        />
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-white bg-black bg-opacity-50 rounded-full p-2"
        >
          <X size={24} />
        </button>
      </motion.div>
    </motion.div>
  );
}
