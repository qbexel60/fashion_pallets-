'use client';
import React from 'react';
import Link from 'next/link';
import Container from '../Container';

function ClickToOrder() {
  return (
    <Container>
      <div className="w-full container mx-auto font-sans">
        <div className="flex items-center mt-2 py-5 flex-col justify-between gap-3 flex-wrap">
          <h2 className="text-2xl md:text-3xl font-bold text-white drop-shadow-[0_0_15px_rgba(255,255,255,0.35)]">
            Available Products
          </h2>

          <p className="text-gray-300 mb-7 max-md:hidden">Click for product list & order</p>

          <div className="flex items-stretch gap-3 flex-col w-full md:w-auto md:flex-row md:items-center md:justify-end">
            {/* Pre-Order button */}
            <Link
              href="/products/list?tab=pre-order"
              className="group inline-flex items-center justify-center rounded-lg text-base md:text-lg font-bold uppercase tracking-wide
                         w-full md:w-auto px-8 md:px-10 py-3.5 md:py-4 text-white text-center
                         bg-gradient-to-r from-[#C94CF7] via-[#8B34AA] to-[#5c1d64]
                         transition-transform duration-200 hover:scale-105"
            >
              Pre-Order
            </Link>

            {/* Stock button */}
            <Link
              href="/products/list?tab=stock"
              className="group inline-flex items-center justify-center rounded-lg text-base md:text-lg font-bold uppercase tracking-wide
                         w-full md:w-auto px-8 md:px-10 py-3.5 md:py-4 text-white text-center
                         bg-gradient-to-r from-[#00ff85] via-[#00c96f] to-[#009955]
                         transition-transform duration-200 hover:scale-105"
            >
              Stock
            </Link>
          </div>
        </div>
      </div>
    </Container>
  );
}

export default ClickToOrder;