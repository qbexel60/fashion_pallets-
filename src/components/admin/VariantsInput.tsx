'use client';

import { useState } from 'react';

type Variant = {
  key: string;
  values: string[];
};

type Props = {
  value: Record<string, string[]>;
  onChange: (variants: Record<string, string[]>) => void;
};

export default function VariantsInput({ value, onChange }: Props) {
  const [variants, setVariants] = useState<Variant[]>(() => {
    return Object.entries(value || {}).map(([key, values]) => ({
      key,
      values: Array.isArray(values) ? values : [values],
    }));
  });

  const updateVariants = (newVariants: Variant[]) => {
    setVariants(newVariants);
    const variantsObj: Record<string, string[]> = {};
    newVariants.forEach((v) => {
      if (v.key.trim()) {
        variantsObj[v.key] = v.values.filter((val) => val.trim());
      }
    });
    onChange(variantsObj);
  };

  const addVariant = () => {
    updateVariants([...variants, { key: '', values: [''] }]);
  };

  const removeVariant = (index: number) => {
    updateVariants(variants.filter((_, i) => i !== index));
  };

  const updateVariantKey = (index: number, key: string) => {
    const newVariants = [...variants];
    newVariants[index].key = key;
    updateVariants(newVariants);
  };

  const addVariantValue = (variantIndex: number) => {
    const newVariants = [...variants];
    newVariants[variantIndex].values.push('');
    updateVariants(newVariants);
  };

  const removeVariantValue = (variantIndex: number, valueIndex: number) => {
    const newVariants = [...variants];
    newVariants[variantIndex].values = newVariants[variantIndex].values.filter((_, i) => i !== valueIndex);
    updateVariants(newVariants);
  };

  const updateVariantValue = (variantIndex: number, valueIndex: number, value: string) => {
    const newVariants = [...variants];
    newVariants[variantIndex].values[valueIndex] = value;
    updateVariants(newVariants);
  };

  return (
    <div>
      <label className="block text-sm font-medium text-gray-300 mb-3">Variants</label>
      
      <div className="space-y-4">
        {variants.map((variant, variantIndex) => (
          <div key={variantIndex} className="bg-white/5 rounded-lg p-3 sm:p-4 border border-white/10">
            <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-2 sm:gap-3 mb-3">
              <input
                type="text"
                placeholder="Variant name (e.g., Color, Size)"
                value={variant.key}
                onChange={(e) => updateVariantKey(variantIndex, e.target.value)}
                className="flex-1 px-3 py-2 bg-white/10 border border-white/20 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-purple-500 text-sm sm:text-base"
              />
              <button
                type="button"
                onClick={() => removeVariant(variantIndex)}
                className="px-3 py-2 bg-red-600 hover:bg-red-700 text-white rounded-lg text-sm transition-colors whitespace-nowrap"
              >
                Remove
              </button>
            </div>

            <div className="space-y-2">
              {variant.values.map((val, valueIndex) => (
                <div key={valueIndex} className="flex flex-col sm:flex-row items-stretch sm:items-center gap-2">
                  <input
                    type="text"
                    placeholder="Value (e.g., Black, Red)"
                    value={val}
                    onChange={(e) => updateVariantValue(variantIndex, valueIndex, e.target.value)}
                    className="flex-1 px-3 py-2 bg-white/10 border border-white/20 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-purple-500"
                  />
                  {variant.values.length > 1 && (
                    <button
                      type="button"
                      onClick={() => removeVariantValue(variantIndex, valueIndex)}
                      className="w-full sm:w-auto px-2 py-2 bg-red-600/50 hover:bg-red-600 text-white rounded text-sm transition-colors text-center"
                    >
                      ✕
                    </button>
                  )}
                </div>
              ))}
              <button
                type="button"
                onClick={() => addVariantValue(variantIndex)}
                className="text-sm text-purple-400 hover:text-purple-300"
              >
                + Add Value
              </button>
            </div>
          </div>
        ))}

        <button
          type="button"
          onClick={addVariant}
          className="w-full px-4 py-2 bg-white/10 border border-white/20 rounded-lg text-white hover:bg-white/20 transition-colors"
        >
          + Add Variant
        </button>
      </div>
    </div>
  );
}
