'use client';

import { useState, useCallback } from 'react';
import { Menu, X, Home, Image, Info, Phone } from 'lucide-react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

const navItems = [
  { icon: Home, label: 'Home', href: '/' },
  { icon: Image, label: 'Gallery', href: '/gallery/real' },
  { icon: Info, label: 'How our Pre-Order Works', href: '/#howitworks' },
  { icon: Phone, label: 'Contact us', href: '/#contact-form' },
];

export default function AnimatedNavbar() {
  const [isOpen, setIsOpen] = useState(false);
  const pathname = usePathname();

  const handleLinkClick = useCallback(
    (event: React.MouseEvent<HTMLAnchorElement, MouseEvent>, href: string) => {
      // Close the drawer
      setIsOpen(false);

      // If it's not a section link, let Next.js handle it normally
      if (!href.includes('#')) return;

      // If we're not on the home page and trying to navigate to a section
      if (pathname !== '/' && href.startsWith('/#')) {
        // Let the default navigation happen first
        return;
      }

      // If we're already on the home page and clicking a section link
      if (pathname === '/' && href.includes('#')) {
        event.preventDefault();
        const sectionId = href.split('#')[1];
        const element = document.getElementById(sectionId);
        if (element) {
          element.scrollIntoView({ behavior: 'smooth' });
        }
      }
    },
    [pathname],
  );

  return (
    <div className="relative">
      {/* Toggle Button - Left position adjusted */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="fixed top-4 right-4 z-[6000] p-2 bg-gradient-to-l from-[#8d5794] to-[#881cb3] text-primary-foreground rounded-full shadow-lg"
        aria-label={isOpen ? 'Close menu' : 'Open menu'}
      >
        {isOpen ? <X size={24} /> : <Menu size={24} />}
      </button>

      {/* Overlay */}
      {isOpen && (
        <div
          className="fixed inset-0 bg-black/50 z-[5000] transition-opacity duration-300"
          onClick={() => setIsOpen(false)}
        />
      )}

      {/* Navbar - Changed positioning and transform */}
      <nav
        className={`fixed top-0 right-0 bottom-0 w-64 text-white bg-gradient-to-b from-[#B947C7] to-[#8632A7] z-[5000] p-4 shadow-lg transform transition-transform duration-300 ${
          isOpen ? 'translate-x-0' : 'translate-x-full'
        }`}
      >
        <ul className="space-y-4 mt-16">
          {navItems.map((item, index) => (
            <li
              key={item.label}
              className="transform transition-transform duration-300"
              style={{
                opacity: isOpen ? 1 : 0,
                transform: `translateX(${isOpen ? 0 : 20}px)`,
                transition: `all 0.3s ease-in-out ${index * 0.1}s`,
              }}
            >
              <Link
                href={item.href}
                onClick={(e) => handleLinkClick(e, item.href)}
                className="flex items-center space-x-4 text-white hover:text-white/80 transition-colors"
              >
                <item.icon size={24} />
                <span>{item.label}</span>
              </Link>
            </li>
          ))}
        </ul>
      </nav>
    </div>
  );
}
