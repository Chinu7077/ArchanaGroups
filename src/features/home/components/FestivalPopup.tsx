'use client';

import { useEffect, useState, useCallback } from 'react';
import Image from 'next/image';
import { X } from 'lucide-react';

interface FestivalPopupProps {
  autoHideDelay?: number;
}

export default function FestivalPopup({
  autoHideDelay = 15000,
}: FestivalPopupProps) {
  const [visible, setVisible] = useState(true);

  const handleClose = useCallback(() => {
    setVisible(false);
  }, []);

  useEffect(() => {
    const timer = setTimeout(handleClose, autoHideDelay);
    return () => clearTimeout(timer);
  }, [autoHideDelay, handleClose]);

  if (!visible) return null;

  return (
    <div className="flex w-full justify-center py-6">
      <div className="relative aspect-square w-full max-w-sm overflow-hidden rounded-xl border border-gray-200 bg-white shadow-xl">
        {/* Background */}
        <Image
          src="/festival-bg.jpg"
          alt="Festival Background"
          fill
          className="object-cover opacity-80"
        />

        {/* Overlay Content */}
        <div className="relative z-10 flex h-full flex-col items-center justify-between bg-black/30 p-4 text-white backdrop-blur-md">
          {/* Close Button */}
          <button
            onClick={handleClose}
            className="absolute top-2 right-2 rounded-full bg-black/50 p-1 text-white transition-colors hover:bg-black/70"
            aria-label="Close festival popup"
          >
            <X className="h-4 w-4" />
          </button>

          {/* Message */}
          <div className="mt-6 text-center">
            <h2 className="mb-1 text-xl font-bold">🎉 Happy Festival! 🎉</h2>
            <p className="text-sm">Wishing you joy, peace, and success.</p>
          </div>

          {/* Logos */}
          <div className="mt-4 flex gap-6">
            <Image
              src="/AT.png"
              alt="Archana Transport Logo"
              width={48}
              height={48}
              className="rounded-full bg-white p-1"
              priority
            />
            <Image
              src="/ABC.png"
              alt="Archana BioCycle Logo"
              width={48}
              height={48}
              className="rounded-full bg-white p-1"
              priority
            />
          </div>
        </div>
      </div>
    </div>
  );
}
