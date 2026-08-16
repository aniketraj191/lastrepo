import React, { useState, useRef, useEffect } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { Volume2, VolumeX, Music } from 'lucide-react';
import LockScreen from './components/LockScreen';
import Hero from './components/Hero';
import PhotoReveal from './components/PhotoReveal';
import MemorySection from './components/MemorySection';
import LoveLetter from './components/LoveLetter';
import CakeSection from './components/CakeSection';
import FinalScreen from './components/FinalScreen';
import BackgroundEffects from './components/BackgroundEffects';

export default function App() {
  const [isUnlocked, setIsUnlocked] = useState(false);
  const [isMuted, setIsMuted] = useState(false);
  const audioRef = useRef(null);

  // Auto-play romantic background track upon unlock
  useEffect(() => {
    if (isUnlocked && audioRef.current) {
      audioRef.current.volume = 0.4;
      audioRef.current.play().catch((err) => {
        console.log('Audio autoplay prevented by browser. User interaction needed.', err);
      });
    }
  }, [isUnlocked]);

  const handleMuteToggle = () => {
    if (!audioRef.current) return;
    audioRef.current.muted = !audioRef.current.muted;
    setIsMuted(audioRef.current.muted);
  };

  return (
    <div className="relative min-h-screen bg-[#050505] text-gray-100 selection:bg-rose-500/30 selection:text-rose-200 overflow-x-hidden">
      
      {/* 1. Global Interactive Floating Particles */}
      <BackgroundEffects />

      {/* 2. Hidden Audio Element for Background Music */}
      <audio
        ref={audioRef}
        src="/birthday_song.mp3" // Romantic soft ambient track
        loop
      />

      <AnimatePresence mode="wait">
        {!isUnlocked ? (
          <LockScreen key="lock" onUnlock={() => setIsUnlocked(true)} />
        ) : (
          <motion.div
            key="content"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1.5 }}
            className="w-full relative"
          >
            
            {/* Floating Music Control Widget */}
            <div className="fixed top-6 right-6 z-40 flex items-center gap-3">
              <motion.button
                onClick={handleMuteToggle}
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
                className="w-12 h-12 rounded-full glass flex items-center justify-center border border-white/10 hover:border-rose-500/40 text-rose-300 shadow-lg cursor-pointer"
              >
                {isMuted ? <VolumeX className="w-5 h-5" /> : <Volume2 className="w-5 h-5 animate-pulse" />}
              </motion.button>
              
              {/* Equalizer Wave Animation (Only when playing/not muted) */}
              {!isMuted && (
                <div className="flex items-end gap-[3px] h-6 px-2 py-1.5 rounded-lg glass border border-white/5">
                  <span className="w-[3px] bg-rose-500 animate-bounce h-2" style={{ animationDelay: '0.1s', animationDuration: '0.8s' }} />
                  <span className="w-[3px] bg-pink-500 animate-bounce h-4" style={{ animationDelay: '0.4s', animationDuration: '0.6s' }} />
                  <span className="w-[3px] bg-red-500 animate-bounce h-3" style={{ animationDelay: '0.2s', animationDuration: '0.7s' }} />
                  <span className="w-[3px] bg-rose-400 animate-bounce h-5" style={{ animationDelay: '0.5s', animationDuration: '0.5s' }} />
                </div>
              )}
            </div>

            {/* --- Main Sections Stream --- */}
            <main className="w-full relative">
              
              {/* Section 1: Title Reveal */}
              <div id="hero">
                <Hero />
              </div>

              {/* Decorative Section Divider */}
              <div className="w-full flex justify-center py-4 opacity-40">
                <div className="w-24 h-[1px] bg-gradient-to-r from-transparent via-rose-500 to-transparent" />
              </div>

              {/* Section 2: Camera Photo Reveal */}
              <div id="photos">
                <PhotoReveal />
              </div>

              <div className="w-full flex justify-center py-4 opacity-40">
                <div className="w-24 h-[1px] bg-gradient-to-r from-transparent via-pink-500 to-transparent" />
              </div>

              {/* Section 3: Slanted Polaroids Story */}
              <div id="story">
                <MemorySection />
              </div>

              <div className="w-full flex justify-center py-4 opacity-40">
                <div className="w-24 h-[1px] bg-gradient-to-r from-transparent via-red-500 to-transparent" />
              </div>

              {/* Section 4: Envelope Love Letter */}
              <div id="letter">
                <LoveLetter />
              </div>

              <div className="w-full flex justify-center py-4 opacity-40">
                <div className="w-24 h-[1px] bg-gradient-to-r from-transparent via-rose-500 to-transparent" />
              </div>

              {/* Section 5: Cutting Birthday Cake */}
              <div id="cake">
                <CakeSection />
              </div>

              <div className="w-full flex justify-center py-4 opacity-40">
                <div className="w-24 h-[1px] bg-gradient-to-r from-transparent via-pink-500 to-transparent" />
              </div>

              {/* Section 6: Final Message Card */}
              <div id="final">
                <FinalScreen />
              </div>

            </main>

          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
