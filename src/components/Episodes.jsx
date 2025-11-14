import React, { useRef, useState, useEffect } from 'react';
import { Play, Calendar } from 'lucide-react';
import { motion, useInView } from 'framer-motion';

const Episodes = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });
  const [episodes, setEpisodes] = useState([]);
  const [loading, setLoading] = useState(true);

  // Your Only Love playlist ID
  const playlistId = "PLWqV6B9T3zV71MaKvAH4QR7gnd5onhwCi";
  
  // YouTube Data API Key from environment variable
  const API_KEY = process.env.REACT_APP_YOUTUBE_API_KEY;

  useEffect(() => {
    const fetchPlaylistVideos = async () => {
      try {
        // Check if we have cached data from today
        const cachedData = localStorage.getItem('onlyLoveEpisodes');
        const cacheTimestamp = localStorage.getItem('onlyLoveEpisodesTimestamp');
        const now = new Date().getTime();
        const oneDay = 24 * 60 * 60 * 1000; // 24 hours in milliseconds

        // Use cached data if it's less than 24 hours old
        if (cachedData && cacheTimestamp && (now - parseInt(cacheTimestamp)) < oneDay) {
          console.log('Loading episodes from cache');
          setEpisodes(JSON.parse(cachedData));
          setLoading(false);
          return;
        }

        console.log('Fetching fresh episodes from YouTube API');
        
        // Fetch videos from YouTube playlist
        // Use search to get videos from the playlist sorted by date
        const response = await fetch(
          `https://www.googleapis.com/youtube/v3/playlistItems?part=snippet&maxResults=50&playlistId=${playlistId}&key=${API_KEY}`
        );
        
        if (!response.ok) {
          throw new Error('Failed to fetch videos');
        }

        const data = await response.json();
        
        console.log('YouTube API Response:', data);
        console.log('Number of items:', data.items ? data.items.length : 0);
        
        // Transform API response to our episode format
        const fetchedEpisodes = data.items.map((item, index) => ({
          id: index + 1,
          title: item.snippet.title,
          publishedAt: item.snippet.publishedAt, // Keep raw date for sorting
          date: new Date(item.snippet.publishedAt).toLocaleDateString('en-US', {
            year: 'numeric',
            month: 'long',
            day: 'numeric'
          }),
          description: item.snippet.description.substring(0, 150) + '...' || 'Watch this episode of Only Love Radio',
          youtubeId: item.snippet.resourceId.videoId,
        }))
        // Sort by publication date - newest first
        .sort((a, b) => new Date(b.publishedAt) - new Date(a.publishedAt))
        // Take only the 6 most recent
        .slice(0, 6)
        // Re-assign IDs after sorting
        .map((episode, index) => ({ ...episode, id: index + 1 }));

        console.log('Fetched episodes (sorted):', fetchedEpisodes);

        // Save to cache
        localStorage.setItem('onlyLoveEpisodes', JSON.stringify(fetchedEpisodes));
        localStorage.setItem('onlyLoveEpisodesTimestamp', now.toString());

        setEpisodes(fetchedEpisodes);
        setLoading(false);
      } catch (error) {
        console.error('Error fetching YouTube videos:', error);
        // Fallback to placeholder if API fails
        setEpisodes([
          {
            id: 1,
            title: 'Only Love - Latest Episode',
            date: 'Recent',
            description: 'Watch the latest episode of Only Love Radio.',
            youtubeId: 'xvEnPzeH80I',
          }
        ]);
        setLoading(false);
      }
    };

    if (API_KEY) {
      fetchPlaylistVideos();
    } else {
      // Show placeholder if API key not set
      setEpisodes([
        {
          id: 1,
          title: 'Only Love - Latest Episode',
          date: 'Recent',
          description: 'Configure YouTube API key to automatically load episodes.',
          youtubeId: 'xvEnPzeH80I',
        }
      ]);
      setLoading(false);
    }
  }, [playlistId, API_KEY]);

  return (
    <section id="episodes" className="py-20 bg-white overflow-hidden">
      <div className="container mx-auto px-6" ref={ref}>
        <motion.h2 
          className="text-4xl md:text-5xl font-playfair font-bold text-primary-red mb-8 text-center"
          initial={{ opacity: 0, y: -50 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: -50 }}
          transition={{ duration: 0.6 }}
        >
          Latest Episodes
        </motion.h2>

        <motion.p
          className="text-center text-dark-gray/80 font-lato mb-12 max-w-2xl mx-auto"
          initial={{ opacity: 0 }}
          animate={isInView ? { opacity: 1 } : { opacity: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
        >
          {loading ? 'Loading latest episodes...' : 'Watch the most recent episodes of Only Love Radio, automatically updated from YouTube'}
        </motion.p>

        {/* Episode Grid - 2 columns */}
        <div className="grid md:grid-cols-2 gap-6 max-w-6xl mx-auto mb-10">
          {episodes.map((episode, index) => (
            <motion.div
              key={episode.id}
              className="bg-cream rounded-lg p-4 shadow-md hover:shadow-xl transition-shadow border border-soft-pink"
              initial={{ opacity: 0, y: 50 }}
              animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 50 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              whileHover={{ 
                scale: 1.02,
                transition: { duration: 0.2 }
              }}
            >
              {/* YouTube Video Player */}
              <div className="relative w-full mb-3" style={{ paddingBottom: '56.25%' }}>
                <iframe
                  className="absolute top-0 left-0 w-full h-full rounded-lg"
                  src={`https://www.youtube.com/embed/${episode.youtubeId}`}
                  title={episode.title}
                  frameBorder="0"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                  allowFullScreen
                ></iframe>
              </div>

              {/* Episode Title */}
              <h3 className="text-lg md:text-xl font-playfair font-bold text-dark-gray mb-2">
                {episode.title}
              </h3>

              {/* Date */}
              <div className="flex items-center gap-2 text-gold-accent font-lato text-sm mb-3">
                <Calendar size={16} />
                <span>{episode.date}</span>
              </div>

              {/* Description */}
              <p className="text-dark-gray font-lato text-sm leading-relaxed mb-4 line-clamp-3">
                {episode.description}
              </p>

              {/* Watch on YouTube Button */}
              <motion.a
                href={`https://www.youtube.com/watch?v=${episode.youtubeId}`}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 bg-primary-red text-white font-montserrat font-semibold px-4 py-2 rounded-lg text-sm"
                whileHover={{ scale: 1.05, boxShadow: "0 10px 25px rgba(216, 44, 79, 0.3)" }}
                whileTap={{ scale: 0.95 }}
              >
                <Play size={16} fill="white" />
                Watch Full Episode
              </motion.a>
            </motion.div>
          ))}
        </div>

        {/* View Full Playlist Button */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={isInView ? { opacity: 1 } : { opacity: 0 }}
          transition={{ duration: 0.6, delay: 0.7 }}
          className="text-center"
        >
          <motion.a
            href={`https://www.youtube.com/playlist?list=${playlistId}`}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 bg-gold-accent text-dark-gray font-montserrat font-semibold px-8 py-4 rounded-full shadow-lg"
            whileHover={{ scale: 1.05, boxShadow: "0 15px 30px rgba(232, 184, 92, 0.4)" }}
            whileTap={{ scale: 0.95 }}
          >
            <Play size={20} />
            View All Episodes on YouTube
          </motion.a>
        </motion.div>
      </div>
    </section>
  );
};

export default Episodes;
