import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Heart, Mail } from 'lucide-react';

export default function LoveLetter() {
  const [isOpen, setIsOpen] = useState(false);
  const [typedText, setTypedText] = useState('');
  const [startTyping, setStartTyping] = useState(false);

  const letterLines = [
    " Dear Muskan,",
    "",
    "You are the most beautiful chapter of my life.",
    "",
    "Every smile of yours brightens my day and every memory with you is precious.",
    "",
    "On your birthday I wish you endless happiness, success, peace and love.",
    "",
    "Thank you for being part of my life.",
    "",
    "Happy Birthday My Love ❤️",
    "",
    "Forever Yours,",
    "Aniket"
  ];

  const fullText = letterLines.join('\n');

  useEffect(() => {
    if (!startTyping) return;

    let index = 0;
    const interval = setInterval(() => {
      setTypedText((prev) => prev + fullText.charAt(index));
      index++;
      if (index >= fullText.length) {
        clearInterval(interval);
      }
    }, 45); // Adjust typing speed here (ms per char)

    return () => clearInterval(interval);
  }, [startTyping, fullText]);

  const handleOpenEnvelope = () => {
    setIsOpen(true);
    // Wait for the envelope flap to open and letter to slide up before typing
    setTimeout(() => {
      setStartTyping(true);
    }, 1200);
  };

  return (
    <section className="relative min-h-screen py-24 flex flex-col justify-center items-center px-4 overflow-hidden z-20">
      
      {/* Ambient glowing circles */}
      <div className="absolute top-1/4 left-1/3 w-[300px] h-[300px] rounded-full bg-rose-950/15 blur-[120px] pointer-events-none" />
      <div className="absolute bottom-1/4 right-1/3 w-[350px] h-[350px] rounded-full bg-red-950/15 blur-[120px] pointer-events-none" />

      <div className="max-w-4xl w-full text-center relative flex flex-col items-center">
        {/* Section Heading */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="mb-12 space-y-3"
        >
          <span className="text-rose-400 font-cursive text-2xl tracking-wide">A Message for You</span>
          <h2 className="text-4xl md:text-5xl font-extrabold text-white tracking-tight font-serif">
            With All My Heart
          </h2>
          <p className="text-gray-400 max-w-sm mx-auto text-sm">
            Click the wax heart seal to open the envelope and read the message inside.
          </p>
        </motion.div>

        {/* Envelope Container */}
        <div className="relative w-full max-w-[340px] md:max-w-[480px] h-[280px] md:h-[320px] mt-16 md:mt-24">
          
          {/* 1. The Letter Inside */}
          <motion.div
            initial={{ y: 0, zIndex: 1 }}
            animate={isOpen ? { y: -200, zIndex: 25 } : { y: 0, zIndex: 1 }}
            transition={{ duration: 1, ease: 'easeOut', delay: 0.4 }}
            className={`absolute inset-x-4 bottom-4 top-4 bg-[#fdfaf2] text-[#2c1d11] rounded-lg shadow-2xl p-6 md:p-8 text-left border border-[#ebe0cd] overflow-y-auto max-h-[360px] md:max-h-[440px] select-none`}
            style={{
              boxShadow: '0 -10px 25px rgba(0,0,0,0.15), 0 10px 30px rgba(0,0,0,0.2)'
            }}
          >
            {/* Writing paper texture effect */}
            <div className="absolute inset-0 bg-[linear-gradient(rgba(0,0,0,0.03)_1px,transparent_1px)] bg-[size:100%_24px] md:bg-[size:100%_28px] pointer-events-none p-6 md:p-8" />
            
            <div className="relative font-cursive text-lg md:text-xl leading-relaxed whitespace-pre-wrap font-semibold tracking-wide">
              {typedText}
              {!startTyping && !isOpen && (
                <div className="h-full flex items-center justify-center text-gray-400 italic">
                  Letter Content
                </div>
              )}
              {startTyping && typedText.length < fullText.length && (
                <span className="inline-block w-1.5 h-5 bg-rose-600 ml-1 animate-pulse" />
              )}
            </div>
          </motion.div>

          {/* 2. Envelope Front Body (Sides & Bottom Folds) */}
          <div className="absolute inset-0 z-20 pointer-events-none">
            {/* Custom SVG Envelope folds to allow transparent center overlay */}
            <svg viewBox="0 0 500 350" className="w-full h-full drop-shadow-[0_15px_30px_rgba(0,0,0,0.45)]">
              {/* Back side panel */}
              <path d="M0,0 L500,0 L500,350 L0,350 Z" className="fill-[#1f1a1d] stroke-white/5" />
              {/* Bottom fold */}
              <path d="M0,350 L250,175 L500,350 Z" className="fill-[#2a2227] stroke-white/5" />
              {/* Left fold */}
              <path d="M0,0 L250,175 L0,350 Z" className="fill-[#241e22] stroke-white/5" />
              {/* Right fold */}
              <path d="M500,0 L250,175 L500,350 Z" className="fill-[#241e22] stroke-white/5" />
            </svg>
          </div>

          {/* 3. Envelope Flap (Top triangle) */}
          <motion.div
            initial={{ rotateX: 0 }}
            animate={isOpen ? { rotateX: 180, zIndex: 5 } : { rotateX: 0, zIndex: 30 }}
            transition={{ duration: 0.6, ease: 'easeInOut' }}
            className="absolute top-0 inset-x-0 h-1/2 origin-top"
            style={{ transformStyle: 'preserve-3d' }}
          >
            <svg viewBox="0 0 500 175" className="w-full h-full drop-shadow-[0_4px_6px_rgba(0,0,0,0.2)]">
              {/* Triangular flap pointing downwards */}
              <path d="M0,0 L250,175 L500,0 Z" className="fill-[#30262c] stroke-white/5" />
            </svg>
          </motion.div>

          {/* 4. Wax Heart Seal (Clickable to open) */}
          {!isOpen && (
            <div className="absolute top-[42%] md:top-[45%] left-1/2 -translate-x-1/2 -translate-y-1/2 z-40">
              <motion.button
                onClick={handleOpenEnvelope}
                whileHover={{ scale: 1.15, rotate: 5 }}
                whileTap={{ scale: 0.9 }}
                className="w-14 h-14 rounded-full bg-gradient-to-tr from-rose-700 to-red-500 border-2 border-rose-400 flex items-center justify-center shadow-[0_8px_20px_rgba(244,63,94,0.4),inset_0_2px_4px_rgba(255,255,255,0.4)] cursor-pointer"
              >
                <Heart className="w-6 h-6 fill-white text-white animate-pulse" />
              </motion.button>
              
              {/* Ring flash hint */}
              <span className="absolute inset-0 rounded-full border border-rose-400/40 animate-ping pointer-events-none" />
            </div>
          )}

        </div>
        
        {/* Helper instructions below */}
        <AnimatePresence>
          {isOpen && (
            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 0.6 }}
              exit={{ opacity: 0 }}
              className="mt-8 text-xs text-rose-300 font-sans italic tracking-wide"
            >
              Scroll down to make a wish next...
            </motion.p>
          )}
        </AnimatePresence>

      </div>
    </section>
  );
}
