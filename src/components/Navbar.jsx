import { useState, useEffect, useCallback } from 'react';
import { motion } from 'framer-motion';
import { ChevronDown } from 'lucide-react';

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);

  const handleScroll = useCallback(() => {
    setScrolled(window.scrollY > 40);
  }, []);

  useEffect(() => {
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, [handleScroll]);

  const links = ['Overview', 'Gallery', 'Design', 'Specs'];

  const scrollTo = (e, id) => {
    e.preventDefault();
    const el = document.getElementById(id);
    if (el) el.scrollIntoView({ behavior: 'smooth', block: 'start' });
  };

  return (
    <motion.nav
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.6, delay: 0.3 }}
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
        scrolled
          ? 'py-2.5 bg-black/80 backdrop-blur-xl border-b border-white/[0.06]'
          : 'py-4 bg-transparent border-b border-transparent'
      }`}
      style={{ willChange: 'background-color' }}
    >
      <div className="max-w-[1200px] mx-auto px-6 flex justify-between items-center">
        <a href="#" className="flex items-center gap-2.5">
          <img 
            src="/img/ASUSlogo.png" 
            alt="ASUS" 
            className="h-12 sm:h-14 w-auto object-contain" 
          />
          <span className="text-[#555] text-[12px] font-normal hidden sm:inline">
            Vivobook 16X (K3605VC)
          </span>
        </a>

        <div className="hidden lg:flex gap-6 text-[12px] font-normal text-[#86868b]">
          {links.map((item) => (
            <a
              key={item}
              href={`#${item.toLowerCase()}`}
              onClick={(e) => scrollTo(e, item.toLowerCase())}
              className="hover:text-[#f5f5f7] transition-colors duration-200"
            >
              {item}
            </a>
          ))}
        </div>

        {/* Portfolio CTA — scroll to specs instead of Buy */}
        <a
          href="#specs"
          onClick={(e) => scrollTo(e, 'specs')}
          className="text-[12px] font-medium text-white hover:text-[#a1a1aa] transition-colors duration-200 flex items-center gap-1 group"
        >
          View Specs
          <ChevronDown size={14} className="group-hover:translate-y-0.5 transition-transform duration-200" />
        </a>
      </div>
    </motion.nav>
  );
}
