// src/pages/home/sections/WhoWeAreSection.tsx
import { useContent } from '../../../content/useContext';
import { trackEvent } from '../../../analytics';
import { useNavigate } from 'react-router-dom';

interface ValueItem {
  number: string;
  label: string;
}

const WhoWeAreSection = () => {
  const { content } = useContent();
  const about = content && content.about ? content.about : null;
  const navigate = useNavigate();

  const values: ValueItem[] = [
    { number: '01', label: 'Integrity' },
    { number: '02', label: 'Transparency' },
    { number: '03', label: 'Innovation' },
    { number: '04', label: 'Team Work' },
  ];

  const handleReadMore = () => {
    trackEvent('who_we_are_read_more');
    if (window.navigator && window.navigator.vibrate) window.navigator.vibrate(50);
    navigate('/about');
  };

  const handleChairpersonVideo = () => {
    trackEvent('chairperson_video_click');
    if (window.navigator && typeof window.navigator.vibrate === 'function') {
      window.navigator.vibrate(50);
    }
    const videoElement = document.getElementById('introVideo');
    if (videoElement) {
      videoElement.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section 
      className="py-20 px-4 md:px-8 max-w-[1280px] mx-auto"
      style={{ backgroundColor: 'var(--psc-surface)' }}
    >
      <div className="flex flex-col lg:flex-row gap-12 items-center">
        <div className="w-full lg:w-1/2">
          <img 
            alt="Public Service Commission" 
            className="rounded-lg object-cover w-full h-auto shadow-md" 
            src="https://www.publicservice.go.ke/wp-content/uploads/2024/11/about-image-4.webp" 
          />
        </div>
        <div className="w-full lg:w-1/2">
          <span 
            className="text-sm font-bold tracking-wider uppercase mb-2 block"
            style={{ color: 'var(--psc-primary)' }}
          >
            WELCOME TO PUBLIC SERVICE COMMISSION
          </span>
          <h2 
            className="text-3xl md:text-4xl font-bold mb-4"
            style={{ color: 'var(--psc-on-surface)' }}
          >
            Who We Are
          </h2>
          <p 
            className="mb-6"
            style={{ color: 'var(--psc-on-surface-variant)' }}
          >
            The Public Service Commission is a Constitutional Commission established under Article 233(1) of the Constitution. It consists of a Chairperson, Vice Chairperson and seven Commissioners appointed by the President with the approval of the National Assembly.
          </p>
          <h3 
            className="text-lg font-semibold mb-4"
            style={{ color: 'var(--psc-on-surface)' }}
          >
            Our core values are;
          </h3>
          <div className="grid grid-cols-2 gap-y-4 gap-x-8 mb-8">
            {values.map((value) => (
              <div key={value.number} className="flex items-center gap-3">
                <span 
                  className="text-2xl font-bold opacity-50"
                  style={{ color: 'var(--psc-primary-container)' }}
                >
                  {value.number}
                </span>
                <span 
                  className="text-sm font-medium"
                  style={{ color: 'var(--psc-on-surface)' }}
                >
                  {value.label}
                </span>
              </div>
            ))}
          </div>
          <div className="flex flex-wrap gap-4 items-center">
            <a 
              href="http://publicservice.go.ke/about-us/"
              target="_blank"
              rel="noopener noreferrer"
              onClick={handleReadMore}
              className="text-white font-bold text-sm px-6 py-2 rounded-lg transition-colors inline-flex items-center gap-2"
              style={{ backgroundColor: 'var(--psc-primary-container)' }}
              onMouseEnter={(e) => {
                e.currentTarget.style.backgroundColor = '#d47d00';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.backgroundColor = 'var(--psc-primary-container)';
              }}
            >
              READ MORE
              <svg aria-hidden="true" className="w-4 h-4" viewBox="0 0 512 512" xmlns="http://www.w3.org/2000/svg">
                <path fill="currentColor" d="M504 256C504 119 393 8 256 8S8 119 8 256s111 248 248 248 248-111 248-248zm-448 0c0-110.5 89.5-200 200-200s200 89.5 200 200-89.5 200-200 200S56 366.5 56 256zm72 20v-40c0-6.6 5.4-12 12-12h116v-67c0-10.7 12.9-16 20.5-8.5l99 99c4.7 4.7 4.7 12.3 0 17l-99 99c-7.6 7.6-20.5 2.2-20.5-8.5v-67H140c-6.6 0-12-5.4-12-12z"></path>
              </svg>
            </a>
            <button 
              onClick={handleChairpersonVideo}
              className="text-sm font-bold flex items-center gap-2 hover:underline"
              style={{ color: 'var(--psc-primary)' }}
            >
              <span className="material-symbols-outlined" data-weight="fill">play_circle</span>
              A WORD FROM THE CHAIRPERSON
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default WhoWeAreSection;