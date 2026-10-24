// src/components/Sidebar/SidebarFooter.tsx

export default function SidebarFooter() {
  return (
    <div className="mt-auto border-t border-[var(--psc-border,rgba(0,0,0,0.1))] pt-6">
      <div className="flex flex-col items-center justify-center gap-1 text-center opacity-70">
        <p className="text-[10px] font-bold uppercase tracking-widest text-[var(--psc-on-surface,#0f172a)]">
          Public Service Commission
        </p>
        <p className="text-[9px] text-[var(--psc-on-surface-variant,#64748b)]">
          &copy; {new Date().getFullYear()} All rights reserved.
        </p>
      </div>
    </div>
  );
}

/*export default function SidebarFooter() {
  // Check for dark mode (ES5 safe)
  var isDarkMode = false;
  if (typeof document !== "undefined") {
    isDarkMode = document.documentElement.classList.contains('dark');
  }

  var textColor = isDarkMode ? '#D7DED8' : '#374151';
  var borderColor = isDarkMode ? '#2B4A3C' : '#D9DDD8';

  return (
    <div className="pt-6 border-t mt-auto" style={{ borderColor: borderColor }}>
      <div className="flex flex-col gap-1 items-center justify-center text-center w-full opacity-60">
        <p className="text-[10px] font-bold uppercase tracking-widest" style={{ color: textColor }}>
          Built By{' '}
          <a 
            href="https://hillary-porfolio-v2.vercel.app/" 
            target="_blank" 
            rel="noopener noreferrer"
            className="hover:text-primary transition-colors focus:outline-none focus:ring-2 focus:ring-primary rounded"
            style={{ color: textColor }}
          >
            Hillary
          </a>
        </p>
        <p className="text-[9px]" style={{ color: textColor }}>
          &copy; {new Date().getFullYear()} Landscapes Integrity Solutions. All rights reserved.
        </p>
      </div>
    </div>
  );
}*/
