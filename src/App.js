import React from 'react';
import Header from './components/Header';
import Hero from './components/Hero';
import Live from './components/Live';
import About from './components/About';
import Episodes from './components/Episodes';
import Schedule from './components/Schedule';
import Contact from './components/Contact';
import Footer from './components/Footer';

function App() {
  return (
    <div className="App">
      <Header />
      <main>
        <Hero />
        <Live />
        <About />
        <Episodes />
        <Schedule />
        <Contact />
      </main>
      <Footer />
    </div>
  );
}

export default App;
