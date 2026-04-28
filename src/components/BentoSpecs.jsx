import { useRef } from 'react';
import { motion, useInView } from 'framer-motion';

const EASE = [0.16, 1, 0.3, 1];

/* ── Spec data ── */
const specs = [
  {
    key: 'display',
    label: 'Display',
    value: '144Hz',
    title: '16.0" WUXGA',
    desc: '1920×1200 · 16:10 · IPS-level · Anti-glare',
    span: 'md:col-span-2',
    bgImage: '/img/k16-1.png',
  },
  {
    key: 'processor',
    label: 'Processor',
    value: 'i7',
    title: '13th Gen Intel® Core™',
    desc: 'Up to i7-13620H · 10 cores · 4.9 GHz Turbo',
    span: 'md:col-span-1',
    bgImage: '/img/k16-9.png',
  },
  {
    key: 'gpu',
    label: 'Graphics',
    value: 'RTX 3050',
    title: 'GeForce RTX™ 3050',
    desc: '4 GB GDDR6 · DLSS · Ray Tracing',
    span: 'md:col-span-1',
  },
  {
    key: 'memory',
    label: 'Memory',
    value: '16 GB',
    title: 'DDR4 RAM',
    desc: '8GB On-board + SO-DIMM Expansion',
    span: 'md:col-span-1',
  },
  {
    key: 'cooling',
    label: 'Cooling',
    value: '≤35°C',
    title: 'ASUS IceCool',
    desc: 'Dual-fan · Wide heat pipes',
    span: 'md:col-span-1',
    bgImage: '/img/k16-6.png',
  },
  {
    key: 'storage',
    label: 'Storage',
    value: '512 GB',
    title: 'M.2 NVMe™ PCIe® 4.0',
    desc: 'Ultra-fast SSD storage',
    span: 'md:col-span-1',
  },
  {
    key: 'durability',
    label: 'Durability',
    value: '810H',
    title: 'US MIL-STD',
    desc: 'Military-grade toughness & reliability',
    span: 'md:col-span-1',
  },
  {
    key: 'battery',
    label: 'Battery',
    value: '50Wh',
    title: '3-cell Li-ion',
    desc: '120W fast-charging adapter',
    span: 'md:col-span-2',
    bgImage: '/img/k16-4.png',
  },
];

function SpecCard({ spec, index }) {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: '-40px' });
  const hasBg = !!spec.bgImage;

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 30 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.7, delay: index * 0.06, ease: EASE }}
      className={`group relative overflow-hidden rounded-[1.8rem] border border-white/[0.06] hover:border-white/[0.2] hover:-translate-y-1 transition-all duration-500 hover:shadow-[0_15px_40px_rgba(255,255,255,0.03)] ${spec.span}`}
      style={{
        background: '#0a0a0c',
        willChange: 'transform, opacity',
      }}
    >
      {/* Background image for featured cards */}
      {hasBg && (
        <>
          <div className="absolute inset-0 flex items-center justify-center p-6">
            <img
              src={spec.bgImage}
              alt={spec.label}
              className="w-full h-full object-contain opacity-30 group-hover:opacity-40 group-hover:scale-[1.05] transition-all duration-1000 ease-[cubic-bezier(0.16,1,0.3,1)]"
            />
          </div>
          <div className="absolute inset-0 bg-gradient-to-t from-[#0a0a0c] via-[#0a0a0c]/80 to-[#0a0a0c]/20" />
        </>
      )}

      {/* Content */}
      <div className="relative z-10 p-5 md:p-9 flex flex-col justify-end h-full min-h-[180px] md:min-h-[200px]">
        {/* Label */}
        <p className="text-[10px] md:text-[11px] font-medium tracking-[0.2em] uppercase text-[#555] mb-3 md:mb-4">
          {spec.label}
        </p>

        {/* Big value */}
        <p className="text-[clamp(2rem,4vw,52px)] font-semibold tracking-[-0.04em] leading-none text-[#f5f5f7] mb-2">
          {spec.value}
        </p>

        {/* Title */}
        <p className="text-[15px] font-medium text-[#a1a1aa] mb-1">
          {spec.title}
        </p>

        {/* Description */}
        <p className="text-[13px] text-[#555] leading-relaxed">
          {spec.desc}
        </p>
      </div>
    </motion.div>
  );
}

export default function BentoSpecs() {
  const headRef = useRef(null);
  const inView = useInView(headRef, { once: true, margin: '-100px' });

  return (
    <section
      id="specs"
      className="relative py-28 md:py-40 overflow-hidden bg-black"
    >
      <div ref={headRef} className="max-w-[1400px] mx-auto px-6 mb-16 md:mb-24 text-center">
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, ease: EASE }}
          className="text-[14px] font-medium tracking-[0.25em] uppercase text-[#86868b] mb-6"
        >
          Tech Specs
        </motion.p>
        <motion.h2
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 1, delay: 0.1, ease: EASE }}
          className="text-gradient-silver text-[clamp(2.5rem,7vw,80px)] font-semibold tracking-[-0.04em] leading-[1.2] pb-2"
        >
          Uncompromised.
          <br />
          In every detail.
        </motion.h2>
      </div>

      {/* Grid — 4 columns */}
      <div className="max-w-[1400px] mx-auto px-6">
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-3 md:gap-4">
          {specs.map((spec, i) => (
            <SpecCard key={spec.key} spec={spec} index={i} />
          ))}
        </div>
      </div>
    </section>
  );
}
