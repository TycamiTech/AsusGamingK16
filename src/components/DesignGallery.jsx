import { useRef } from 'react';
import { motion, useInView } from 'framer-motion';

const EASE = [0.16, 1, 0.3, 1];

/* Define gallery images with masonry-style spans */
const galleryItems = [
  { src: '/img/k16-4.png', alt: 'ASUS K16 open laptop angled view', span: 'col-span-2 row-span-2' },
  { src: '/img/k16-2.png', alt: 'ASUS K16 minimalist design language', span: 'col-span-1 row-span-1' },
  { src: '/img/k16-9.png', alt: 'ASUS K16 keyboard deck closeup', span: 'col-span-1 row-span-1' },
  { src: '/img/k16-5.png', alt: 'ASUS K16 performance internals', span: 'col-span-1 row-span-1' },
  { src: '/img/k16-1.png', alt: 'ASUS K16 vivid WUXGA panel detail', span: 'col-span-1 row-span-1' },
  { src: '/img/k16-6.png', alt: 'ASUS K16 IceCool cooling system', span: 'col-span-1 row-span-1' },
  { src: '/img/k16-7.png', alt: 'ASUS K16 connectivity ports', span: 'col-span-1 row-span-1' },
  { src: '/img/k16-3.png', alt: 'ASUS K16 ultra-thin side profile', span: 'col-span-2 row-span-1' },
];

function GalleryCard({ item, index }) {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: '-40px' });

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 40, scale: 0.96 }}
      animate={inView ? { opacity: 1, y: 0, scale: 1 } : {}}
      transition={{ duration: 0.8, delay: index * 0.06, ease: EASE }}
      className={`group relative overflow-hidden rounded-[1.5rem] bg-[#0a0a0a] border border-white/[0.06] hover:border-white/[0.15] transition-all duration-500 ${item.span}`}
    >
      {/* Image container with padding so laptop isn't cropped */}
      <div className="w-full h-full p-4 md:p-5 flex items-center justify-center">
        <img
          src={item.src}
          alt={item.alt}
          loading="lazy"
          className="w-full h-full object-contain transition-transform duration-700 ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:scale-[1.06]"
        />
      </div>

      {/* Subtle gradient overlay on hover */}
      <div className="absolute inset-0 bg-gradient-to-t from-black/30 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none rounded-[1.5rem]" />

      {/* Bottom label on hover */}
      <div className="absolute bottom-0 left-0 right-0 px-5 pb-4 translate-y-3 opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-500 pointer-events-none">
        <p className="text-[12px] font-medium text-white/70 tracking-wide">
          {item.alt.split('—')[1]?.trim() || item.alt.replace('ASUS K16 ', '')}
        </p>
      </div>
    </motion.div>
  );
}

export default function DesignGallery() {
  const headRef = useRef(null);
  const inView = useInView(headRef, { once: true, margin: '-100px' });

  return (
    <section id="gallery" className="relative py-24 md:py-36 overflow-hidden bg-black">
      {/* Ambient glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[60vw] h-[40vh] bg-blue-600/10 blur-[140px] rounded-full pointer-events-none" />

      <div ref={headRef} className="max-w-[1400px] mx-auto px-6 mb-14 md:mb-20 text-center relative z-10">
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, ease: EASE }}
          className="text-[14px] font-medium tracking-[0.25em] uppercase text-[#86868b] mb-6"
        >
          Design Gallery
        </motion.p>
        <motion.h2
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 1, delay: 0.1, ease: EASE }}
          className="text-gradient-silver text-[clamp(2.5rem,7vw,80px)] font-semibold tracking-[-0.04em] leading-[1.2] pb-2"
        >
          Every angle, a statement.
        </motion.h2>
      </div>

      {/* Masonry-style grid */}
      <div className="max-w-[1400px] mx-auto px-6 relative z-10">
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 auto-rows-[180px] md:auto-rows-[220px] gap-3 md:gap-4">
          {galleryItems.map((item, i) => (
            <GalleryCard key={i} item={item} index={i} />
          ))}
        </div>
      </div>
    </section>
  );
}
