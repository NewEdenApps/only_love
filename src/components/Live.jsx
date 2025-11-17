import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Radio, Calendar, Clock } from 'lucide-react';

const Live = () => {
  const [isLive, setIsLive] = useState(false);
  const [liveVideoId, setLiveVideoId] = useState(null);
  
  // Get channel ID from environment variable
  const channelId = process.env.REACT_APP_YOUTUBE_CHANNEL_ID;
  const apiKey = process.env.REACT_APP_YOUTUBE_API_KEY;
  
  useEffect(() => {
    const checkLiveStatus = async () => {
      try {
        // Check if there's a live broadcast on the channel
        const response = await fetch(
          `https://www.googleapis.com/youtube/v3/search?part=snippet&channelId=${channelId}&eventType=live&type=video&key=${apiKey}`
        );
        
        if (!response.ok) {
          throw new Error('Failed to check live status');
        }
        
        const data = await response.json();
        
        // If there are any live videos, set isLive to true and get the video ID
        if (data.items && data.items.length > 0) {
          console.log('Channel is LIVE!');
          setIsLive(true);
          setLiveVideoId(data.items[0].id.videoId);
        } else {
          console.log('Channel is offline');
          setIsLive(false);
          setLiveVideoId(null);
        }
      } catch (error) {
        console.error('Error checking live status:', error);
        setIsLive(false);
        setLiveVideoId(null);
      }
    };
    
    if (channelId && apiKey) {
      checkLiveStatus();
      
      // Check live status every 5 minutes
      const interval = setInterval(checkLiveStatus, 5 * 60 * 1000);
      
      return () => clearInterval(interval);
    }
  }, [channelId, apiKey]);
  
  return (
    <section id="live" className="py-12 md:py-20 bg-gradient-to-br from-cream via-soft-pink to-cream">
      <div className="container mx-auto px-4 md:px-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="text-center mb-8 md:mb-12 px-2"
        >
          <div className="flex items-center justify-center gap-1.5 sm:gap-2 md:gap-3 mb-4 flex-wrap">
            <Radio className={`w-5 h-5 sm:w-6 sm:h-6 md:w-8 md:h-8 flex-shrink-0 ${isLive ? 'text-primary-red animate-pulse' : 'text-dark-gray/50'}`} />
            <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-playfair font-bold text-dark-gray whitespace-nowrap">
              {isLive ? 'Live Now' : 'Not Live'}
            </h2>
            <Radio className={`w-5 h-5 sm:w-6 sm:h-6 md:w-8 md:h-8 flex-shrink-0 ${isLive ? 'text-primary-red animate-pulse' : 'text-dark-gray/50'}`} />
          </div>
          <p className="text-sm sm:text-base md:text-lg text-dark-gray/80 font-lato max-w-2xl mx-auto px-4">
            {isLive 
              ? 'We are live right now! Tune in to the latest episode of Only Love Radio' 
              : 'Tune in live every Sunday at 8:00 PM EST for the latest episode of Only Love Radio'}
          </p>
        </motion.div>

        <div className="max-w-5xl mx-auto">
          {/* Live Stream Container */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            viewport={{ once: true }}
            className="bg-white rounded-2xl shadow-2xl overflow-hidden border-4 border-primary-red/20"
          >
            {isLive ? (
              <>
                {/* Live Indicator */}
                <div className="bg-primary-red text-white py-2.5 md:py-3 px-3 md:px-6 flex items-center justify-center gap-2 md:gap-3">
                  <span className="relative flex h-2.5 w-2.5 md:h-3 md:w-3 flex-shrink-0">
                    <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-white opacity-75"></span>
                    <span className="relative inline-flex rounded-full h-full w-full bg-white"></span>
                  </span>
                  <span className="font-montserrat font-bold uppercase tracking-wide text-xs sm:text-sm md:text-base whitespace-nowrap">
                    Live Stream - On Air Now
                  </span>
                </div>

                {/* YouTube Embed */}
                <div className="relative w-full" style={{ paddingBottom: '56.25%' }}>
                  <iframe
                    src={`https://www.youtube.com/embed/${liveVideoId}?autoplay=0`}
                    title="Only Love Radio Live Stream"
                    frameBorder="0"
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                    allowFullScreen
                    className="absolute top-0 left-0 w-full h-full"
                  ></iframe>
                </div>
              </>
            ) : (
              <>
                {/* Not Live Message */}
                <div className="bg-dark-gray/10 text-dark-gray py-2.5 md:py-3 px-3 md:px-6 flex items-center justify-center gap-2 md:gap-3">
                  <Radio className="w-4 h-4 md:w-5 md:h-5 flex-shrink-0" />
                  <span className="font-montserrat font-semibold text-xs sm:text-sm md:text-base whitespace-nowrap">
                    Currently Offline
                  </span>
                </div>

                {/* Not Live Placeholder */}
                <div className="relative w-full bg-gradient-to-br from-soft-pink via-cream to-soft-pink" style={{ paddingBottom: '56.25%' }}>
                  <div className="absolute inset-0 flex flex-col items-center justify-center p-3 sm:p-4 md:p-8 text-center">
                    <motion.div
                      initial={{ scale: 0.8, opacity: 0 }}
                      animate={{ scale: 1, opacity: 1 }}
                      transition={{ duration: 0.6 }}
                      className="w-full max-w-md"
                    >
                      <Radio className="w-12 h-12 sm:w-16 sm:h-16 md:w-24 md:h-24 text-primary-red mb-3 sm:mb-4 md:mb-6 mx-auto" />
                      <h3 className="text-xl sm:text-2xl md:text-3xl lg:text-4xl font-playfair font-bold text-dark-gray mb-2 sm:mb-3 md:mb-4 px-2">
                        We'll Be Live Soon!
                      </h3>
                      <p className="text-xs sm:text-sm md:text-base lg:text-lg text-dark-gray/80 font-lato mb-3 sm:mb-4 md:mb-6 px-2 sm:px-4 leading-relaxed">
                        Join us every Sunday at 8:00 PM EST for live broadcasts filled with love, music, and meaningful conversations.
                      </p>
                      <div className="flex flex-col sm:flex-row items-center justify-center gap-1.5 sm:gap-2 text-primary-red font-montserrat font-semibold text-xs sm:text-xs md:text-sm px-2">
                        <div className="flex items-center gap-1 sm:gap-1.5 md:gap-2 whitespace-nowrap">
                          <Calendar className="w-3.5 h-3.5 sm:w-4 sm:h-4 md:w-5 md:h-5 flex-shrink-0" />
                          <span>Sundays</span>
                        </div>
                        <span className="hidden sm:inline">•</span>
                        <div className="flex items-center gap-1 sm:gap-1.5 md:gap-2 whitespace-nowrap">
                          <Clock className="w-3.5 h-3.5 sm:w-4 sm:h-4 md:w-5 md:h-5 flex-shrink-0" />
                          <span>8:00 PM - 10:00 PM EST</span>
                        </div>
                      </div>
                    </motion.div>
                  </div>
                </div>
              </>
            )}

            {/* Schedule Info */}
            <div className="bg-gradient-to-r from-soft-pink to-cream p-3 sm:p-4 md:p-6">
              <div className="flex flex-col md:flex-row items-center justify-center gap-2 sm:gap-3 md:gap-6 text-dark-gray text-xs sm:text-sm md:text-base">
                <div className="flex items-center gap-1.5 sm:gap-2 whitespace-nowrap">
                  <Calendar className="w-3.5 h-3.5 sm:w-4 sm:h-4 md:w-5 md:h-5 text-primary-red flex-shrink-0" />
                  <span className="font-lato font-semibold">Every Sunday</span>
                </div>
                <div className="hidden md:block w-px h-6 bg-primary-red/30"></div>
                <div className="flex items-center gap-1.5 sm:gap-2 whitespace-nowrap">
                  <Clock className="w-3.5 h-3.5 sm:w-4 sm:h-4 md:w-5 md:h-5 text-primary-red flex-shrink-0" />
                  <span className="font-lato font-semibold">8:00 PM - 10:00 PM EST</span>
                </div>
              </div>
            </div>
          </motion.div>

          {/* Call to Action */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
            viewport={{ once: true }}
            className="text-center mt-6 md:mt-8 px-4"
          >
            <p className="text-xs sm:text-sm md:text-base text-dark-gray/70 font-lato mb-3 md:mb-4">
              Can't watch live? Catch up on past episodes below!
            </p>
            <motion.a
              href="#episodes"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="inline-block bg-primary-red text-white px-5 sm:px-6 md:px-8 py-2 sm:py-2.5 md:py-3 rounded-full font-montserrat font-semibold hover:bg-primary-red/90 transition-colors shadow-lg text-xs sm:text-sm md:text-base whitespace-nowrap"
            >
              View Past Episodes
            </motion.a>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default Live;
