export default function Footer() {
  const scrollTo = (e, id) => {
    e.preventDefault();
    const el = document.getElementById(id);
    if (el) el.scrollIntoView({ behavior: 'smooth', block: 'start' });
  };

  const navLinks = [
    { label: 'Overview', id: 'overview' },
    { label: 'Gallery', id: 'gallery' },
    { label: 'Design', id: 'design' },
    { label: 'Specs', id: 'specs' },
  ];

  return (
    <footer className="relative border-t border-white/[0.06]" style={{ background: '#000' }}>
      {/* Top links bar */}
      <div className="max-w-6xl mx-auto px-6 py-10 flex flex-col md:flex-row justify-between items-start gap-10 text-[13px] text-[#86868b]">
        <div className="flex flex-col gap-3">
          <img 
            src="/img/ASUSlogo.png" 
            alt="ASUS" 
            className="h-10 sm:h-12 w-auto object-contain opacity-90 -ml-1" 
          />
          <span className="text-[#555]">Vivobook 16X (K3605VC)</span>
          <span className="text-[11px] text-[#444] mt-1">Product Portfolio Showcase</span>
        </div>

        <div className="flex gap-8">
          {navLinks.map((item) => (
            <a
              key={item.label}
              href={`#${item.id}`}
              onClick={(e) => scrollTo(e, item.id)}
              className="hover:text-[#f5f5f7] transition-colors duration-300"
            >
              {item.label}
            </a>
          ))}
        </div>

        <div className="flex gap-8">
          {['Privacy', 'Terms', 'Support'].map((item) => (
            <a
              key={item}
              href="#"
              className="hover:text-[#f5f5f7] transition-colors duration-300"
            >
              {item}
            </a>
          ))}
        </div>
      </div>

      {/* Bottom bar */}
      <div className="border-t border-white/[0.04] max-w-6xl mx-auto px-6 py-5 flex flex-col md:flex-row justify-between items-center text-[12px] text-[#555] gap-3">
        <span>&copy; {new Date().getFullYear()} ASUSTeK Computer Inc. All rights reserved.</span>
        <span>Indonesia</span>
      </div>
    </footer>
  );
}
