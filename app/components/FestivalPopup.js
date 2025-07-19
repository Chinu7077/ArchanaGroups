"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import { X } from "lucide-react";

export default function FestivalPopup() {
  const [visible, setVisible] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => setVisible(false), 15000);
    return () => clearTimeout(timer);
  }, []);

  if (!visible) return null;

  return (
    <div className="w-full flex justify-center py-6">
      <div className="relative w-full max-w-sm aspect-square bg-white rounded-xl overflow-hidden shadow-xl border border-gray-200">
        {/* Background */}
        <Image
          src="/festival-bg.jpg"
          alt="Festival Background"
          fill
          className="object-cover opacity-80"
        />

        {/* Overlay Content */}
        <div className="relative z-10 h-full flex flex-col justify-between items-center text-white bg-black/30 backdrop-blur-md p-4">
          {/* Close Button */}
          <button
            onClick={() => setVisible(false)}
            className="absolute top-2 right-2 text-white bg-black/50 rounded-full p-1 hover:bg-black/70"
          >
            <X className="w-4 h-4" />
          </button>

          {/* Message */}
          <div className="text-center mt-6">
            <h2 className="text-xl font-bold mb-1">🎉 Happy Festival! 🎉</h2>
            <p className="text-sm">Wishing you joy, peace, and success.</p>
          </div>

          {/* Logos */}
          <div className="flex gap-6 mt-4">
            <Image src="/logo1.png" alt="Logo 1" width={48} height={48} className="bg-white p-1 rounded-full" />
            <Image src="/logo2.png" alt="Logo 2" width={48} height={48} className="bg-white p-1 rounded-full" />
          </div>
        </div>
      </div>
    </div>
  );
}
