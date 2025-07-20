'use client';

import { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Image from 'next/image';
import {
  ZoomIn,
  ChevronLeft,
  ChevronRight,
  Heart,
  X,
  Play,
  Download,
  Share2,
  Filter,
  Grid,
  List,
} from 'lucide-react';

export default function TransportGallery() {
  const images = [
    {
      src: '/1-3.jpg',
      alt: 'Smooth and safe delivery, every time',
      title: 'Always Moving, Always Ready',
      date: 'July 01, 2025',
      likes: 24,
      category: 'Operations',
      relatedImages: ['/1-2.jpg', '/1-4.jpg', '/1-3.jpg', '/1-5.mp4'],
    },
    {
      src: '/2-1.jpg',
      alt: 'Loading red mud from storage onto bulkers',
      title: 'Red Mud Loading Operations',
      date: 'July 02, 2025',
      likes: 32,
      category: 'Loading',
      relatedImages: ['/2-2.jpg', '/2-3.jpg', '/2-4.jpg', '/2-5.mp4'],
    },
    {
      src: '/3-1.jpg',
      alt: 'Team attending safety briefing',
      title: 'Team & Safety Awareness',
      date: 'July 03, 2025',
      likes: 28,
      category: 'Team',
      relatedImages: [
        '/3-2.jpg',
        '/3-3.jpg',
        '/3-4.jpg',
        '/3-6.mp4',
        '/3-5.jpg',
        '/3-7.jpg',
      ],
    },
    {
      src: '/4-2.jpg',
      alt: 'Fly ash transport in progress',
      title: 'Fly Ash Transport Fleet',
      date: 'July 04, 2025',
      likes: 41,
      category: 'Transport',
      relatedImages: [
        '/4-3.jpg',
        '/4-4.jpg',
        '/4-6.jpg',
        '/4-5.mp4',
        '/4-8.jpg',
        '/4-9.jpg',
        '/4-10.jpg',
      ],
    },
    {
      src: '/5-1.jpg',
      alt: 'Every Journey Ends With Cleanliness.',
      title: 'After-Delivery Clean-Up',
      date: 'July 05, 2025',
      likes: 19,
      category: 'Maintenance',
      relatedImages: ['/5-2.jpg', '/5-3.jpg', '/5-4.mp4', '/5-5.jpg'],
    },
    {
      src: '/6-3.jpg',
      alt: 'Bulkers on-site',
      title: 'Bulk Transport Fleet',
      date: 'July 06, 2025',
      likes: 33,
      category: 'Fleet',
      relatedImages: ['/6-3.jpg', '/6-4.jpg', '/6-5.jpg', '/6-5.mp4'],
    },
  ];

  const categories = ['All', 'Operations', 'Loading', 'Team', 'Transport', 'Maintenance', 'Fleet'];

  const [selectedImage, setSelectedImage] = useState<number | null>(null);
  const [currentSlide, setCurrentSlide] = useState(0);
  const [isLiked, setIsLiked] = useState(false);
  const [scrollPosition, setScrollPosition] = useState(0);
  const [isVideoPlaying, setIsVideoPlaying] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');
  const [searchTerm, setSearchTerm] = useState('');
  const videoRef = useRef<HTMLVideoElement | null>(null);

  const filteredImages = images.filter(image => {
    const matchesCategory = selectedCategory === 'All' || image.category === selectedCategory;
    const matchesSearch = image.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         image.alt.toLowerCase().includes(searchTerm.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  useEffect(() => {
    if (selectedImage !== null) {
      const totalSlides = 1 + images[selectedImage].relatedImages.length;
      const interval = setInterval(() => {
        setCurrentSlide((prev) => (prev + 1) % totalSlides);
      }, 8000);
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
    document.body.classList.add('no-scroll');
  };

  const closeLightbox = () => {
    setSelectedImage(null);
    setCurrentSlide(0);
    setIsLiked(false);
    setIsVideoPlaying(false);
    document.body.classList.remove('no-scroll');
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
      const isVideo = relatedSrc.endsWith('.mp4');
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

  const handleDownload = () => {
    const currentImage = getCurrentImage();
    if (currentImage) {
      const link = document.createElement('a');
      link.href = currentImage.src;
      link.download = `${currentImage.title}.${currentImage.isVideo ? 'mp4' : 'jpg'}`;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
    }
  };

  const handleShare = () => {
    if (navigator.share) {
      navigator.share({
        title: getCurrentImage()?.title || 'Transport Gallery',
        text: 'Check out this amazing transport operation!',
        url: window.location.href,
      });
    } else {
      navigator.clipboard.writeText(window.location.href);
      // You could add a toast notification here
    }
  };

  return (
    <section id="gallery" className="bg-gradient-to-br from-red-50 via-white to-red-100 py-20">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: false, amount: 0.3 }}
          className="mb-16 text-center"
        >
          <h2 className="mb-6 bg-gradient-to-r from-red-600 to-red-800 bg-clip-text text-4xl font-bold text-transparent md:text-5xl">
            Our Gallery
          </h2>
          <p className="text-xl text-gray-600">
            Explore our operations, fleet, and team through stunning visuals
          </p>
        </motion.div>

        {/* Gallery Controls */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: false, amount: 0.3 }}
          className="mb-8 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between"
        >
          {/* Search and Filter */}
          <div className="flex flex-col gap-4 sm:flex-row sm:items-center">
            <div className="relative">
              <input
                type="text"
                placeholder="Search gallery..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full rounded-lg border border-gray-300 px-4 py-2 pl-10 focus:border-red-500 focus:outline-none focus:ring-2 focus:ring-red-200"
              />
              <Filter className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-gray-400" />
            </div>
            
            <select
              value={selectedCategory}
              onChange={(e) => setSelectedCategory(e.target.value)}
              className="rounded-lg border border-gray-300 px-4 py-2 focus:border-red-500 focus:outline-none focus:ring-2 focus:ring-red-200"
            >
              {categories.map(category => (
                <option key={category} value={category}>{category}</option>
              ))}
            </select>
          </div>

          {/* View Mode Toggle */}
          <div className="flex items-center gap-2">
            <button
              onClick={() => setViewMode('grid')}
              className={`rounded-lg p-2 transition-colors ${
                viewMode === 'grid' 
                  ? 'bg-red-600 text-white' 
                  : 'bg-gray-200 text-gray-600 hover:bg-gray-300'
              }`}
            >
              <Grid size={20} />
            </button>
            <button
              onClick={() => setViewMode('list')}
              className={`rounded-lg p-2 transition-colors ${
                viewMode === 'list' 
                  ? 'bg-red-600 text-white' 
                  : 'bg-gray-200 text-gray-600 hover:bg-gray-300'
              }`}
            >
              <List size={20} />
            </button>
          </div>
        </motion.div>

        {/* Gallery Grid/List */}
        <div className={`grid gap-8 ${
          viewMode === 'grid' 
            ? 'grid-cols-1 sm:grid-cols-2 lg:grid-cols-3' 
            : 'grid-cols-1'
        }`}>
          {filteredImages.map((image, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              viewport={{ once: false, amount: 0.3 }}
              whileHover={{ y: -8 }}
              className={`group relative cursor-pointer overflow-hidden rounded-2xl shadow-lg transition-all duration-300 hover:shadow-2xl ${
                viewMode === 'list' ? 'flex' : ''
              }`}
              onClick={() => openLightbox(index)}
            >
              <div className={`relative ${viewMode === 'list' ? 'w-1/3' : 'w-full'}`}>
                <Image
                  src={image.src}
                  alt={image.alt}
                  width={600}
                  height={400}
                  className={`object-cover transition-transform duration-500 group-hover:scale-110 ${
                    viewMode === 'list' ? 'h-48' : 'h-64 w-full'
                  }`}
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent opacity-0 transition-all duration-300 group-hover:opacity-100">
                  <div className="absolute top-4 right-4">
                    <ZoomIn size={24} className="text-white" />
                  </div>
                </div>
              </div>
              
                             <div className={`${viewMode === 'list' ? 'flex-1 p-6' : 'absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent opacity-0 transition-all duration-300 group-hover:opacity-100'}`}>
                 <div className={`${viewMode === 'list' ? '' : 'absolute right-0 bottom-0 left-0 p-6'}`}>
                   <div className="mb-2">
                     <span className="inline-block rounded-full bg-red-100 px-3 py-1 text-xs font-medium text-red-800">
                       {image.category}
                     </span>
                   </div>
                   <p className={`font-bold ${viewMode === 'list' ? 'text-lg text-gray-900' : 'text-lg text-white'}`}>
                     {image.title}
                   </p>
                   <div className={`flex items-center justify-between text-sm ${viewMode === 'list' ? 'text-gray-600' : 'text-white'}`}>
                     <span>{image.date}</span>
                     <div className="flex items-center space-x-1">
                       <Heart size={16} className={viewMode === 'list' ? 'text-gray-600' : 'text-white'} />
                       <span>{image.likes}</span>
                     </div>
                   </div>
                 </div>
               </div>
            </motion.div>
          ))}
        </div>

        {/* No Results */}
        {filteredImages.length === 0 && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="text-center py-12"
          >
            <p className="text-gray-500 text-lg">No images found matching your criteria.</p>
          </motion.div>
        )}

        <AnimatePresence mode="wait">
          {selectedImage !== null && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="bg-opacity-95 fixed inset-0 z-50 flex flex-col items-center justify-center overflow-y-auto bg-black p-2 sm:p-4"
              onClick={closeLightbox}
            >
              <motion.div
                initial={{ scale: 0.95 }}
                animate={{ scale: 1 }}
                exit={{ scale: 0.9 }}
                className="relative mx-auto w-full max-w-md sm:max-w-4xl"
                onClick={(e) => e.stopPropagation()}
              >
                <div className="relative mb-2 flex items-center justify-center sm:mb-4">
                  {getCurrentImage()?.isVideo ? (
                    <div className="relative w-full" onClick={handleVideoClick}>
                      <video
                        ref={videoRef}
                        src={getCurrentImage()?.src || ''}
                        className="h-auto max-h-[50vh] w-full rounded-xl sm:max-h-[60vh] sm:rounded-2xl"
                        controls
                      />
                      {!isVideoPlaying && (
                        <div className="bg-opacity-30 absolute inset-0 flex items-center justify-center rounded-xl bg-black transition-opacity duration-300 sm:rounded-2xl">
                          <Play size={48} className="text-white" />
                        </div>
                      )}
                    </div>
                  ) : (
                    <Image
                      src={getCurrentImage()?.src || '/placeholder.svg'}
                      alt={getCurrentImage()?.title || ''}
                      width={800}
                      height={500}
                      className="h-auto max-h-[50vh] w-full rounded-xl object-cover sm:max-h-[60vh] sm:rounded-2xl"
                    />
                  )}
                  
                  {/* Close Button */}
                  <button
                    onClick={closeLightbox}
                    className="absolute top-2 right-2 flex h-9 w-9 items-center justify-center rounded-full border border-red-200 bg-white shadow-md sm:top-4 sm:right-4 sm:h-10 sm:w-10"
                  >
                    <X size={20} className="text-red-600" />
                  </button>

                  {/* Action Buttons */}
                  <div className="absolute top-2 left-2 flex gap-2 sm:top-4 sm:left-4">
                    <button
                      onClick={handleDownload}
                      className="flex h-9 w-9 items-center justify-center rounded-full border border-red-200 bg-white shadow-md sm:h-10 sm:w-10"
                      title="Download"
                    >
                      <Download size={16} className="text-red-600" />
                    </button>
                    <button
                      onClick={handleShare}
                      className="flex h-9 w-9 items-center justify-center rounded-full border border-red-200 bg-white shadow-md sm:h-10 sm:w-10"
                      title="Share"
                    >
                      <Share2 size={16} className="text-red-600" />
                    </button>
                  </div>
                </div>

                {/* Navigation Buttons */}
                <div className="mb-2 flex justify-center gap-4 sm:mb-4">
                  <button
                    onClick={prevSlide}
                    className="rounded-full bg-red-600 p-2 text-white hover:bg-red-700 transition-colors"
                  >
                    <ChevronLeft size={20} />
                  </button>
                  <button
                    onClick={nextSlide}
                    className="rounded-full bg-red-600 p-2 text-white hover:bg-red-700 transition-colors"
                  >
                    <ChevronRight size={20} />
                  </button>
                </div>

                {/* Image Info */}
                <div className="mx-auto w-full max-w-sm rounded-xl bg-white p-3 text-xs sm:max-w-2xl sm:rounded-2xl sm:p-4 sm:text-sm">
                  <div className="mb-2 flex flex-col gap-2 sm:mb-4 sm:flex-row sm:items-center sm:justify-between sm:gap-4">
                    <div>
                      <div className="mb-1">
                        <span className="inline-block rounded-full bg-red-100 px-2 py-1 text-xs font-medium text-red-800">
                          {images[selectedImage].category}
                        </span>
                      </div>
                      <h3 className="text-sm font-bold text-gray-900 sm:text-lg">
                        {getCurrentImage()?.title}
                      </h3>
                      <p className="text-xs text-gray-600 sm:text-sm">
                        {images[selectedImage].date}
                      </p>
                    </div>
                    <button
                      onClick={() => setIsLiked(!isLiked)}
                      className={`flex items-center justify-center gap-1 rounded-full px-3 py-1 transition-colors sm:px-4 sm:py-2 ${
                        isLiked
                          ? 'bg-red-100 text-red-600'
                          : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                      }`}
                    >
                      <Heart
                        size={16}
                        className={isLiked ? 'fill-current' : ''}
                      />
                      <span>
                        {images[selectedImage].likes + (isLiked ? 1 : 0)}
                      </span>
                    </button>
                  </div>
                  <p className="text-center text-[10px] text-gray-500 sm:text-xs">
                    {currentSlide + 1} of{' '}
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
