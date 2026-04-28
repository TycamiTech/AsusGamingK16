import { useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import { Cable, MonitorSmartphone, Headphones, Wifi, Bluetooth, Usb } from 'lucide-react';

const EASE = [0.16, 1, 0.3, 1];

const ports = [
  {
    icon: Cable,
    name: 'USB-C 3.2',
    detail: 'Gen 1 · Power Delivery · Charging support',
  },
  {
    icon: Usb,
    name: '2x USB-A 3.2',
    detail: 'Gen 1 · Fast data transfer',
  },
  {
    icon: MonitorSmartphone,
    name: 'HDMI 2.1 TMDS',
    detail: 'Full-size high-speed output',
  },
  {
    icon: Headphones,
    name: '3.5 mm combo',
    detail: 'Audio jack for headphones/mic',
  },
  {
    icon: Wifi,
    name: 'Wi-Fi 6E',
    detail: 'Dual band 2x2 · 802.11ax',
  },
  {
    icon: Bluetooth,
    name: 'Bluetooth 5.3',
    detail: 'Stable wireless connectivity',
  },
];

export default function Connectivity() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: '-80px' });

  return (
    <section
      className="relative py-24 md:py-36 overflow-hidden"
      style={{
        background:
          'radial-gradient(ellipse 80% 50% at 50% 50%, rgba(20,20,22,1) 0%, #000 65%)',
      }}
    >
      <div ref={ref} className="max-w-[1200px] mx-auto px-6">
        {/* Heading */}
        <div className="flex flex-col lg:flex-row justify-between items-start lg:items-end gap-8 mb-14 md:mb-18">
          <div>
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.8, ease: EASE }}
              className="text-[14px] font-medium tracking-[0.25em] uppercase text-[#86868b] mb-6"
            >
              Connectivity
            </motion.p>
            <motion.h2
              initial={{ opacity: 0, y: 30 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 1, delay: 0.1, ease: EASE }}
              className="text-gradient-silver text-[clamp(2.5rem,7vw,80px)] font-semibold tracking-[-0.04em] leading-[1.2] pb-2"
            >
              Connected to everything.
            </motion.h2>
          </div>

          <motion.div
            initial={{ opacity: 0 }}
            animate={inView ? { opacity: 1 } : {}}
            transition={{ duration: 0.8, delay: 0.3, ease: EASE }}
            className="flex-shrink-0"
          >
            {/* Image with object-contain and padding */}
            <div className="w-full max-w-[500px] rounded-[2rem] overflow-hidden bg-[#0a0a0a] border border-white/[0.05] p-4">
              <img
                src="/img/k16-7.png"
                alt="ASUS Vivobook 16X (K3605VC) connectivity ports"
                className="w-full h-auto object-contain rounded-[1.5rem]"
                loading="lazy"
              />
            </div>
          </motion.div>
        </div>

        {/* Port grid */}
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
          {ports.map((port, i) => {
            const Icon = port.icon;
            return (
              <motion.div
                key={port.name}
                initial={{ opacity: 0, y: 24 }}
                animate={inView ? { opacity: 1, y: 0 } : {}}
                transition={{
                  duration: 0.6,
                  delay: 0.15 + i * 0.06,
                  ease: EASE,
                }}
                className="glass-card p-6 flex flex-col items-center text-center transition-all duration-500 hover:bg-white/[0.05] hover:-translate-y-2 hover:shadow-[0_10px_40px_rgba(255,255,255,0.03)] rounded-[1.5rem] group"
                style={{ willChange: 'transform, opacity' }}
              >
                <div className="w-11 h-11 rounded-xl bg-white/[0.06] flex items-center justify-center mb-4 group-hover:bg-white/[0.1] transition-colors duration-300">
                  <Icon size={19} className="text-[#a1a1aa] group-hover:text-[#f5f5f7] transition-colors duration-300" strokeWidth={1.5} />
                </div>
                <p className="text-[14px] font-semibold text-[#f5f5f7] mb-1">
                  {port.name}
                </p>
                <p className="text-[12px] text-[#86868b] leading-snug">
                  {port.detail}
                </p>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
