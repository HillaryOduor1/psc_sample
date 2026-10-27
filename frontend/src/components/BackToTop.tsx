// src/components/BackToTop.tsx
import * as React from 'react';

const BackToTop = () => {
  const [visible, setVisible] = React.useState(false);

  React.useEffect(() => {
    const toggleVisible = () => {
      setVisible(window.scrollY > 300);
    };
    window.addEventListener('scroll', toggleVisible);
    return () => window.removeEventListener('scroll', toggleVisible);
  }, []);

  const scrollToTop = () => {
    try {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    } catch (error) {
      window.scrollTo(0, 0);
    }
  };

  return (
    <button
      onClick={scrollToTop}
      className={`
        fixed bottom-6 right-6 z-50 
        p-4 rounded-full shadow-lg 
        transition-all duration-300 
        focus:outline-none focus:ring-2 focus:ring-[#FCB300] focus:ring-offset-2 focus:ring-offset-[#1A1A1A]
        hover:scale-110 hover:shadow-xl
        ${visible ? 'opacity-100 translate-y-0' : 'opacity-0 pointer-events-none translate-y-4'}
        bg-[#FCB300] text-[#1A1A1A] hover:bg-[#E6A300]
        dark:bg-[#FCB300] dark:text-[#1A1A1A] dark:hover:bg-[#E6A300]
        min-w-[48px] min-h-[48px] flex items-center justify-center
      `}
      aria-label="Back to top"
    >
      <svg 
        width="24" 
        height="24" 
        viewBox="0 0 24 24" 
        fill="none" 
        stroke="currentColor" 
        strokeWidth="2.5" 
        strokeLinecap="round" 
        strokeLinejoin="round"
        className="transition-transform duration-300 group-hover:-translate-y-1"
      >
        <polyline points="18 15 12 9 6 15" />
      </svg>
    </button>
  );
};

export default BackToTop;

/*import * as React from 'react';

const BackToTop = () => {
  const [visible, setVisible] = React.useState(false);

  React.useEffect(() => {
    const toggleVisible = () => {
      setVisible(window.scrollY > 300);
    };
    window.addEventListener('scroll', toggleVisible);
    return () => window.removeEventListener('scroll', toggleVisible);
  }, []);

  const scrollToTop = () => {
    try {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    } catch (error) {
      window.scrollTo(0, 0);
    }
  };

  return (
    <button
      onClick={scrollToTop}
      // Increased touch target padding (p-4 instead of p-3)
      className={`
        fixed bottom-6 right-6 z-50 
        p-4 rounded-full shadow-lg 
        transition-all duration-300 
        focus:outline-none focus:ring-2 focus:ring-[#FCB300] focus:ring-offset-2 focus:ring-offset-[#1A1A1A]
        hover:scale-110 hover:shadow-xl
        ${visible ? 'opacity-100 translate-y-0' : 'opacity-0 pointer-events-none translate-y-4'}
        bg-[#FCB300] text-[#1A1A1A] hover:bg-[#E6A300]
        dark:bg-[#FCB300] dark:text-[#1A1A1A] dark:hover:bg-[#E6A300]
        min-w-[48px] min-h-[48px] flex items-center justify-center
      `}
      aria-label="Back to top"
    >
      <svg 
        width="24" 
        height="24" 
        viewBox="0 0 24 24" 
        fill="none" 
        stroke="currentColor" 
        strokeWidth="2.5" 
        strokeLinecap="round" 
        strokeLinejoin="round"
        className="transition-transform duration-300 group-hover:-translate-y-1"
      >
        <polyline points="18 15 12 9 6 15" />
      </svg>
    </button>
  );
};

export default BackToTop;*/

/*import * as React from 'react';

const BackToTop = () => {
  const [visible, setVisible] = React.useState(false);

  React.useEffect(() => {
    const toggleVisible = () => {
      setVisible(window.scrollY > 300);
    };
    window.addEventListener('scroll', toggleVisible);
    return () => window.removeEventListener('scroll', toggleVisible);
  }, []);

  const scrollToTop = () => {
    try {
      // Attempt smooth scroll with object signature
      window.scrollTo({ top: 0, behavior: 'smooth' });
    } catch (error) {
      // Fallback to numeric signature which is universally supported
      window.scrollTo(0, 0);
    }
  };

  return (
    <button
      onClick={scrollToTop}
      className={`
        fixed bottom-6 right-6 z-50 
        p-3 rounded-full shadow-lg 
        transition-all duration-300 
        focus:outline-none focus:ring-2 focus:ring-[#FCB300] focus:ring-offset-2 focus:ring-offset-[#1A1A1A]
        hover:scale-110 hover:shadow-xl
        ${visible ? 'opacity-100 translate-y-0' : 'opacity-0 pointer-events-none translate-y-4'}
        bg-[#FCB300] text-[#1A1A1A] hover:bg-[#E6A300]
        dark:bg-[#FCB300] dark:text-[#1A1A1A] dark:hover:bg-[#E6A300]
      `}
      aria-label="Back to top"
    >
      <svg 
        width="24" 
        height="24" 
        viewBox="0 0 24 24" 
        fill="none" 
        stroke="currentColor" 
        strokeWidth="2.5" 
        strokeLinecap="round" 
        strokeLinejoin="round"
        className="transition-transform duration-300 group-hover:-translate-y-1"
      >
        <polyline points="18 15 12 9 6 15" />
      </svg>
    </button>
  );
};

export default BackToTop;*/