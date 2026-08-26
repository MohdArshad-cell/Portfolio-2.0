import React from 'react';

export default function SkipToContent() {
  return (
    <a 
      href="#main-content" 
      className="absolute top-0 left-0 -translate-y-full focus:translate-y-0 bg-[#00f3ff] text-black px-4 py-2 font-mono font-black z-[100] transition-transform"
    >
      SKIP_TO_MAIN_CONTENT
    </a>
  );
}
