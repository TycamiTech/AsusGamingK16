import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const features = [
  {
    id: 'display',
    eyebrow: 'Display',
    title: '16.0" WUXGA. 144Hz. Anti-glare.',
    body: 'A 16.0-inch IPS-level panel with 1920 × 1200 resolution and a 16:10 aspect ratio gives you more vertical space. Featuring a 144Hz refresh rate, 300 nits brightness, and an anti-glare display for clear visuals.',
    image: '/img/k16-1.png',
  },
  {
    id: 'performance',
    eyebrow: 'Performance',
    title: 'Intel® Core™ i7 meets RTX™ 3050.',
    body: 'Equipped with up to a 13th Gen Intel® Core™ i7-13620H processor and NVIDIA® GeForce RTX™ 3050 Laptop GPU with 4GB GDDR6 VRAM, providing powerful performance for gaming and content creation.',
    image: '/img/k16-5.png',
  },
  {
    id: 'cooling',
    eyebrow: 'Thermal Design',
    title: 'ASUS IceCool. Whisper-quiet.',
    body: 'A dual-fan cooling system with wide-diameter heat pipes dissipates heat across a massive surface area. Palm-rest temperatures stay at or below 35 °C even during sustained workloads.',
    image: '/img/k16-6.png',
  },
];

export default function FeatureScroll() {
  const containerRef = useRef(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      const cards = gsap.utils.toArray('.feature-card');
      
      cards.forEach((card) => {
        // Card fade & slide up
        gsap.fromTo(card,
          { y: 80, opacity: 0 },
          {
            y: 0,
            opacity: 1,
            duration: 1,
            ease: "power3.out",
            scrollTrigger: {
              trigger: card,
              start: "top 85%",
            }
          }
        );

        // Image pop-in and subtle parallax
        const img = card.querySelector('.feature-img');
        gsap.fromTo(img,
          { scale: 0.9, opacity: 0, y: 20 },
          {
            scale: 1,
            opacity: 1,
            y: 0,
            duration: 1.2,
            delay: 0.2,
            ease: "power3.out",
            scrollTrigger: {
              trigger: card,
              start: "top 85%",
            }
          }
        );
        
        // Image subtle scroll parallax after appearing
        gsap.to(img, {
          y: -30,
          ease: "none",
          scrollTrigger: {
            trigger: card,
            start: "top bottom",
            end: "bottom top",
            scrub: true,
          }
        });
      });
    }, containerRef);
    return () => ctx.revert();
  }, []);

  return (
    <section ref={containerRef} id="features" className="relative bg-black py-20 md:py-32">
      <div className="max-w-[1400px] mx-auto px-6 md:px-8">
        
        {/* Intro text */}
        <div className="text-center pb-16 md:pb-24 relative z-10">
          <p className="text-[14px] font-medium tracking-[0.25em] uppercase text-[#86868b] mb-6">
            Deep Dive
          </p>
          <h2 className="text-gradient-silver text-[clamp(2.5rem,6vw,80px)] font-semibold tracking-[-0.04em] leading-[1.1] pb-2">
            Every detail, magnified.
          </h2>
        </div>

        {/* Feature Cards Grid */}
        <div className="flex flex-col gap-8 md:gap-12">
          {features.map((feat, i) => {
            const isEven = i % 2 === 0;
            return (
              <div 
                key={feat.id} 
                className={`feature-card flex flex-col ${isEven ? 'lg:flex-row' : 'lg:flex-row-reverse'} bg-[#0a0a0c] rounded-[2.5rem] md:rounded-[3rem] border border-white/[0.05] overflow-hidden`}
              >
                {/* Text Content */}
                <div className="w-full lg:w-1/2 flex flex-col justify-center p-6 sm:p-10 md:p-16 lg:p-24 z-10">
                  <p className="text-[12px] sm:text-[13px] font-bold tracking-[0.2em] uppercase text-[#a1a1aa] mb-4 sm:mb-5">
                    {feat.eyebrow}
                  </p>
                  <h3 className="text-[clamp(1.75rem,4vw,48px)] font-semibold tracking-[-0.03em] leading-[1.15] text-[#f5f5f7] mb-4 sm:mb-6">
                    {feat.title}
                  </h3>
                  <p className="text-[15px] sm:text-[18px] text-[#86868b] leading-[1.6]">
                    {feat.body}
                  </p>
                </div>

                {/* Image Content */}
                <div className="w-full lg:w-1/2 relative min-h-[250px] sm:min-h-[300px] md:min-h-[400px] lg:min-h-0 flex items-center justify-center p-6 sm:p-10 lg:p-16 bg-gradient-to-br from-white/[0.02] to-transparent">
                  {/* Subtle radial glow (monochrome) */}
                  <div className="absolute inset-0 bg-white/5 opacity-50 blur-[100px] pointer-events-none mix-blend-screen" />
                  
                  <img
                    src={feat.image}
                    alt={feat.eyebrow}
                    loading="lazy"
                    className="feature-img relative z-10 w-full h-full object-contain filter drop-shadow-[0_20px_40px_rgba(0,0,0,0.6)]"
                  />
                </div>
              </div>
            );
          })}
        </div>

      </div>
    </section>
  );
}
