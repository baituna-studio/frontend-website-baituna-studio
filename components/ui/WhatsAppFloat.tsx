'use client';

import { useState, useEffect } from 'react';

export function WhatsAppFloat() {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      // Show button after scrolling down 300px
      setIsVisible(window.scrollY > 300);
    };
    
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <a
      href="https://wa.me/6281234567890" // Replace with actual number
      target="_blank"
      rel="noreferrer"
      className={`fixed bottom-6 right-6 z-50 flex items-center justify-center w-14 h-14 bg-green-500 text-white rounded-full shadow-lg hover:bg-green-600 hover:scale-110 transition-all duration-300 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10 pointer-events-none'} group`}
      aria-label="Chat WhatsApp"
    >
      {/* PrimeIcons WhatsApp Icon */}
      <i className="pi pi-whatsapp text-3xl"></i>
      
      {/* Pulse effect rings */}
      <span className="absolute w-full h-full rounded-full border-2 border-green-500 animate-ping opacity-75"></span>
      
      {/* Tooltip on hover */}
      <span className="absolute right-full mr-4 bg-white text-slate-800 text-sm font-semibold px-3 py-2 rounded-lg shadow-md opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap pointer-events-none">
        Chat dengan kami!
      </span>
    </a>
  );
}
