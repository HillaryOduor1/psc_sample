// src/pages/home/sections/PublicationsCTASection.tsx
import { trackEvent } from '../../../analytics';

const PublicationsCTASection = () => {
  const handleExploreClick = () => {
    trackEvent('publications_cta_click');
    if (window.navigator && window.navigator.vibrate) window.navigator.vibrate(50);
  };

  return (
    <section className="relative py-16 px-4 md:px-8 overflow-hidden">
      <div className="absolute inset-0" style={{ backgroundColor: '#1a1c1c', opacity: 0.95 }}></div>
      
      <div className="relative max-w-[1280px] mx-auto">
        <div className="flex flex-col md:flex-row items-center justify-between gap-6 md:gap-8">
          <div className="flex-1 text-center md:text-left">
            <h2 className="text-2xl md:text-3xl lg:text-4xl font-bold text-white mb-2">
              EXPLORE OUR PUBLICATIONS PAGE!
            </h2>
            <h3 className="text-base md:text-lg text-[#D7DED8] font-light">
              A wealth of insights and updates on public service excellence
            </h3>
          </div>
          
          <div className="flex-shrink-0">
            <a
              href="http://publicservice.go.ke/resources/"
              target="_blank"
              rel="noopener noreferrer"
              onClick={handleExploreClick}
              className="group inline-flex items-center gap-3 text-white font-bold px-6 py-3.5 rounded-lg transition-all duration-300 shadow-lg hover:shadow-xl hover:scale-105"
              style={{ 
                backgroundColor: 'var(--psc-primary-container)'
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.backgroundColor = '#d47d00';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.backgroundColor = 'var(--psc-primary-container)';
              }}
            >
              <span>OUR PUBLICATIONS</span>
              <svg 
                className="w-5 h-5 transition-transform duration-300 group-hover:translate-x-1" 
                fill="currentColor" 
                viewBox="0 0 512 512" 
                xmlns="http://www.w3.org/2000/svg"
              >
                <path d="M504 256C504 119 393 8 256 8S8 119 8 256s111 248 248 248 248-111 248-248zm-448 0c0-110.5 89.5-200 200-200s200 89.5 200 200-89.5 200-200 200S56 366.5 56 256zm72 20v-40c0-6.6 5.4-12 12-12h116v-67c0-10.7 12.9-16 20.5-8.5l99 99c4.7 4.7 4.7 12.3 0 17l-99 99c-7.6 7.6-20.5 2.2-20.5-8.5v-67H140c-6.6 0-12-5.4-12-12z"/>
              </svg>
            </a>
          </div>
        </div>
      </div>
    </section>
  );
};

export default PublicationsCTASection;