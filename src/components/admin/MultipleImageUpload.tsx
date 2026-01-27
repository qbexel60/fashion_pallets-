'use client';

import { useState } from 'react';
import Image from 'next/image';

type Props = {
  value: string[];
  onChange: (urls: string[]) => void;
  label?: string;
};

export default function MultipleImageUpload({ value, onChange, label = 'Additional Images' }: Props) {
  const [uploading, setUploading] = useState(false);
  const [error, setError] = useState('');

  const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    if (!file.type.startsWith('image/')) {
      setError('Please select an image file');
      return;
    }

    if (file.size > 10 * 1024 * 1024) {
      setError('Image size must be less than 10MB');
      return;
    }

    setError('');
    setUploading(true);

    try {
      const formData = new FormData();
      formData.append('image', file);

      const response = await fetch('/api/admin/upload', {
        method: 'POST',
        body: formData,
      });

      const data = await response.json();

      if (data.success) {
        onChange([...value, data.url]);
      } else {
        setError(data.error || 'Failed to upload image');
      }
    } catch {
      setError('An error occurred while uploading');
    } finally {
      setUploading(false);
    }
  };

  const removeImage = (index: number) => {
    onChange(value.filter((_, i) => i !== index));
  };

  return (
    <div>
      <label className="block text-sm font-medium text-gray-300 mb-2">{label}</label>
      
      {value.length > 0 && (
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-3 mb-3">
          {value.map((url, index) => (
            <div key={index} className="relative w-full h-20 sm:h-24 rounded-lg overflow-hidden border border-white/20 group">
              <Image src={url} alt={`Additional ${index + 1}`} fill className="object-cover" />
              <button
                type="button"
                onClick={() => removeImage(index)}
                className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 sm:group-hover:opacity-100 active:opacity-100 transition-opacity flex items-center justify-center text-white text-xl"
              >
                ✕
              </button>
            </div>
          ))}
        </div>
      )}

      <label className="cursor-pointer inline-block">
        <input
          type="file"
          accept="image/*"
          onChange={handleFileChange}
          disabled={uploading}
          className="hidden"
        />
        <div className="px-4 py-2 bg-white/10 border border-white/20 rounded-lg text-white hover:bg-white/20 transition-colors text-center text-sm disabled:opacity-50">
          {uploading ? 'Uploading...' : '+ Add Image'}
        </div>
      </label>

      {error && <p className="mt-2 text-sm text-red-400">{error}</p>}
    </div>
  );
}
