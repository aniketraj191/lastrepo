import { motion } from 'framer-motion';
import { ChevronDown, Heart } from 'lucide-react';

export default function Hero() {
  // Container stagger animation
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.3,
        delayChildren: 0.2,
      },
    },
  };

  // Text element fade & slide up animation
  const itemVariants = {
    hidden: { y: 40, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        duration: 1,
        ease: [0.16, 1, 0.3, 1], // easeOutExpo
      },
    },
  };

  return (
    <section className="relative min-h-screen flex flex-col justify-center items-center text-center px-4 overflow-hidden z-20">
      
      {/* Decorative background gradients */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[400px] md:w-[600px] h-[400px] md:h-[600px] rounded-full bg-rose-600/10 blur-[120px] pointer-events-none" />
      <div className="absolute top-1/3 left-1/3 w-72 h-72 rounded-full bg-pink-700/5 blur-[100px] pointer-events-none" />
      
      <motion.div
        variants={containerVariants}
        initial="hidden"
        animate="visible"
        className="max-w-4xl space-y-6 relative"
      >
        
        {/* Glowing Hearts Header Badge */}
        <motion.div 
          variants={itemVariants}
          className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-rose-500/20 bg-rose-500/5 text-rose-300 text-sm tracking-wide uppercase font-semibold glow-border-pink mb-4"
        >
          <Heart className="w-4 h-4 fill-rose-500 text-rose-400 animate-pulse" />
          <span>Made for you</span>
          <Heart className="w-4 h-4 fill-rose-500 text-rose-400 animate-pulse" />
        </motion.div>

        {/* Large Heading */}
        <motion.h1 
          variants={itemVariants}
          className="text-5xl md:text-8xl font-extrabold tracking-tight"
        >
          <span className="block text-white mb-2 font-serif italic">Happy Birthday</span>
          <span className="bg-gradient-to-r from-rose-400 via-pink-500 to-red-500 bg-clip-text text-transparent glow-text-pink drop-shadow-lg">
            Muskan ❤️
          </span>
        </motion.h1>

        {/* Subtitle */}
        <motion.p 
          variants={itemVariants}
          className="text-lg md:text-2xl text-gray-300 font-light max-w-2xl mx-auto leading-relaxed px-4"
        >
          Today is all about celebrating someone truly special.
        </motion.p>
        
        {/* Mini description */}
        <motion.p 
          variants={itemVariants}
          className="text-sm md:text-base text-gray-500 font-light tracking-wide max-w-md mx-auto"
        >
          Scroll down to take a walk down memory lane and unwrap your surprises.
        </motion.p>

      </motion.div>

      {/* Floating Scroll Indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: [0, 1, 0] }}
        transition={{ 
          duration: 2.5, 
          repeat: Infinity,
          delay: 2
        }}
        className="absolute bottom-10 flex flex-col items-center gap-1.5 text-rose-400/50 cursor-pointer"
        onClick={() => {
          window.scrollTo({
            top: window.innerHeight,
            behavior: 'smooth'
          });
        }}
      >
        <span className="text-xs uppercase tracking-widest font-sans font-semibold">Scroll</span>
        <ChevronDown className="w-5 h-5 animate-bounce" />
      </motion.div>

    </section>
  );
}
