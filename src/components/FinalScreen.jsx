import React from 'react';
import { motion } from 'framer-motion';
import { Heart } from 'lucide-react';

export default function FinalScreen() {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.5,
        delayChildren: 0.4
      }
    }
  };

  const lineVariants = {
    hidden: { y: 25, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: { duration: 1, ease: 'easeOut' }
    }
  };

  return (
    <section className="relative min-h-screen flex flex-col justify-center items-center text-center px-4 overflow-hidden z-20">
      
      {/* Background Hearts Radial Pulse */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[350px] md:w-[500px] h-[350px] md:h-[500px] rounded-full bg-rose-600/10 blur-[130px] animate-pulse pointer-events-none" />
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-48 h-48 rounded-full bg-red-700/5 blur-[90px] pointer-events-none" />

      <motion.div
        variants={containerVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: '-100px' }}
        className="max-w-3xl space-y-10 relative px-4"
      >
        
        {/* Pulsing Central Glowing Heart Icon */}
        <motion.div
          variants={lineVariants}
          className="flex justify-center"
        >
          <div className="relative w-20 h-20 flex items-center justify-center">
            <motion.div
              animate={{ scale: [1, 1.15, 1] }}
              transition={{ repeat: Infinity, duration: 1.2, ease: 'easeInOut' }}
              className="absolute text-rose-500"
            >
              <Heart className="w-16 h-16 fill-rose-500 filter drop-shadow-[0_0_15px_rgba(244,63,94,0.6)]" />
            </motion.div>
          </div>
        </motion.div>

        {/* Closing Message */}
        <div className="space-y-6">
          <motion.h2 
            variants={lineVariants}
            className="text-4xl md:text-6xl font-extrabold text-white tracking-wide font-serif"
          >
            Muskan ❤️
          </motion.h2>

          <div className="space-y-3 text-lg md:text-2xl text-rose-100/90 font-light font-sans max-w-xl mx-auto leading-relaxed">
            <motion.p variants={lineVariants}>You are my favorite person,</motion.p>
            <motion.p variants={lineVariants}>my happiest memory,</motion.p>
            <motion.p variants={lineVariants}>and my greatest blessing.</motion.p>
          </div>

          <motion.h3 
            variants={lineVariants}
            className="text-2xl md:text-4xl font-semibold bg-gradient-to-r from-rose-400 via-pink-500 to-red-400 bg-clip-text text-transparent glow-text-pink pt-6 font-serif"
          >
            Happy Birthday Once Again ❤️
          </motion.h3>
        </div>

        {/* Signature */}
        <motion.div 
          variants={lineVariants}
          className="pt-10 flex flex-col items-center gap-1.5"
        >
          <span className="text-gray-500 text-xs tracking-widest uppercase font-semibold">With Endless Love</span>
          <span className="text-3xl md:text-4xl font-cursive font-bold text-rose-400 tracking-wider">
            — Aniket
          </span>
        </motion.div>

      </motion.div>

      {/* Heart floating footer indicator */}
      <div className="absolute bottom-6 text-gray-700 text-xs font-sans tracking-wide">
        Muskan & Aniket • Forever Yours
      </div>

    </section>
  );
}
