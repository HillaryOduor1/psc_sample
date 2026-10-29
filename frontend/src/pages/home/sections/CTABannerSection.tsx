// src/pages/home/sections/CTABannerSection.tsx
import { useContent } from '../../../content/useContext';
import { trackEvent } from '../../../analytics';

const CTABannerSection = () => {
  const { content } = useContent();
  const cta = content && content.cta ? content.cta : null;

  const title =
    cta && typeof cta.title === 'string'
      ? cta.title
      : 'EXPLORE EXCITING JOB OPPORTUNITIES!';
  const description =
    cta && typeof cta.description === 'string'
      ? cta.description
      : 'Your future in public service starts here';
  const buttonText =
    cta && typeof cta.primaryButtonText === 'string'
      ? cta.primaryButtonText
      : 'APPLY NOW';

  const EXTERNAL_URL =
    'https://pscims-demo-abdae3amewazb9ae.uaenorth-01.azurewebsites.net/jobs/Default.aspx';

  const handleClick = () => {
    trackEvent('cta_banner_click');

    // Optional haptic feedback on supported devices.
    const nav = window.navigator as Navigator & {
      vibrate?: (pattern: number | number[]) => boolean;
    };
    if (typeof nav.vibrate === 'function') {
      try {
        nav.vibrate(50);
      } catch {
        /* ignore – not critical */
      }
    }

    // External navigation. Do NOT use react-router's navigate() here.
    window.location.href = EXTERNAL_URL;
  };

  return (
    <section className="px-4 md:px-8 max-w-[1280px] mx-auto mb-20">
      <div
        className="rounded-xl p-8 md:p-12 flex flex-col md:flex-row items-center justify-between gap-6 relative overflow-hidden"
        style={{ backgroundColor: 'var(--psc-primary-container)' }}
      >
        {/* Decorative elements */}
        <div
          className="absolute inset-0 opacity-10 pointer-events-none"
          style={{
            backgroundImage:
              'radial-gradient(circle at 100% 100%, #000 0%, transparent 50%)',
          }}
        ></div>
        <div className="absolute -top-20 -right-20 w-64 h-64 rounded-full bg-white/5 pointer-events-none"></div>
        <div className="absolute -bottom-20 -left-20 w-64 h-64 rounded-full bg-white/5 pointer-events-none"></div>

        <div className="relative z-10">
          <h2
            className="text-3xl md:text-4xl font-bold mb-2"
            style={{ color: 'var(--psc-on-primary)' }}
          >
            {title}
          </h2>
          <p
            className="text-lg"
            style={{
              color: 'var(--psc-on-primary)',
              opacity: 0.8,
            }}
          >
            {description}
          </p>
        </div>
        <button
          onClick={handleClick}
          className="relative z-10 font-bold text-sm px-8 py-3 rounded-lg hover:opacity-90 transition-opacity flex items-center gap-2 shrink-0 shadow-lg"
          style={{
            backgroundColor: 'var(--psc-surface-container)',
            color: 'var(--psc-primary)',
          }}
        >
          {buttonText}{' '}
          <span className="material-symbols-outlined text-sm">
            arrow_circle_right
          </span>
        </button>
      </div>
    </section>
  );
};

export default CTABannerSection;