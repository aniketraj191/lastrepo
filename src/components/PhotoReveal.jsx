import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Camera, Sparkles, Heart } from 'lucide-react';

export default function PhotoReveal() {
  const [photoCount, setPhotoCount] = useState(0); // 0: none, 1: first photo, 2: both photos
  const [isFlashing, setIsFlashing] = useState(false);
  const [isShutterActive, setIsShutterActive] = useState(false);

  const photos = [
    {
      id: 1,
      src: `${import.meta.env.BASE_URL}muskan1.jpg`,
      caption: 'Your radiant smile ✨',
      rotation: -6,
      date: 'August 18th'
    },
    {
      id: 2,
      src: `${import.meta.env.BASE_URL}muskan2.jpg`,
      caption: 'Pure elegance 💖',
      rotation: 6,
      date: 'A special moment'
    }
  ];

  const triggerShutter = () => {
    if (photoCount >= 2) return;
    
    setIsShutterActive(true);
    
    // Step 1: Trigger shutter animation
    setTimeout(() => {
      setIsFlashing(true);
      // Step 2: Trigger screen flash
      setTimeout(() => {
        setIsFlashing(false);
        setPhotoCount(prev => prev + 1);
        setIsShutterActive(false);
      }, 200);
    }, 300);
  };

  return (
    <section className="relative min-h-screen py-24 flex flex-col justify-center items-center px-4 overflow-hidden z-20">
      
      {/* Background radial glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] rounded-full bg-pink-900/10 blur-[130px] pointer-events-none" />

      <div className="max-w-4xl w-full text-center relative">
        {/* Section Heading */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="mb-12 space-y-3"
        >
          <span className="text-rose-400 font-cursive text-2xl tracking-wide">Snapshots of You</span>
          <h2 className="text-4xl md:text-5xl font-extrabold text-white tracking-tight font-serif">
            I Saved These For You
          </h2>
          <p className="text-gray-400 max-w-md mx-auto text-sm">
            Click the red camera shutter to capture and print two beautiful memories.
          </p>
        </motion.div>

        {/* Shutter Screen Flash Effect */}
        <AnimatePresence>
          {isFlashing && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 0.95 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.15 }}
              className="fixed inset-0 bg-white z-50 pointer-events-none"
            />
          )}
        </AnimatePresence>

        {/* Vintage Camera Setup */}
        <div className="flex flex-col items-center justify-center mb-16">
          <div className="relative">
            {/* The Shutter Trigger Button (top of camera) */}
            {photoCount < 2 && (
              <motion.button
                onClick={triggerShutter}
                disabled={isShutterActive}
                whileHover={{ y: 2 }}
                whileTap={{ y: 5 }}
                className="absolute top-[-14px] left-[50px] w-12 h-6 bg-red-600 hover:bg-red-500 rounded-t-lg shadow-lg border border-red-700/50 cursor-pointer z-10 flex items-center justify-center"
              >
                <div className="w-8 h-2 bg-red-800/40 rounded-full" />
              </motion.button>
            )}

            {/* Camera Body */}
            <motion.div 
              animate={isShutterActive ? { y: [0, 4, -2, 0] } : {}}
              transition={{ duration: 0.3 }}
              className="w-72 h-44 bg-gradient-to-b from-[#2a2b30] to-[#1c1d22] rounded-3xl border border-white/10 shadow-[0_20px_50px_rgba(0,0,0,0.6)] flex items-center justify-center relative px-6"
            >
              {/* Metallic top bar */}
              <div className="absolute top-0 inset-x-0 h-4 bg-gradient-to-r from-gray-700 via-gray-600 to-gray-700 rounded-t-3xl border-b border-black/20" />
              
              {/* Flash window */}
              <div className="absolute top-6 right-8 w-10 h-6 bg-gray-900 border border-white/10 rounded flex items-center justify-center overflow-hidden">
                <div className="w-8 h-4 bg-amber-400/20 blur-[1px] animate-pulse" />
              </div>
              
              {/* Viewfinder window */}
              <div className="absolute top-6 left-8 w-8 h-5 bg-gray-900 border border-white/10 rounded" />

              {/* Lens Ring (Interactive circular shutter) */}
              <div 
                className="w-28 h-28 rounded-full bg-[#111215] border-[6px] border-gray-700 shadow-[inset_0_10px_20px_rgba(0,0,0,0.8)] flex items-center justify-center cursor-pointer overflow-hidden group"
                onClick={photoCount < 2 ? triggerShutter : undefined}
              >
                <div className="relative w-full h-full flex items-center justify-center">
                  {/* Shutter Blades */}
                  <motion.div 
                    animate={isShutterActive ? { rotate: 90, scale: 0.1 } : { rotate: 0, scale: 1 }}
                    transition={{ duration: 0.2 }}
                    className="absolute inset-0 flex items-center justify-center"
                  >
                    {/* SVG representing lens shutter blades */}
                    <svg viewBox="0 0 100 100" className="w-full h-full fill-gray-900 text-gray-800">
                      <path d="M50 0 L100 50 L50 100 L0 50 Z" opacity="0.9" />
                      <circle cx="50" cy="50" r="15" className="fill-[#18191f] border border-gray-600/30" />
                    </svg>
                  </motion.div>

                  {/* Camera Icon in Center of lens */}
                  <Camera className="w-6 h-6 text-rose-500/70 group-hover:text-rose-400 group-hover:scale-110 transition-all duration-300" />
                </div>
              </div>

              {/* Film ejection slot at the bottom */}
              <div className="absolute bottom-[-10px] left-12 right-12 h-3 bg-[#0d0e10] border border-white/10 rounded-b-lg shadow-inner overflow-hidden">
                <div className="w-full h-full bg-black/60 shadow-[inset_0_2px_4px_rgba(0,0,0,0.8)]" />
              </div>
            </motion.div>
          </div>

          {/* Photo Reveal helper label */}
          {photoCount < 2 ? (
            <motion.p
              animate={{ opacity: [0.5, 1, 0.5] }}
              transition={{ repeat: Infinity, duration: 1.5 }}
              className="mt-6 text-sm text-rose-400/80 font-sans tracking-wide"
            >
              {photoCount === 0 ? "Press Shutter to Reveal First Photo" : "Press Shutter to Reveal Second Photo"}
            </motion.p>
          ) : (
            <p className="mt-6 text-sm text-emerald-400 font-sans flex items-center gap-1.5 font-semibold">
              <Sparkles className="w-4 h-4 animate-spin" />
              All photos printed successfully!
            </p>
          )}
        </div>

        {/* Polaroids Display */}
        <div className="flex flex-col md:flex-row justify-center items-center gap-8 px-4">
          <AnimatePresence>
            {photos.map((photo, index) => {
              const isRevealed = photoCount > index;
              if (!isRevealed) return null;

              return (
                <motion.div
                  key={photo.id}
                  initial={{ y: -50, opacity: 0, scale: 0.7, rotate: 0 }}
                  animate={{ 
                    y: 0, 
                    opacity: 1, 
                    scale: 1, 
                    rotate: photo.rotation,
                    transition: {
                      type: 'spring',
                      stiffness: 100,
                      damping: 15,
                      delay: 0.1
                    }
                  }}
                  whileHover={{ 
                    scale: 1.05, 
                    rotate: 0,
                    zIndex: 10,
                    boxShadow: '0 25px 50px rgba(244, 63, 94, 0.15)'
                  }}
                  className="w-64 bg-white p-4 pb-6 rounded-sm shadow-[0_15px_35px_rgba(0,0,0,0.4)] border border-gray-200 cursor-pointer text-gray-800 select-none"
                >
                  {/* Image container */}
                  <div className="relative aspect-square w-full bg-gray-100 rounded-sm overflow-hidden mb-4 border border-gray-200 group">
                    <img
                      src={photo.src}
                      alt={`Muskan Birthday ${photo.id}`}
                      className="w-full h-full object-contain bg-gray-50 grayscale-[15%] group-hover:grayscale-0 transition-all duration-500"
                      onError={(e) => {
                        // Fallback image using a styled SVG if image doesn't exist
                        e.target.src = `data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" width="300" height="300" viewBox="0 0 100 100" style="background:%23ffe4e6;"><text x="50" y="50" font-size="24" text-anchor="middle" dy=".3em">❤️</text></svg>`;
                      }}
                    />
                    
                    {/* Corner heart accent on hover */}
                    <div className="absolute top-2 right-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                      <Heart className="w-5 h-5 fill-rose-500 text-rose-500" />
                    </div>
                  </div>

                  {/* Polaroid caption area */}
                  <div className="text-center font-cursive">
                    <p className="text-2xl text-rose-600 font-bold leading-tight">{photo.caption}</p>
                    <p className="text-xs text-gray-400 mt-2 font-sans tracking-widest uppercase">{photo.date}</p>
                  </div>
                </motion.div>
              );
            })}
          </AnimatePresence>
        </div>
      </div>
    </section>
  );
}
