import React from 'react';
import { motion } from 'framer-motion';
import { useInView } from 'framer-motion';
import { useRef } from 'react';

const About = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, x: -50 },
    visible: {
      opacity: 1,
      x: 0,
      transition: { duration: 0.6 }
    }
  };

  return (
    <section id="about" className="py-20 bg-cream overflow-hidden">
      <div className="container mx-auto px-6" ref={ref}>
        <div className="grid md:grid-cols-2 gap-12 items-center">
          {/* Left Column - Text */}
          <motion.div
            variants={containerVariants}
            initial="hidden"
            animate={isInView ? "visible" : "hidden"}
          >
            <motion.h2 
              className="text-4xl md:text-5xl font-playfair font-bold text-primary-red mb-6"
              variants={itemVariants}
            >
              About Only Love
            </motion.h2>
            <motion.div 
              className="space-y-4 font-lato text-dark-gray text-lg leading-relaxed"
              variants={containerVariants}
            >
              <motion.p variants={itemVariants}>
                Welcome to <span className="font-bold text-primary-red">Only Love</span>, 
                where every broadcast is a celebration of the heart's most beautiful emotion.
              </motion.p>
              <motion.p variants={itemVariants}>
                Born from a passion to inspire deeper connections and authentic relationships, 
                our show creates a warm, intimate space where listeners can explore the many 
                facets of love romantic, familial, self-love, and the love that binds communities 
                together.
              </motion.p>
              <motion.p variants={itemVariants}>
                Each week, we bring you heartfelt stories, thoughtful conversations, and uplifting 
                music that reminds us why love is the most powerful force in our lives. Whether 
                you're seeking inspiration, healing, or simply a moment of joy, 
                <span className="font-bold"> Only Love</span> is here for you.
              </motion.p>
              <motion.p 
                className="text-gold-accent font-bold italic"
                variants={itemVariants}
              >
                Because in the end, love is all that truly matters.
              </motion.p>
            </motion.div>
          </motion.div>

          {/* Right Column - Image */}
          <motion.div 
            className="relative"
            initial={{ opacity: 0, x: 100, rotate: 5 }}
            animate={isInView ? { opacity: 1, x: 0, rotate: 0 } : { opacity: 0, x: 100, rotate: 5 }}
            transition={{ duration: 0.8, delay: 0.3 }}
          >
            <motion.div 
              className="aspect-square rounded-2xl bg-gradient-to-br from-soft-pink via-primary-red to-gold-accent p-1"
              whileHover={{ scale: 1.02, rotate: 2 }}
              transition={{ type: "spring", stiffness: 300 }}
            >
              <div className="w-full h-full rounded-2xl bg-cream flex items-center justify-center overflow-hidden">
                {/* Your love image */}
                <img 
                  src="/love.png" 
                  alt="Only Love" 
                  className="w-full h-full object-cover"
                />
              </div>
            </motion.div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default About;
