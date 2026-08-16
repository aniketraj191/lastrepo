import React from 'react';
import { motion } from 'framer-motion';
import { Calendar, Sparkles, Heart, Compass, MessageCircle } from 'lucide-react';

export default function MemorySection() {
  const memories = [
    {
      id: 1,
      title: 'Our First Chat',
      desc: 'The beginning of something magical. The day a simple conversation turned into a beautiful connection that brightens every single day.',
      icon: <MessageCircle className="w-8 h-8 text-rose-400" />,
      date: 'A beautiful beginning',
      rotation: -4,
      bgGradient: 'from-pink-500/20 via-rose-500/10 to-transparent'
    },
    {
      id: 2,
      title: 'Every Little Detail',
      desc: 'From your favorite songs to your sweetest laughter, every little detail about you makes you the absolute center of my thoughts.',
      icon: <Sparkles className="w-8 h-8 text-amber-400" />,
      date: 'Held close in my heart',
      rotation: 4,
      bgGradient: 'from-rose-500/20 via-red-500/10 to-transparent'
    }
  ];

  return (
    <section className="relative min-h-screen py-24 flex flex-col justify-center items-center px-4 overflow-hidden z-20">
      
      {/* Background gradients */}
      <div className="absolute top-1/3 right-1/4 w-80 h-80 rounded-full bg-red-900/5 blur-[100px] pointer-events-none" />
      <div className="absolute bottom-1/3 left-1/4 w-80 h-80 rounded-full bg-rose-950/10 blur-[100px] pointer-events-none" />

      <div className="max-w-5xl w-full relative">
        {/* Section Heading */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="text-center mb-16 space-y-3"
        >
          <span className="text-rose-400 font-cursive text-2xl tracking-wide">The Journey</span>
          <h2 className="text-4xl md:text-5xl font-extrabold text-white tracking-tight font-serif">
            Our Beautiful Story
          </h2>
          <p className="text-gray-400 max-w-md mx-auto text-sm">
            Two beautiful polaroid memory tokens keeping the most precious chapters of our story safe.
          </p>
        </motion.div>

        {/* Polaroids Display */}
        <div className="flex flex-col md:flex-row justify-center items-center gap-10 md:gap-16 px-4">
          {memories.map((memory) => (
            <motion.div
              key={memory.id}
              initial={{ opacity: 0, y: 50, rotate: 0 }}
              whileInView={{ 
                opacity: 1, 
                y: 0, 
                rotate: memory.rotation,
                transition: { type: 'spring', stiffness: 60, damping: 12 }
              }}
              viewport={{ once: true, margin: '-100px' }}
              whileHover={{ 
                scale: 1.05, 
                rotate: 0,
                zIndex: 10,
                boxShadow: '0 25px 60px rgba(244, 63, 94, 0.2)'
              }}
              className="w-full max-w-sm bg-white p-5 pb-8 rounded-sm shadow-[0_20px_45px_rgba(0,0,0,0.55)] border border-gray-200 cursor-pointer text-gray-800 transition-all duration-300"
            >
              {/* Polaroid Photo Box (Stylized with graphic and gradient) */}
              <div className={`relative aspect-4/3 w-full bg-gradient-to-tr ${memory.bgGradient} bg-[#0b0c10] rounded-sm overflow-hidden mb-6 flex flex-col items-center justify-center border border-gray-300 group`}>
                
                {/* Grid Overlay Effect */}
                <div className="absolute inset-0 bg-[linear-gradient(to_right,#ffffff05_1px,transparent_1px),linear-gradient(to_bottom,#ffffff05_1px,transparent_1px)] bg-[size:14px_24px] pointer-events-none" />

                {/* Ambient glow light inside photo */}
                <div className="absolute w-24 h-24 rounded-full bg-rose-500/20 blur-xl group-hover:scale-150 transition-transform duration-500" />

                {/* Icon Badge */}
                <div className="relative p-4 rounded-full bg-white/5 border border-white/10 shadow-lg mb-2">
                  {memory.icon}
                </div>

                <Heart className="absolute bottom-3 right-3 w-4 h-4 fill-rose-500/25 text-rose-500/60" />
              </div>

              {/* Polaroid Handwritten Description */}
              <div className="space-y-3 px-2">
                <div className="flex justify-between items-center border-b border-gray-100 pb-2">
                  <h3 className="text-2xl font-bold text-rose-700 font-cursive tracking-wide">
                    {memory.title}
                  </h3>
                  <div className="flex items-center gap-1 text-[10px] text-gray-400 font-mono tracking-wider uppercase">
                    <Calendar className="w-3 h-3 text-gray-400" />
                    <span>{memory.date}</span>
                  </div>
                </div>
                <p className="text-gray-600 text-sm leading-relaxed font-sans font-light">
                  {memory.desc}
                </p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
