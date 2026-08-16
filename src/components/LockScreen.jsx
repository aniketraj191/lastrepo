import { useState, useRef, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Heart, Lock, Unlock } from 'lucide-react';

export default function LockScreen({ onUnlock }) {
  const [pin, setPin] = useState(['', '', '', '']);
  const [error, setError] = useState(false);
  const [unlocked, setUnlocked] = useState(false);
  const inputRefs = useRef([]);

  // Focus first input on mount
  useEffect(() => {
    if (inputRefs.current[0]) {
      inputRefs.current[0].focus();
    }
  }, []);

  const handleChange = (value, index) => {
    if (!/^\d*$/.test(value)) return; // Only allow digits

    const newPin = [...pin];
    // Take the last character entered
    newPin[index] = value.slice(-1);
    setPin(newPin);

    // Auto-focus next input
    if (value && index < 3 && inputRefs.current[index + 1]) {
      inputRefs.current[index + 1].focus();
    }

    // Check passcode if complete
    const combinedPin = newPin.join('');
    if (combinedPin.length === 4) {
      if (combinedPin === '1808') {
        handleSuccess();
      } else {
        handleFailure();
      }
    }
  };

  const handleKeyDown = (e, index) => {
    // Handle backspace key
    if (e.key === 'Backspace') {
      if (!pin[index] && index > 0) {
        const newPin = [...pin];
        newPin[index - 1] = '';
        setPin(newPin);
        if (inputRefs.current[index - 1]) {
          inputRefs.current[index - 1].focus();
        }
      } else {
        const newPin = [...pin];
        newPin[index] = '';
        setPin(newPin);
      }
    }
  };

  const handleSuccess = () => {
    setUnlocked(true);
    // Let the animation complete before unlocking in parent state
    setTimeout(() => {
      onUnlock();
    }, 1200);
  };

  const handleFailure = () => {
    setError(true);
    // Shake animation timer, then reset
    setTimeout(() => {
      setError(false);
      setPin(['', '', '', '']);
      if (inputRefs.current[0]) {
        inputRefs.current[0].focus();
      }
    }, 600);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-[#030303] px-4 overflow-hidden">
      {/* Glow ambient background lights */}
      <div className="absolute top-1/4 left-1/4 -translate-x-1/2 -translate-y-1/2 w-72 h-72 rounded-full bg-rose-950/20 blur-[100px]" />
      <div className="absolute bottom-1/4 right-1/4 translate-x-1/2 translate-y-1/2 w-96 h-96 rounded-full bg-red-950/20 blur-[120px]" />

      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        exit={{ opacity: 0, y: -50 }}
        transition={{ duration: 0.6, ease: 'easeInOut' }}
        className="w-full max-w-md relative z-10"
      >
        <div className={`glass-card rounded-3xl p-8 md:p-12 text-center transition-transform duration-300 ${error ? 'animate-shake' : ''}`}>
          
          {/* Lock Icon */}
          <div className="relative mx-auto w-20 h-20 mb-8 flex items-center justify-center">
            <motion.div
              animate={unlocked ? { scale: [1, 1.2, 0.9, 1.1, 1] } : {}}
              transition={{ duration: 0.8 }}
              className={`absolute inset-0 rounded-2xl flex items-center justify-center transition-colors duration-500 ${
                unlocked ? 'bg-emerald-500/10 border border-emerald-500/30 text-emerald-400' : 'bg-rose-500/10 border border-rose-500/20 text-rose-400'
              }`}
            >
              {unlocked ? <Unlock className="w-8 h-8" /> : <Lock className="w-8 h-8" />}
            </motion.div>
            
            {/* Pulsing rings around lock */}
            {!unlocked && (
              <span className="absolute inset-0 border border-rose-500/20 rounded-2xl animate-ping opacity-75" />
            )}
          </div>

          <h2 className="text-2xl font-semibold tracking-wider text-rose-100 mb-2 font-sans">
            A Surprise Awaits
          </h2>
          <p className="text-gray-400 text-sm mb-8 max-w-[280px] mx-auto">
            Enter the secret key to unlock Muskan's special birthday website.
          </p>

          {/* PIN Input boxes */}
          <div className="flex justify-center gap-4 mb-8">
            {pin.map((digit, index) => (
              <input
                key={index}
                ref={(el) => (inputRefs.current[index] = el)}
                type="text"
                inputMode="numeric"
                maxLength={1}
                value={digit}
                onChange={(e) => handleChange(e.target.value, index)}
                onKeyDown={(e) => handleKeyDown(e, index)}
                disabled={unlocked}
                className={`w-14 h-16 text-center text-2xl font-bold rounded-2xl glass transition-all duration-300 focus:outline-none focus:ring-2 ${
                  unlocked
                    ? 'border-emerald-500/40 text-emerald-400 shadow-[0_0_15px_rgba(16,185,129,0.2)]'
                    : error
                    ? 'border-red-500/50 text-red-400 shadow-[0_0_15px_rgba(239,68,68,0.2)]'
                    : digit
                    ? 'border-rose-500/60 text-rose-300 focus:ring-rose-500/50'
                    : 'border-white/10 text-white focus:ring-rose-500/25'
                }`}
              />
            ))}
          </div>

          <div className="flex justify-center items-center gap-2 text-xs text-rose-400/60 font-cursive text-base">
            <Heart className="w-4 h-4 fill-rose-500/40 text-rose-400/60 animate-pulse" />
            <span>Hint: Birthday (DDMM)</span>
          </div>
        </div>
      </motion.div>
    </div>
  );
}
