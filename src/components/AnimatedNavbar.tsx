"use client"

import { useState } from "react"
import { motion } from 'motion/react';
import { Menu, X, Home, User, Settings, HelpCircle } from 'lucide-react'

const navItems = [
  { icon: Home, label: "Home" },
  { icon: User, label: "Profile" },
  { icon: Settings, label: "Settings" },
  { icon: HelpCircle, label: "Help" },
]

export default function AnimatedNavbar() {
  const [isOpen, setIsOpen] = useState(false)

  return (
    <div className="relative">
      {/* Toggle Button */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="fixed top-4 right-4 z-20 p-2 bg-gradient-to-l from-[#B947C7] to-[#8632A7] text-primary-foreground rounded-full shadow-lg"
        aria-label={isOpen ? 'Close menu' : 'Open menu'}
      >
        {isOpen ? <X size={24} /> : <Menu size={24} />}
      </button>

      {/* Overlay */}
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.3 }}
          className="fixed inset-0 bg-black/50 z-30"
          onClick={() => setIsOpen(false)}
        />
      )}

      {/* Navbar */}
      <motion.nav
        initial={{ x: '-100%' }}
        animate={{ x: isOpen ? 0 : '-100%' }}
        transition={{ type: 'spring', stiffness: 300, damping: 30 }}
        className="fixed top-0 left-0 bottom-0 w-64  text-white bg-gradient-to-b from-[#B947C7] to-[#8632A7] z-40 p-4 shadow-lg"
      >
        <ul className="space-y-4 mt-16">
          {navItems.map((item, index) => (
            <motion.li
              key={item.label}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.1 * index }}
            >
              <a
                href="#"
                className="flex items-center space-x-4 text-white hover:text-white/80 transition-colors"
              >
                <item.icon size={24} />
                <span>{item.label}</span>
              </a>
            </motion.li>
          ))}
        </ul>
      </motion.nav>
    </div>
  );
}

