import { useRef } from 'react';
import { motion, useInView } from 'framer-motion';

const EASE = [0.16, 1, 0.3, 1];

const stagger = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.05, delayChildren: 0.1 } },
};

const fadeUp = {
  hidden: { opacity: 0, y: 30 },
  visible: { opacity: 1, y: 0, transition: { duration: 1, ease: EASE } },
};

const AnimatedText = ({ text, className }) => {
  const words = text.split(' ');
  return (
    <motion.div className={`flex flex-wrap justify-center ${className}`} variants={stagger} initial="hidden" animate="visible">
      {words.map((word, i) => (
        <motion.span key={i} variants={fadeUp} className="mr-[0.25em] inline-block">
          {word}
        </motion.span>
      ))}
    </motion.div>
  );
};

export default function DesignBody() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: '-100px' });

  return (
    <section
      id="design"
      className="relative py-28 md:py-40 overflow-hidden bg-black"
    >
      <div ref={ref} className="max-w-[1200px] mx-auto px-6">
        {/* Headline */}
        <div className="text-center mb-16 md:mb-24 relative z-10">
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.8, ease: EASE }}
            className="text-[14px] font-medium tracking-[0.25em] uppercase text-[#86868b] mb-6"
          >
            Design
          </motion.p>
          
          {inView && (
            <AnimatedText 
              text="Thin is just the beginning."
              className="text-gradient-silver text-[clamp(2.5rem,7vw,80px)] font-semibold tracking-[-0.04em] leading-[1.2] mb-6 pb-2"
            />
          )}

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.4, ease: EASE }}
            className="text-[#86868b] text-[18px] md:text-[21px] max-w-2xl mx-auto leading-relaxed"
          >
            At just 1.8 kg and 17.9 mm thin, the Vivobook 16X (K3605VC) slips into any
            bag without a second thought — yet opens up to reveal a desktop-class
            16-inch workspace.
          </motion.p>
        </div>

        {/* Wide image — object-contain with padding to avoid laptop cropping */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95, y: 60 }}
          animate={inView ? { opacity: 1, scale: 1, y: 0 } : {}}
          transition={{ duration: 1.4, delay: 0.2, ease: EASE }}
          className="gpu relative w-full rounded-[2.5rem] overflow-hidden z-20 shadow-[0_30px_100px_rgba(0,100,255,0.12)] bg-[#050505] border border-white/[0.05]"
          style={{ willChange: 'transform, opacity' }}
        >
          {/* Padded container so the laptop body is fully visible */}
          <div className="relative p-6 md:p-10">
            <img
              src="/img/k16-3.png"
              alt="ASUS Vivobook 16X (K3605VC) side profile — ultra-thin design"
              className="w-full h-auto object-contain"
              loading="lazy"
            />
          </div>

          {/* Overlay gradient for text readability and premium feel */}
          <div className="absolute inset-0 bg-gradient-to-t from-black via-black/40 to-transparent pointer-events-none" />

          {/* Floating stats */}
          <div className="absolute bottom-0 left-0 right-0 p-8 md:p-14 flex flex-wrap gap-10 md:gap-16">
            {[
              { value: '1.8 kg', label: 'Lightweight' },
              { value: '17.9 mm', label: 'Ultra-thin' },
              { value: '16"', label: 'Screen size' },
              { value: '180°', label: 'Lay-flat hinge' },
            ].map((stat, i) => (
              <motion.div 
                key={stat.label}
                initial={{ opacity: 0, y: 20 }}
                animate={inView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.8, delay: 0.6 + (i * 0.1), ease: EASE }}
              >
                <p className="text-[clamp(1.8rem,4vw,48px)] font-semibold text-[#f5f5f7] tracking-tight leading-none mb-2">
                  {stat.value}
                </p>
                <p className="text-[14px] text-[#86868b] font-medium tracking-wide uppercase">{stat.label}</p>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
}
