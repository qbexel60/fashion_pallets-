import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { Facebook, Instagram } from 'lucide-react';
import { IoLogoWhatsapp } from 'react-icons/io';
import socialLinks from '@/constants/socialLinks';

export default function Footer() {
  return (
    <footer className=" font-sans text-white py-12">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          <div className="flex flex-col items-start">
            <Link href="/">
              <Image
                src="/logo/fashionpallet.webp"
                className="cursor-pointer w-[100px] h-[50px] mb-4"
                alt="Fashion Pallet BD Logo"
                width={100}
                height={50}
              />
            </Link>
            <p className="text-sm text-gray-400 mt-2">Buy Now or Never</p>
          </div>

          {/* <div>
            <h3 className="text-lg font-semibold mb-4">Quick Links</h3>
            <ul className="space-y-2">
              <li>
                <Link
                  href="/"
                  className="hover:text-gray-300 transition-colors"
                >
                  Home
                </Link>
              </li>
              <li>
                <Link
                  href="/products"
                  className="hover:text-gray-300 transition-colors"
                >
                  Products
                </Link>
              </li>
              <li>
                <Link
                  href="/about"
                  className="hover:text-gray-300 transition-colors"
                >
                  About Us
                </Link>
              </li>
              <li>
                <Link
                  href="/contact"
                  className="hover:text-gray-300 transition-colors"
                >
                  Contact
                </Link>
              </li>
            </ul>
          </div> */}

          <div>
            <h3 className="text-lg font-semibold mb-4">Contact Us</h3>
            <p className="mb-2">Rose Villa, Sontosh, Tangail Sadar, Tangail</p>
            <a
              href="tel:+8801973415089"
              className="hover:text-gray-300 transition-colors"
            >
              +880 1943 415089
            </a>
            <p className="mt-2">
              <a
                href="mailto:info@fashionpalletbd.com"
                className="hover:text-gray-300 transition-colors"
              >
                info@fashionpalletbd.com
              </a>
            </p>
          </div>

          <div>
            <h3 className="text-lg font-semibold mb-4">Follow Us</h3>
            <div className="flex space-x-4">
              <a
                href={socialLinks.facebook}
                className="hover:text-gray-300 transition-colors"
              >
                <Facebook size={24} />
              </a>
              <a
                href={socialLinks.instagram}
                className="hover:text-gray-300 transition-colors"
              >
                <Instagram size={24} />
              </a>
              <a
                href={socialLinks.whatsApp}
                className="hover:text-gray-300 transition-colors"
              >
                <IoLogoWhatsapp size={24} />
              </a>
            </div>
          </div>
        </div>

        <div className="mt-8 pt-8 border-t border-gray-800 text-center">
          <p className="text-sm text-gray-400">
            &copy; {new Date().getFullYear()} Fashion Pallete BD. All rights
            reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}
