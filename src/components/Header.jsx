import React, { useState } from 'react';
import { Menu, X } from 'lucide-react';

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const scrollToSection = (id) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
      setIsMenuOpen(false);
    }
  };

  return (
    <header className="bg-cream shadow-md fixed w-full top-0 z-50">
      <nav className="container mx-auto px-6 py-4">
        <div className="flex justify-between items-center">
          {/* Logo */}
          <button
            onClick={() => scrollToSection('home')}
            className="flex items-center gap-3 hover:opacity-80 transition-opacity"
          >
            <img 
              src="/logo.png" 
              alt="Only Love Logo" 
              className="h-12 w-auto"
            />
            <span className="text-2xl font-playfair font-bold text-primary-red hidden sm:block">
              Only Love
            </span>
          </button>

          {/* Desktop Navigation */}
          <ul className="hidden md:flex space-x-8 font-lato">
            <li>
              <button
                onClick={() => scrollToSection('home')}
                className="text-dark-gray hover:text-primary-red transition-colors"
              >
                Home
              </button>
            </li>
            <li>
              <button
                onClick={() => scrollToSection('live')}
                className="text-dark-gray hover:text-primary-red transition-colors font-semibold"
              >
                Live
              </button>
            </li>
            <li>
              <button
                onClick={() => scrollToSection('about')}
                className="text-dark-gray hover:text-primary-red transition-colors"
              >
                About
              </button>
            </li>
            <li>
              <button
                onClick={() => scrollToSection('episodes')}
                className="text-dark-gray hover:text-primary-red transition-colors"
              >
                Episodes
              </button>
            </li>
            <li>
              <button
                onClick={() => scrollToSection('schedule')}
                className="text-dark-gray hover:text-primary-red transition-colors"
              >
                Schedule
              </button>
            </li>
            <li>
              <button
                onClick={() => scrollToSection('contact')}
                className="text-dark-gray hover:text-primary-red transition-colors"
              >
                Contact
              </button>
            </li>
          </ul>

          {/* Mobile Menu Button */}
          <button
            className="md:hidden text-gold-accent"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
          >
            {isMenuOpen ? <X size={28} /> : <Menu size={28} />}
          </button>
        </div>

        {/* Mobile Navigation */}
        {isMenuOpen && (
          <div className="md:hidden mt-4 pb-4">
            <ul className="flex flex-col space-y-4 font-lato">
              <li>
                <button
                  onClick={() => scrollToSection('home')}
                  className="text-dark-gray hover:text-primary-red transition-colors block w-full text-left"
                >
                  Home
                </button>
              </li>
              <li>
                <button
                  onClick={() => scrollToSection('live')}
                  className="text-dark-gray hover:text-primary-red transition-colors block w-full text-left font-semibold"
                >
                  Live
                </button>
              </li>
              <li>
                <button
                  onClick={() => scrollToSection('about')}
                  className="text-dark-gray hover:text-primary-red transition-colors block w-full text-left"
                >
                  About
                </button>
              </li>
              <li>
                <button
                  onClick={() => scrollToSection('episodes')}
                  className="text-dark-gray hover:text-primary-red transition-colors block w-full text-left"
                >
                  Episodes
                </button>
              </li>
              <li>
                <button
                  onClick={() => scrollToSection('schedule')}
                  className="text-dark-gray hover:text-primary-red transition-colors block w-full text-left"
                >
                  Schedule
                </button>
              </li>
              <li>
                <button
                  onClick={() => scrollToSection('contact')}
                  className="text-dark-gray hover:text-primary-red transition-colors block w-full text-left"
                >
                  Contact
                </button>
              </li>
            </ul>
          </div>
        )}
      </nav>
    </header>
  );
};

export default Header;
