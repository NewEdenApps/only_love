import React from 'react';
import { motion } from 'framer-motion';

const Hero = () => {
  return (
    <section
      id="home"
      className="min-h-screen flex items-center justify-center bg-gradient-to-br from-soft-pink to-cream pt-20 overflow-hidden relative w-full"
    >
      <div className="container mx-auto px-4 md:px-6 py-12 md:py-20 text-center relative z-10 w-full max-w-full">
        {/* Host Image */}
        <motion.div 
          className="mb-6 md:mb-8"
          initial={{ scale: 0, rotate: -180 }}
          animate={{ scale: 1, rotate: 0 }}
          transition={{ 
            type: "spring", 
            stiffness: 260, 
            damping: 20,
            duration: 1 
          }}
        >
          <motion.div 
            className="w-32 h-32 md:w-48 md:h-48 mx-auto rounded-full bg-gradient-to-br from-primary-red to-gold-accent p-1"
            animate={{ 
              boxShadow: [
                "0 0 20px rgba(216, 44, 79, 0.3)",
                "0 0 40px rgba(232, 184, 92, 0.5)",
                "0 0 20px rgba(216, 44, 79, 0.3)"
              ]
            }}
            transition={{ 
              duration: 3, 
              repeat: Infinity,
              ease: "easeInOut"
            }}
          >
            <div className="w-full h-full rounded-full bg-cream flex items-center justify-center overflow-hidden">
              {/* Replace with your host photo or logo */}
              <img 
                src="/logo.png" 
                alt="Only Love Show Host" 
                className="w-full h-full object-cover"
              />
              {/* If you don't have an image yet, you can use this placeholder: */}
              {/* <div className="w-full h-full bg-gradient-to-br from-soft-pink to-gold-accent opacity-30"></div> */}
            </div>
          </motion.div>
        </motion.div>

        {/* Show Name */}
        <motion.h1 
          className="text-5xl md:text-6xl lg:text-7xl xl:text-8xl font-playfair font-bold text-primary-red mb-3 md:mb-4 px-4"
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3, duration: 0.8 }}
        >
          Only Love
        </motion.h1>
        
        <motion.p 
          className="text-xl md:text-2xl lg:text-3xl font-playfair text-gold-accent mb-6 md:mb-8 px-4"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5, duration: 0.8 }}
        >
          Seulement l'Amour
        </motion.p>

        {/* Tagline */}
        <motion.h3 
          className="text-lg md:text-xl lg:text-2xl font-lato text-dark-gray mb-8 md:mb-12 max-w-2xl mx-auto px-6"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.7, duration: 0.8 }}
        >
          Your weekly dose of connection, joy, and matters of the heart.
        </motion.h3>

        {/* Floating Hearts Background */}
        {[...Array(15)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute text-primary-red opacity-10 pointer-events-none"
            style={{
              left: `${Math.max(5, Math.min(5 + i * 6.5, 95))}%`,
              fontSize: `${25 + (i % 5) * 12}px`
            }}
            initial={{ y: 100, opacity: 0 }}
            animate={{ 
              y: [-100, -900],
              opacity: [0, 0.15, 0.25, 0.15, 0],
              x: [0, Math.sin(i) * 40, Math.cos(i) * 30, 0],
              rotate: [0, 15, -15, 0]
            }}
            transition={{
              duration: 10 + (i % 8),
              repeat: Infinity,
              delay: i * 0.8,
              ease: "easeInOut"
            }}
          >
            ♥
          </motion.div>
        ))}
        
        {/* Additional Scattered Hearts */}
        {[...Array(10)].map((_, i) => (
          <motion.div
            key={`extra-${i}`}
            className="absolute opacity-10 pointer-events-none"
            style={{
              left: `${Math.max(10, Math.min(10 + i * 9, 90))}%`,
              fontSize: `${20 + (i % 4) * 8}px`,
              color: i % 2 === 0 ? '#D82C4F' : '#E8B85C'
            }}
            initial={{ y: 50, opacity: 0, scale: 0 }}
            animate={{ 
              y: [-50, -700],
              opacity: [0, 0.2, 0.3, 0.2, 0],
              scale: [0.5, 1, 1.2, 0.8, 0.5],
              rotate: [0, 20, -20, 0]
            }}
            transition={{
              duration: 12 + (i % 6),
              repeat: Infinity,
              delay: i * 1.2 + 5,
              ease: "easeInOut"
            }}
          >
            ♥
          </motion.div>
        ))}
      </div>
    </section>
  );
};

export default Hero;
