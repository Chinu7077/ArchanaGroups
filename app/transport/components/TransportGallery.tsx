"use client";

import { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";
import {
  ZoomIn,
  ChevronLeft,
  ChevronRight,
  Heart,
  X,
  Play,
} from "lucide-react";

export default function TransportGallery() {
  const images = [
    {
      src: "/1-3.JPG",
      alt: "Smooth and safe delivery, every time",
      title: "Always Moving, Always Ready",
      date: "July 01, 2025",
      likes: 24,
      relatedImages: ["/1-2.JPG", "/1-4.JPG", "/1-3.JPG", "/1-5.mp4"],
    },
    {
      src: "/2-1.JPG",
      alt: "Loading red mud from storage onto bulkers",
      title: "Red Mud Loading Operations",
      date: "July 02, 2025",
      likes: 32,
      relatedImages: ["/2-2.JPG", "/2-3.JPG", "/2-4.JPG", "/2-5.mp4"],
    },
    {
      src: "/3-1.jpg",
      alt: "Team attending safety briefing",
      title: "Team & Safety Awareness",
      date: "July 03, 2025",
      likes: 28,
      relatedImages: [
        "/3-2.JPG",
        "/3-3.JPG",
        "/3-4.JPG",
        "/3-6.mp4",
        "/3-5.JPG",
        "/3-7.JPG",
      ],
    },
    {
      src: "/4-2.JPG",
      alt: "Fly ash transport in progress",
      title: "Fly Ash Transport Fleet",
      date: "July 04, 2025",
      likes: 41,
      relatedImages: [
        "/4-3.JPG",
        "/4-4.JPG",
        "/4-6.JPG",
        "/4-5.mp4",
        "/4-8.JPG",
        "/4-9.JPG",
        "/4-10.JPG",
      ],
    },
    {
      src: "/5-1.JPG",
      alt: "Every Journey Ends With Cleanliness.",
      title: "After-Delivery Clean-Up",
      date: "July 05, 2025",
      likes: 19,
      relatedImages: ["/5-2.JPG", "/5-3.JPG", "/5-4.mp4", "/5-5.JPG"],
    },
    {
      src: "/6-3.JPG",
      alt: "Bulkers on-site",
      title: "Bulk Transport Fleet",
      date: "July 06, 2025",
      likes: 33,
      relatedImages: ["/6-3.JPG", "/6-4.JPG", "/6-5.JPG", "/6-5.mp4"],
    },
  ];

  const [selectedImage, setSelectedImage] = useState<number | null>(null);
  const [currentSlide, setCurrentSlide] = useState(0);
  const [isLiked, setIsLiked] = useState(false);
  const [scrollPosition, setScrollPosition] = useState(0);
  const [isVideoPlaying, setIsVideoPlaying] = useState(false);
  const videoRef = useRef<HTMLVideoElement | null>(null);

  useEffect(() => {
    if (selectedImage !== null) {
      const totalSlides = 1 + images[selectedImage].relatedImages.length;
      const interval = setInterval(() => {
        setCurrentSlide((prev) => (prev + 1) % totalSlides);
      }, 10000);
      return () => clearInterval(interval);
    }
  }, [selectedImage]);

  useEffect(() => {
    if (videoRef.current) {
      videoRef.current.pause();
      videoRef.current.currentTime = 0;
      setIsVideoPlaying(false);
    }
  }, [currentSlide, selectedImage]);

  const openLightbox = (index: number) => {
    setScrollPosition(window.scrollY);
    setSelectedImage(index);
    setCurrentSlide(0);
    setIsLiked(false);
    setIsVideoPlaying(false);
    document.body.classList.add("no-scroll");
  };

  const closeLightbox = () => {
    setSelectedImage(null);
    setCurrentSlide(0);
    setIsVideoPlaying(false);
    document.body.classList.remove("no-scroll");
    window.scrollTo(0, scrollPosition);
  };

  const nextSlide = () => {
    if (selectedImage === null) return;
    const totalSlides = 1 + images[selectedImage].relatedImages.length;
    setCurrentSlide((prev) => (prev + 1) % totalSlides);
  };

  const prevSlide = () => {
    if (selectedImage === null) return;
    const totalSlides = 1 + images[selectedImage].relatedImages.length;
    setCurrentSlide((prev) => (prev - 1 + totalSlides) % totalSlides);
  };

  const getCurrentImage = () => {
    if (selectedImage === null) return null;
    const imageData = images[selectedImage];
    if (currentSlide === 0) {
      return { src: imageData.src, title: imageData.title, isVideo: false };
    } else {
      const relatedSrc = imageData.relatedImages[currentSlide - 1];
      const isVideo = relatedSrc.endsWith(".mp4");
      return {
        src: relatedSrc,
        title: `${imageData.title} - Related ${currentSlide}`,
        isVideo,
      };
    }
  };

  const handleVideoClick = () => {
    if (!videoRef.current) return;
    if (videoRef.current.paused) {
      videoRef.current.play();
      setIsVideoPlaying(true);
    } else {
      videoRef.current.pause();
      setIsVideoPlaying(false);
    }
  };

  return (
    <section id="gallery" className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: false, amount: 0.3 }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
            Gallery
          </h2>
          <p className="text-xl text-gray-600">
            See our operations, fleet, and team
          </p>
        </motion.div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {images.map((image, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              viewport={{ once: false, amount: 0.3 }}
              whileHover={{ y: -8 }}
              className="relative group cursor-pointer overflow-hidden rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-300"
              onClick={() => openLightbox(index)}
            >
              <Image
                src={image.src}
                alt={image.alt}
                width={600}
                height={400}
                className="w-full h-64 object-cover group-hover:scale-110 transition-transform duration-500"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-all duration-300">
                <div className="absolute bottom-0 left-0 right-0 p-6">
                  <p className="text-white font-bold text-lg mb-2">
                    {image.title}
                  </p>
                  <div className="flex items-center justify-between text-white text-sm">
                    <span>{image.date}</span>
                    <div className="flex items-center space-x-1">
                      <Heart size={16} />
                      <span>{image.likes}</span>
                    </div>
                  </div>
                </div>
                <div className="absolute top-4 right-4">
                  <ZoomIn size={24} className="text-white" />
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        <AnimatePresence mode="wait">
          {selectedImage !== null && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 bg-black bg-opacity-90 flex flex-col items-center justify-center z-50 p-2 sm:p-4 overflow-y-auto"
              onClick={closeLightbox}
            >
              <motion.div
                initial={{ scale: 0.95 }}
                animate={{ scale: 1 }}
                exit={{ scale: 0.9 }}
                className="relative w-full max-w-md sm:max-w-4xl mx-auto"
                onClick={(e) => e.stopPropagation()}
              >
                <div className="relative flex justify-center items-center mb-2 sm:mb-4">
                  {getCurrentImage()?.isVideo ? (
                    <div className="relative w-full" onClick={handleVideoClick}>
                      <video
                        ref={videoRef}
                        src={getCurrentImage()?.src || ""}
                        className="w-full h-auto max-h-[50vh] sm:max-h-[60vh] rounded-xl sm:rounded-2xl"
                        controls
                      />
                      {!isVideoPlaying && (
                        <div className="absolute inset-0 flex items-center justify-center bg-black bg-opacity-30 rounded-xl sm:rounded-2xl transition-opacity duration-300">
                          <Play size={48} className="text-white" />
                        </div>
                      )}
                    </div>
                  ) : (
                    <Image
                      src={getCurrentImage()?.src || "/placeholder.svg"}
                      alt={getCurrentImage()?.title || ""}
                      width={800}
                      height={500}
                      className="w-full h-auto max-h-[50vh] sm:max-h-[60vh] object-cover rounded-xl sm:rounded-2xl"
                    />
                  )}
                  <button
                    onClick={closeLightbox}
                    className="absolute top-2 right-2 sm:top-4 sm:right-4 bg-white rounded-full w-9 h-9 sm:w-10 sm:h-10 flex items-center justify-center shadow-md border border-red-200"
                  >
                    <X size={20} className="text-red-600" />
                  </button>
                </div>

                <div className="flex justify-center gap-4 mb-2 sm:mb-4">
                  <button
                    onClick={prevSlide}
                    className="bg-red-600 text-white rounded-full p-2 hover:bg-red-700"
                  >
                    <ChevronLeft size={20} />
                  </button>
                  <button
                    onClick={nextSlide}
                    className="bg-red-600 text-white rounded-full p-2 hover:bg-red-700"
                  >
                    <ChevronRight size={20} />
                  </button>
                </div>

                <div className="bg-white rounded-xl sm:rounded-2xl p-3 sm:p-4 mx-auto max-w-sm sm:max-w-2xl w-full text-xs sm:text-sm">
                  <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-2 sm:mb-4 gap-2 sm:gap-4">
                    <div>
                      <h3 className="text-sm sm:text-lg font-bold text-gray-900">
                        {getCurrentImage()?.title}
                      </h3>
                      <p className="text-gray-600 text-xs sm:text-sm">
                        {images[selectedImage].date}
                      </p>
                    </div>
                    <button
                      onClick={() => setIsLiked(!isLiked)}
                      className={`flex items-center justify-center gap-1 px-3 py-1 sm:px-4 sm:py-2 rounded-full transition-colors ${
                        isLiked
                          ? "bg-red-100 text-red-600"
                          : "bg-gray-100 text-gray-600 hover:bg-gray-200"
                      }`}
                    >
                      <Heart
                        size={16}
                        className={isLiked ? "fill-current" : ""}
                      />
                      <span>
                        {images[selectedImage].likes + (isLiked ? 1 : 0)}
                      </span>
                    </button>
                  </div>
                  <p className="text-center text-gray-500 text-[10px] sm:text-xs">
                    {currentSlide + 1} of{" "}
                    {1 + images[selectedImage].relatedImages.length}
                  </p>
                </div>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </section>
  );
}
