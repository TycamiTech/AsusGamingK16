import { useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { ArrowDown, Layers } from 'lucide-react';

const EASE = [0.16, 1, 0.3, 1];

const stagger = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.1, delayChildren: 0.1 } },
};

const fadeUp = {
  hidden: { opacity: 0, y: 40 },
  visible: { opacity: 1, y: 0, transition: { duration: 1.2, ease: EASE } },
};

/* Micro-animation component for words */
const AnimatedText = ({ text, className }) => {
  const words = text.split(' ');
  return (
    <motion.div className={`flex flex-wrap justify-center ${className}`} variants={stagger} initial="hidden" animate="visible">
      {words.map((word, i) => (
        <motion.span
          key={i}
          variants={fadeUp}
          className="mr-[0.25em] inline-block"
        >
          {word}
        </motion.span>
      ))}
    </motion.div>
  );
};

export default function Hero() {
  const ref = useRef(null);

  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ['start start', 'end start'],
  });

  const imgScale = useTransform(scrollYProgress, [0, 1], [1, 1.15]);
  const imgY = useTransform(scrollYProgress, [0, 1], ['0%', '-10%']);
  const textOpacity = useTransform(scrollYProgress, [0, 0.4], [1, 0]);

  const scrollTo = (e, id) => {
    e.preventDefault();
    const el = document.getElementById(id);
    if (el) el.scrollIntoView({ behavior: 'smooth', block: 'start' });
  };

  return (
    <section
      ref={ref}
      id="overview"
      className="relative w-full min-h-screen flex flex-col items-center justify-start pt-32 md:pt-40 overflow-hidden"
      style={{
        background: '#000',
      }}
    >
      {/* Rich ambient glow (purple/blue) */}
      <div
        className="pointer-events-none absolute top-[30%] left-1/2 -translate-x-1/2 -translate-y-1/2 w-[1200px] h-[600px] rounded-full opacity-40 blur-[150px]"
        style={{
          background: 'radial-gradient(circle, rgba(120,80,255,0.4) 0%, rgba(0,100,255,0.2) 50%, transparent 80%)',
        }}
      />

      {/* Text block with huge typography */}
      <motion.div
        style={{ opacity: textOpacity, willChange: 'opacity' }}
        className="z-10 text-center px-4 w-full flex flex-col items-center"
      >
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1, delay: 0.2 }}
          className="text-[13px] font-medium tracking-[0.25em] uppercase text-[#86868b] mb-4"
        >
          ASUS Vivobook 16X (K3605VC)
        </motion.p>

        {/* Huge overlapping title */}
        <div className="relative">
          <AnimatedText 
            text="The New K16." 
            className="text-[clamp(4rem,14vw,220px)] font-semibold tracking-[-0.05em] leading-[1.1] text-[#f5f5f7] mb-2 pb-4"
          />
        </div>

        <AnimatedText 
          text="Immersive. Powerful. Unstoppable."
          className="text-gradient-silver-h text-[clamp(1.2rem,3vw,36px)] font-medium tracking-tight mb-12 pb-2"
        />

        {/* Portfolio-style CTAs — no Buy/Pre-order */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.8, ease: EASE }}
          className="flex items-center gap-5 mb-16"
        >
          <a
            href="#gallery"
            onClick={(e) => scrollTo(e, 'gallery')}
            className="px-8 py-3.5 bg-[#0071e3] text-white text-[15px] font-medium rounded-full hover:bg-[#0077ed] transition-all duration-300 shadow-[0_0_20px_rgba(0,113,227,0.4)] flex items-center gap-2.5 group"
          >
            <Layers size={16} strokeWidth={2} />
            Explore Design
          </a>
          <a
            href="#specs"
            onClick={(e) => scrollTo(e, 'specs')}
            className="px-8 py-3.5 border border-white/20 text-[#f5f5f7] text-[15px] font-medium rounded-full hover:bg-white/[0.06] hover:border-white/30 transition-all duration-300 flex items-center gap-2.5 group"
          >
            View Tech Specs
            <ArrowDown size={15} className="group-hover:translate-y-0.5 transition-transform duration-200" />
          </a>
        </motion.div>
      </motion.div>

      {/* Laptop image — with proper padding & object-contain to avoid cropping */}
      <motion.div
        style={{ scale: imgScale, y: imgY, willChange: 'transform' }}
        className="gpu relative z-20 w-full max-w-[1100px] px-8 md:px-12 -mt-[6vh] md:-mt-[10vh]"
      >
        <motion.div
          initial={{ opacity: 0, y: 100 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1.6, delay: 0.6, ease: EASE }}
          className="w-full p-6 md:p-8"
        >
          <img
            src="/img/k16-8.png"
            alt="ASUS Vivobook 16X (K3605VC)"
            className="w-full h-auto object-contain drop-shadow-[0_40px_100px_rgba(0,0,0,0.8)]"
            loading="eager"
          />
        </motion.div>
        
        {/* Front reflection/glow on the laptop */}
        <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent opacity-40 mix-blend-overlay pointer-events-none" />
      </motion.div>

      <div className="absolute bottom-0 left-0 right-0 h-48 bg-gradient-to-t from-black via-black/80 to-transparent pointer-events-none z-30" />
    </section>
  );
}
