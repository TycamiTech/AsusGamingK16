import { useEffect } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

import Navbar from './components/Navbar';
import Hero from './components/Hero';
import DesignGallery from './components/DesignGallery';
import DesignBody from './components/DesignBody';
import FeatureScroll from './components/FeatureScroll';
import Connectivity from './components/Connectivity';
import BentoSpecs from './components/BentoSpecs';
import Footer from './components/Footer';

gsap.registerPlugin(ScrollTrigger);

function App() {
  /* Refresh ScrollTrigger positions after all images have loaded. */
  useEffect(() => {
    const onLoad = () => {
      /* Delay refresh slightly to allow all layout shifts to settle */
      setTimeout(() => ScrollTrigger.refresh(true), 200);
    };
    window.addEventListener('load', onLoad);

    /* Also refresh on resize (debounced by GSAP internally). */
    ScrollTrigger.config({ ignoreMobileResize: true });

    /* Refresh again after fonts/images finish loading */
    if (document.fonts) {
      document.fonts.ready.then(() => {
        ScrollTrigger.refresh(true);
      });
    }

    return () => window.removeEventListener('load', onLoad);
  }, []);

  return (
    <div className="min-h-screen" style={{ background: '#000' }}>
      <Navbar />

      <main>
        <Hero />
        <DesignGallery />
        <DesignBody />
        <FeatureScroll />
        <Connectivity />
        <BentoSpecs />
      </main>

      <Footer />
    </div>
  );
}

export default App;
