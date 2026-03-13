import React from 'react'

export default function Footer() {
  return (
      <footer className="bg-[#0d1f17] text-[#c8ddd0] relative overflow-hidden">
      {/* Decorative blobs */}
      <div className="absolute -top-14 -right-14 w-56 h-56 rounded-full bg-green-500/5 pointer-events-none" />
      <div className="absolute -bottom-10 -left-10 w-44 h-44 rounded-full bg-green-500/[0.04] pointer-events-none" />
 
      <div className="relative z-10 max-w-6xl mx-auto px-6 pt-14 pb-6">
 
        {/* Top grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-[2fr_1fr_1fr_1.4fr] gap-10 pb-10 border-b border-white/10">
 
          {/* Brand */}
          <div>
            <div className="flex items-center gap-2.5 mb-4">
              <div className="w-9 h-9 bg-green-500 rounded-[9px] flex items-center justify-center flex-shrink-0">
                <svg className="w-[18px] h-[18px]" viewBox="0 0 24 24" fill="none" stroke="#0d1f17" strokeWidth="2.5" strokeLinecap="round">
                  <polyline points="22 12 18 12 15 21 9 3 6 12 2 12" />
                </svg>
              </div>
              <span className="font-semibold text-[18px] text-[#f0faf4] tracking-tight" style={{ fontFamily: "'Fraunces', serif" }}>
                VitalTrack
              </span>
            </div>
            <p className="text-[13.5px] leading-relaxed text-[#7a9e86] max-w-[220px]">
              Your personal health companion. Track, analyse, and improve your wellness journey every day.
            </p>
            <div className="flex gap-2.5 mt-5">
              {[
                // Twitter
                <path key="tw" d="M23 3a10.9 10.9 0 0 1-3.14 1.53A4.48 4.48 0 0 0 22.4 1s-2 .92-3.12 1.1A4.52 4.52 0 0 0 11.5 7.6 12.84 12.84 0 0 1 1.64 2.16S.1 5.22 1.64 7.92A4.5 4.5 0 0 1 .5 7.1s.06 2.06 2.06 3.06a4.5 4.5 0 0 1-2 .08s.56 1.8 2.8 2.4A9.04 9.04 0 0 1 .5 14s4.6 2.5 9 .5" />,
                // Instagram
                <><rect key="ig1" x="2" y="2" width="20" height="20" rx="5"/><circle key="ig2" cx="12" cy="12" r="4"/><circle key="ig3" cx="17.5" cy="6.5" r="0.5" fill="currentColor"/></>,
                // LinkedIn
                <><path key="li1" d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z"/><rect key="li2" x="2" y="9" width="4" height="12"/><circle key="li3" cx="4" cy="4" r="2"/></>,
              ].map((icon, i) => (
                <button
                  key={i}
                  className="w-[34px] h-[34px] rounded-[8px] border border-white/10 flex items-center justify-center text-[#7a9e86] hover:bg-green-500/10 hover:border-green-500 hover:text-green-500 transition-colors"
                >
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    {icon}
                  </svg>
                </button>
              ))}
            </div>
          </div>
 
          {/* Product links */}
          <div>
            <h4 className="text-[11px] font-semibold tracking-[1.2px] uppercase text-green-500 mb-4">Product</h4>
            <ul className="space-y-2.5">
              {["Dashboard", "Activity Log", "Nutrition", "Sleep Tracker", "Goals", "Reports"].map((item) => (
                <li key={item}>
                  <a href="#" className="text-[13.5px] text-[#7a9e86] hover:text-[#c8ddd0] transition-colors">
                    {item}
                  </a>
                </li>
              ))}
            </ul>
          </div>
 
          {/* Support links */}
          <div>
            <h4 className="text-[11px] font-semibold tracking-[1.2px] uppercase text-green-500 mb-4">Support</h4>
            <ul className="space-y-2.5">
              {["Help Centre", "Community", "Blog", "API Docs", "Contact Us"].map((item) => (
                <li key={item}>
                  <a href="#" className="text-[13.5px] text-[#7a9e86] hover:text-[#c8ddd0] transition-colors">
                    {item}
                  </a>
                </li>
              ))}
            </ul>
          </div>
 
          {/* Newsletter */}
          <div>
            <h4 className="text-[11px] font-semibold tracking-[1.2px] uppercase text-green-500 mb-2">Health Tips</h4>
            <p className="text-[13px] text-[#7a9e86] leading-relaxed mb-4">
              Get weekly wellness insights and feature updates.
            </p>
            <div className="flex flex-col gap-2">
              
              <button className="bg-green-500 text-[#0d1f17] rounded-lg px-3 py-2 text-[13px] font-semibold hover:bg-green-400 transition-colors">
                Subscribe →
              </button>
            </div>
          </div>
        </div>
 
        {/* Bottom bar */}
        <div className="flex flex-wrap items-center justify-between gap-4 pt-5">
          <p className="text-[12px] text-[#4d7056]">© 2026 VitalTrack. All rights reserved.</p>
 
          {/* Live status badge */}
          <div className="flex items-center gap-1.5 text-[11.5px] text-green-500 bg-green-500/[0.08] border border-green-500/20 rounded-full px-3 py-1">
            <span className="w-1.5 h-1.5 bg-green-500 rounded-full animate-pulse" />
            All systems healthy
          </div>
 
          <div className="flex gap-5">
            {["Privacy", "Terms", "Cookies", "Accessibility"].map((link) => (
              <a key={link} href="#" className="text-[12px] text-[#4d7056] hover:text-[#7a9e86] transition-colors">
                {link}
              </a>
            ))}
          </div>
        </div>
 
      </div>
    </footer>
  )
}
