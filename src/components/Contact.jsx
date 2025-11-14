import React, { useState, useRef } from 'react';
import { Send, Facebook, Instagram, Twitter } from 'lucide-react';
import { motion, useInView } from 'framer-motion';

const Contact = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: '',
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState(null);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    setSubmitStatus(null);

    try {
      const formDataToSend = new FormData();
      formDataToSend.append('name', formData.name);
      formDataToSend.append('email', formData.email);
      formDataToSend.append('subject', formData.subject);
      formDataToSend.append('message', formData.message);
      formDataToSend.append('_captcha', 'false'); // Disable captcha for testing
      formDataToSend.append('_template', 'table'); // Nice email format

      const response = await fetch('https://formsubmit.co/sonywayne8@gmail.com', {
        method: 'POST',
        body: formDataToSend,
        headers: {
          'Accept': 'application/json'
        }
      });

      if (response.ok) {
        setSubmitStatus('success');
        setFormData({ name: '', email: '', subject: '', message: '' });
      } else {
        setSubmitStatus('error');
      }
    } catch (error) {
      console.error('Form submission error:', error);
      setSubmitStatus('error');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <section id="contact" className="py-20 bg-white overflow-hidden">
      <div className="container mx-auto px-6" ref={ref}>
        <motion.h2 
          className="text-4xl md:text-5xl font-playfair font-bold text-primary-red mb-12 text-center"
          initial={{ opacity: 0, y: -50 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: -50 }}
          transition={{ duration: 0.6 }}
        >
          Connect with Love
        </motion.h2>

        <div className="grid md:grid-cols-2 gap-12 max-w-5xl mx-auto">
          {/* Contact Form */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={isInView ? { opacity: 1, x: 0 } : { opacity: 0, x: -50 }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            <p className="text-dark-gray font-lato mb-6 text-lg">
              For bookings, inquiries, or just to say hello, please use the form below. 
              We'd love to hear from you!
            </p>

            <form onSubmit={handleSubmit} className="space-y-6">
              {/* Name */}
              <div>
                <label htmlFor="name" className="block text-dark-gray font-lato font-semibold mb-2">
                  Name
                </label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  placeholder="Your name"
                  required
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-red focus:border-transparent font-lato"
                />
              </div>

              {/* Email */}
              <div>
                <label htmlFor="email" className="block text-dark-gray font-lato font-semibold mb-2">
                  Email
                </label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  placeholder="your.email@example.com"
                  required
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-red focus:border-transparent font-lato"
                />
              </div>

              {/* Subject */}
              <div>
                <label htmlFor="subject" className="block text-dark-gray font-lato font-semibold mb-2">
                  Subject
                </label>
                <input
                  type="text"
                  id="subject"
                  name="subject"
                  value={formData.subject}
                  onChange={handleChange}
                  placeholder="What's this about?"
                  required
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-red focus:border-transparent font-lato"
                />
              </div>

              {/* Message */}
              <div>
                <label htmlFor="message" className="block text-dark-gray font-lato font-semibold mb-2">
                  Message
                </label>
                <textarea
                  id="message"
                  name="message"
                  value={formData.message}
                  onChange={handleChange}
                  placeholder="Share your thoughts with us..."
                  required
                  rows="6"
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-red focus:border-transparent font-lato resize-none"
                ></textarea>
              </div>

              {/* Submit Button */}
              <motion.button
                type="submit"
                disabled={isSubmitting}
                className="w-full inline-flex items-center justify-center gap-2 bg-primary-red text-white font-montserrat font-bold px-6 py-4 rounded-lg shadow-lg disabled:opacity-50 disabled:cursor-not-allowed"
                whileHover={!isSubmitting ? { scale: 1.02, boxShadow: "0 20px 40px rgba(216, 44, 79, 0.4)" } : {}}
                whileTap={!isSubmitting ? { scale: 0.95 } : {}}
              >
                <Send size={20} />
                {isSubmitting ? 'Sending...' : 'Send Message'}
              </motion.button>

              {/* Success/Error Messages */}
              {submitStatus === 'success' && (
                <motion.div
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="p-4 bg-green-100 border border-green-400 text-green-700 rounded-lg font-lato"
                >
                  ✅ Thank you! Your message has been sent successfully. We'll get back to you soon!
                </motion.div>
              )}
              
              {submitStatus === 'error' && (
                <motion.div
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="p-4 bg-red-100 border border-red-400 text-red-700 rounded-lg font-lato"
                >
                  ❌ Oops! Something went wrong. Please try again or email us directly.
                </motion.div>
              )}
            </form>
          </motion.div>

          {/* Social Media & Info */}
          <motion.div 
            className="flex flex-col justify-center"
            initial={{ opacity: 0, x: 50 }}
            animate={isInView ? { opacity: 1, x: 0 } : { opacity: 0, x: 50 }}
            transition={{ duration: 0.6, delay: 0.4 }}
          >
            <motion.div 
              className="bg-cream rounded-xl p-8 shadow-md"
              whileHover={{ scale: 1.02 }}
              transition={{ type: "spring", stiffness: 300 }}
            >
              <h3 className="text-2xl font-playfair font-bold text-primary-red mb-6">
                Follow Us on Social Media
              </h3>
              
              <p className="text-dark-gray font-lato mb-8">
                Stay connected and join our community of love. Share your stories, 
                get updates on upcoming episodes, and be part of the conversation.
              </p>

              {/* Social Icons */}
              <div className="flex gap-4 mb-8">
                <motion.a
                  href="https://facebook.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-12 h-12 bg-primary-red hover:bg-gold-accent text-white rounded-full flex items-center justify-center transition-colors"
                  aria-label="Facebook"
                  whileHover={{ scale: 1.2, rotate: 5 }}
                  whileTap={{ scale: 0.9 }}
                >
                  <Facebook size={24} />
                </motion.a>
                <motion.a
                  href="https://instagram.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-12 h-12 bg-primary-red hover:bg-gold-accent text-white rounded-full flex items-center justify-center transition-colors"
                  aria-label="Instagram"
                  whileHover={{ scale: 1.2, rotate: 5 }}
                  whileTap={{ scale: 0.9 }}
                >
                  <Instagram size={24} />
                </motion.a>
                <motion.a
                  href="https://twitter.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-12 h-12 bg-primary-red hover:bg-gold-accent text-white rounded-full flex items-center justify-center transition-colors"
                  aria-label="Twitter"
                  whileHover={{ scale: 1.2, rotate: 5 }}
                  whileTap={{ scale: 0.9 }}
                >
                  <Twitter size={24} />
                </motion.a>
              </div>

              {/* Additional Info */}
              <div className="border-t border-soft-pink pt-6">
                <h4 className="font-lato font-bold text-dark-gray mb-3">
                  Email Us Directly
                </h4>
                <a
                  href="mailto:hello@onlyloveradio.com"
                  className="text-primary-red hover:text-gold-accent font-lato transition-colors"
                >
                  hello@onlyloveradio.com
                </a>
              </div>
            </motion.div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default Contact;
