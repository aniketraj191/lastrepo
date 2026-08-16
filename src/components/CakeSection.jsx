import { useState, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Heart, Sparkles } from 'lucide-react';
import confetti from 'canvas-confetti';

export default function CakeSection() {
  const [isDragging, setIsDragging] = useState(false);
  const [isSliced, setIsSliced] = useState(false);
  const [dragPoints, setDragPoints] = useState([]);
  const containerRef = useRef(null);

  // Trigger multiple confetti bursts on successful slice
  const triggerConfetti = () => {
    const duration = 3 * 1000;
    const end = Date.now() + duration;

    const frame = () => {
      confetti({
        particleCount: 5,
        angle: 60,
        spread: 55,
        origin: { x: 0, y: 0.8 },
        colors: ['#f43f5e', '#ec4899', '#db2777', '#f472b6']
      });
      confetti({
        particleCount: 5,
        angle: 120,
        spread: 55,
        origin: { x: 1, y: 0.8 },
        colors: ['#f43f5e', '#ec4899', '#db2777', '#f472b6']
      });

      if (Date.now() < end) {
        requestAnimationFrame(frame);
      }
    };
    frame();
  };

  const getCoordinates = (e) => {
    if (!containerRef.current) return null;
    const rect = containerRef.current.getBoundingClientRect();
    
    // Support touch and mouse events
    const clientX = e.touches ? e.touches[0].clientX : e.clientX;
    const clientY = e.touches ? e.touches[0].clientY : e.clientY;
    
    return {
      x: clientX - rect.left,
      y: clientY - rect.top
    };
  };

  const handleStart = (e) => {
    if (isSliced) return;
    setIsDragging(true);
    const coords = getCoordinates(e);
    if (coords) {
      setDragPoints([coords]);
    }
  };

  const handleMove = (e) => {
    if (!isDragging || isSliced) return;
    const coords = getCoordinates(e);
    if (coords) {
      setDragPoints((prev) => [...prev, coords]);
    }
  };

  const handleEnd = () => {
    if (!isDragging || isSliced) return;
    setIsDragging(false);

    // Analyze drag trail to see if it represents a cut
    if (dragPoints.length > 5) {
      const ys = dragPoints.map(p => p.y);
      const xs = dragPoints.map(p => p.x);
      
      const minY = Math.min(...ys);
      const maxY = Math.max(...ys);
      const minX = Math.min(...xs);
      const maxX = Math.max(...xs);
      
      const verticalDist = maxY - minY;
      const horizontalDist = maxX - minX;
      
      // If drag is long enough (either vertical or horizontal slice), trigger cake cut
      if (verticalDist > 70 || horizontalDist > 70) {
        setIsSliced(true);
        triggerConfetti();
      }
    }
    
    // Clear trail after a brief moment
    setTimeout(() => {
      if (!isSliced) setDragPoints([]);
    }, 200);
  };

  // Convert points array to SVG path string
  const getDragPath = () => {
    if (dragPoints.length < 2) return '';
    return dragPoints.reduce((acc, p, i) => {
      return i === 0 ? `M ${p.x} ${p.y}` : `${acc} L ${p.x} ${p.y}`;
    }, '');
  };

  return (
    <section className="relative min-h-screen py-24 flex flex-col justify-center items-center px-4 overflow-hidden z-20">
      
      {/* Background Glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[450px] h-[450px] rounded-full bg-rose-950/15 blur-[120px] pointer-events-none" />

      <div className="max-w-4xl w-full text-center relative flex flex-col items-center select-none">
        
        {/* Section Heading */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="mb-12 space-y-3"
        >
          <span className="text-rose-400 font-cursive text-2xl tracking-wide">Make a Wish</span>
          <h2 className="text-4xl md:text-5xl font-extrabold text-white tracking-tight font-serif">
            Time to Cut the Cake
          </h2>
          <p className="text-gray-400 max-w-sm mx-auto text-sm">
            Drag your finger or mouse vertically across the cake to cut a slice!
          </p>
        </motion.div>

        {/* Interactive Cake Area */}
        <div
          ref={containerRef}
          onMouseDown={handleStart}
          onMouseMove={handleMove}
          onMouseUp={handleEnd}
          onMouseLeave={handleEnd}
          onTouchStart={handleStart}
          onTouchMove={handleMove}
          onTouchEnd={handleEnd}
          className="relative w-[340px] h-[340px] cursor-crosshair flex items-center justify-center bg-[#070708]/40 border border-white/5 rounded-3xl p-6 shadow-2xl backdrop-blur-sm"
        >
          {/* SVG Birthday Cake */}
          <svg viewBox="0 0 300 300" className="w-full h-full">
            {/* Cake Stand Base */}
            <path d="M70,250 L230,250 L210,270 L90,270 Z" className="fill-gray-700 stroke-gray-600/30" />
            <rect x="50" y="240" width="200" height="10" rx="5" className="fill-gray-500 stroke-gray-400/20" />

            {/* --- Left Half Group --- */}
            <motion.g
              animate={isSliced ? { x: -20, rotate: -2 } : { x: 0, rotate: 0 }}
              transition={{ type: 'spring', stiffness: 50, damping: 10 }}
            >
              {/* Bottom Layer Left */}
              <path d="M60,180 L150,180 L150,240 L60,240 Z" className="fill-pink-700" />
              {/* Sprinkles Left */}
              <circle cx="80" cy="210" r="2.5" className="fill-amber-300" />
              <circle cx="110" cy="225" r="2.5" className="fill-white" />
              <circle cx="130" cy="200" r="2.5" className="fill-cyan-300" />

              {/* Middle Layer Left */}
              <path d="M70,120 L150,120 L150,180 L70,180 Z" className="fill-[#3d271f]" />
              {/* Chocolate frosting drips Left */}
              <path d="M70,120 Q85,135 100,120 Q115,135 130,120 Q145,135 150,120 L150,135 L70,135 Z" className="fill-[#2a1a14]" />

              {/* Top Layer Left */}
              <path d="M80,60 L150,60 L150,120 L80,120 Z" className="fill-rose-400" />
              <path d="M80,60 Q95,70 110,60 Q125,70 140,60 L150,60 L150,70 L80,70 Z" className="fill-rose-500" />

              {/* Candle 1 (Left) */}
              <rect x="100" y="20" width="8" height="40" rx="2" className="fill-cyan-400" />
              <rect x="100" y="25" width="8" height="5" className="fill-cyan-200" />
              {/* Candle 1 Flame */}
              <AnimatePresence>
                {!isSliced && (
                  <motion.path
                    animate={{ scale: [1, 1.15, 0.95, 1], y: [0, -1, 1, 0] }}
                    transition={{ repeat: Infinity, duration: 0.6 }}
                    exit={{ scale: 0, opacity: 0 }}
                    d="M104,8 C108,12 108,18 104,20 C100,18 100,12 104,8 Z"
                    className="fill-amber-400 stroke-amber-300 origin-bottom"
                  />
                )}
              </AnimatePresence>
            </motion.g>

            {/* --- Right Half Group --- */}
            <motion.g
              animate={isSliced ? { x: 20, rotate: 2 } : { x: 0, rotate: 0 }}
              transition={{ type: 'spring', stiffness: 50, damping: 10 }}
            >
              {/* Bottom Layer Right */}
              <path d="M150,180 L240,180 L240,240 L150,240 Z" className="fill-pink-700" />
              {/* Sprinkles Right */}
              <circle cx="170" cy="205" r="2.5" className="fill-white" />
              <circle cx="190" cy="225" r="2.5" className="fill-amber-300" />
              <circle cx="220" cy="210" r="2.5" className="fill-cyan-300" />

              {/* Middle Layer Right */}
              <path d="M150,120 L230,120 L230,180 L150,180 Z" className="fill-[#3d271f]" />
              {/* Chocolate frosting drips Right */}
              <path d="M150,120 Q165,135 180,120 Q195,135 210,120 Q225,135 230,120 L230,135 L150,135 Z" className="fill-[#2a1a14]" />

              {/* Top Layer Right */}
              <path d="M150,60 L220,60 L220,120 L150,120 Z" className="fill-rose-400" />
              <path d="M150,60 Q165,70 180,60 Q195,70 210,60 L220,60 L220,70 L150,70 Z" className="fill-rose-500" />

              {/* Candle 2 (Center) */}
              <rect x="146" y="15" width="8" height="45" rx="2" className="fill-yellow-400" />
              <rect x="146" y="20" width="8" height="5" className="fill-yellow-200" />
              {/* Candle 2 Flame */}
              <AnimatePresence>
                {!isSliced && (
                  <motion.path
                    animate={{ scale: [1, 1.1, 0.9, 1.05], y: [0, 1, -1, 0] }}
                    transition={{ repeat: Infinity, duration: 0.5, delay: 0.15 }}
                    exit={{ scale: 0, opacity: 0 }}
                    d="M150,3 C154,7 154,13 150,15 C146,13 146,7 150,3 Z"
                    className="fill-amber-400 stroke-amber-300 origin-bottom"
                  />
                )}
              </AnimatePresence>

              {/* Candle 3 (Right) */}
              <rect x="190" y="20" width="8" height="40" rx="2" className="fill-cyan-400" />
              <rect x="190" y="25" width="8" height="5" className="fill-cyan-200" />
              {/* Candle 3 Flame */}
              <AnimatePresence>
                {!isSliced && (
                  <motion.path
                    animate={{ scale: [1, 0.95, 1.15, 1], y: [0, -1, 0, 1] }}
                    transition={{ repeat: Infinity, duration: 0.7, delay: 0.3 }}
                    exit={{ scale: 0, opacity: 0 }}
                    d="M194,8 C198,12 198,18 194,20 C190,18 190,12 194,8 Z"
                    className="fill-amber-400 stroke-amber-300 origin-bottom"
                  />
                )}
              </AnimatePresence>
            </motion.g>
          </svg>

          {/* Slicing Knife Drag Line Visual */}
          {dragPoints.length > 1 && !isSliced && (
            <svg className="absolute inset-0 w-full h-full pointer-events-none">
              <path
                d={getDragPath()}
                fill="none"
                stroke="url(#dragGradient)"
                strokeWidth="6"
                strokeLinecap="round"
                strokeLinejoin="round"
                className="drop-shadow-[0_0_8px_rgba(244,63,94,0.8)]"
              />
              <defs>
                <linearGradient id="dragGradient" x1="0%" y1="0%" x2="100%" y2="100%">
                  <stop offset="0%" stopColor="#f43f5e" />
                  <stop offset="50%" stopColor="#db2777" />
                  <stop offset="100%" stopColor="#e11d48" />
                </linearGradient>
              </defs>
            </svg>
          )}

          {/* Sparkly pointer particle overlay */}
          {isDragging && dragPoints.length > 0 && (
            <div
              className="absolute w-4 h-4 rounded-full bg-white border border-rose-400 shadow-[0_0_12px_rgba(255,255,255,1)] pointer-events-none"
              style={{
                left: dragPoints[dragPoints.length - 1].x - 8,
                top: dragPoints[dragPoints.length - 1].y - 8
              }}
            />
          )}
        </div>

        {/* Wish Reveal Overlay Banner */}
        <AnimatePresence>
          {isSliced && (
            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ type: 'spring', delay: 0.3 }}
              className="mt-12 py-5 px-10 rounded-2xl glass-card border border-rose-500/30 flex flex-col items-center gap-3 shadow-[0_10px_40px_rgba(244,63,94,0.15)] max-w-sm w-full"
            >
              <div className="flex gap-1.5 text-rose-400">
                <Sparkles className="w-5 h-5 animate-spin" />
                <Heart className="w-5 h-5 fill-rose-500 text-rose-500 animate-bounce" />
                <Sparkles className="w-5 h-5 animate-spin" />
              </div>
              <h3 className="text-3xl font-extrabold text-white tracking-wider font-serif glow-text-pink">
                Make a wish Muskan 🎂✨
              </h3>
              <p className="text-gray-400 text-xs font-sans tracking-wide">
                Blow out the candles and make a beautiful wish!
              </p>
            </motion.div>
          )}
        </AnimatePresence>

      </div>
    </section>
  );
}
