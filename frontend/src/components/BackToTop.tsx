import * as React from 'react';

const BackToTop = () => {
  const [visible, setVisible] = React.useState(false);
  const [isMobileDevice, setIsMobileDevice] = React.useState(false);

  React.useEffect(() => {
    // Check if it's a strictly mobile device based on User Agent (iOS/Android)
    // This ensures we only hide the button on phones/tablets where the native gesture exists,
    // NOT on Windows touch laptops or MacBooks.
    const checkMobile = () => {
      const userAgent = typeof window.navigator === "undefined" ? "" : navigator.userAgent;
      const mobileRegex = /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i;
      setIsMobileDevice(mobileRegex.test(userAgent));
    };
    
    checkMobile();

    // Handle scroll visibility
    const toggleVisible = () => {
      setVisible(window.scrollY > 300);
    };
    window.addEventListener('scroll', toggleVisible);
    
    // Check once on mount in case the page loads scrolled down
    toggleVisible();

    return () => window.removeEventListener('scroll', toggleVisible);
  }, []);

  const scrollToTop = () => {
    try {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    } catch (error) {
      window.scrollTo(0, 0);
    }
  };

  // Only hide the button on strict mobile devices
  if (isMobileDevice) {
    return null;
  }

  return (
    <button
      onClick={scrollToTop}
      className={`
        fixed bottom-6 right-6 z-[90] 
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
