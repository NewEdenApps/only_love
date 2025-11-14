import React, { useRef } from 'react';
import { Clock, Radio } from 'lucide-react';
import { motion, useInView } from 'framer-motion';

const Schedule = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  const schedule = [
    {
      day: 'Sundays',
      time: '8:00 PM - 10:00 PM EST',
      type: 'Live Stream',
      note: 'New Episode',
    },
  ];

  return (
    <section id="schedule" className="py-20 bg-cream overflow-hidden">
      <div className="container mx-auto px-6" ref={ref}>
        <motion.h2 
          className="text-4xl md:text-5xl font-playfair font-bold text-primary-red mb-12 text-center"
          initial={{ opacity: 0, y: -50 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: -50 }}
          transition={{ duration: 0.6 }}
        >
          Show Schedule
        </motion.h2>

        <div className="max-w-3xl mx-auto">
          <motion.div 
            className="bg-white rounded-xl shadow-lg overflow-hidden border border-soft-pink"
            initial={{ opacity: 0, scale: 0.9 }}
            animate={isInView ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0.9 }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            {/* Table Header - Hidden on mobile */}
            <div className="hidden md:grid md:grid-cols-4 bg-primary-red text-white font-montserrat font-semibold p-4">
              <div>Day</div>
              <div>Time</div>
              <div>Type</div>
              <div>Note</div>
            </div>

            {/* Schedule Items */}
            {schedule.map((item, index) => (
              <motion.div
                key={index}
                className={`grid grid-cols-1 md:grid-cols-4 gap-2 md:gap-4 p-6 md:p-4 ${
                  index !== schedule.length - 1 ? 'border-b border-soft-pink' : ''
                } ${index % 2 === 1 ? 'bg-cream' : 'bg-white'}`}
                initial={{ opacity: 0, x: -50 }}
                animate={isInView ? { opacity: 1, x: 0 } : { opacity: 0, x: -50 }}
                transition={{ duration: 0.4, delay: 0.3 + (index * 0.1) }}
                whileHover={{ 
                  scale: 1.02,
                  backgroundColor: index % 2 === 1 ? '#F8DDE1' : '#FDFBF7',
                  transition: { duration: 0.2 }
                }}
              >
                {/* Day */}
                <div className="font-lato">
                  <span className="md:hidden font-bold text-dark-gray">Day: </span>
                  <span className="font-bold text-primary-red">{item.day}</span>
                </div>

                {/* Time */}
                <div className="font-lato flex items-center gap-2">
                  <Clock size={16} className="text-gold-accent md:hidden" />
                  <span className="md:hidden font-bold text-dark-gray">Time: </span>
                  <span className="text-dark-gray">{item.time}</span>
                </div>

                {/* Type */}
                <div className="font-lato">
                  <span className="md:hidden font-bold text-dark-gray">Type: </span>
                  <span
                    className={`inline-flex items-center gap-1 px-3 py-1 rounded-full text-sm ${
                      item.type === 'Live Stream'
                        ? 'bg-primary-red text-white'
                        : item.type === 'Special'
                        ? 'bg-gold-accent text-white'
                        : 'bg-soft-pink text-dark-gray'
                    }`}
                  >
                    {item.type === 'Live Stream' && <Radio size={14} />}
                    {item.type}
                  </span>
                </div>

                {/* Note */}
                <div className="font-lato text-dark-gray">
                  <span className="md:hidden font-bold">Note: </span>
                  {item.note}
                </div>
              </motion.div>
            ))}
          </motion.div>

          {/* Additional Info */}
          <motion.div 
            className="mt-8 text-center"
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
            transition={{ duration: 0.6, delay: 0.8 }}
          >
            <p className="text-dark-gray font-lato text-sm">
              All times are in Eastern Standard Time (EST).
              <br />
              <span className="text-gold-accent font-semibold">
                Subscribe to our newsletter to never miss an episode!
              </span>
            </p>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default Schedule;
