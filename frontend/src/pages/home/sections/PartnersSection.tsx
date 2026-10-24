// src/pages/home/sections/PartnersSection.tsx
import { trackEvent } from '../../../analytics';

interface Partner {
  id: string;
  name: string;
  logo: string;
  url?: string;
  category?: string;
}

const partners: Partner[] = [
  {
    id: 'mozilla',
    name: 'Mozilla',
    logo: 'https://www.publicservice.go.ke/wp-content/uploads/2024/11/Rectangle-51.webp',
  },
  {
    id: 'absa',
    name: 'ABSA',
    logo: 'https://www.publicservice.go.ke/wp-content/uploads/2024/11/Rectangle-51-1.webp',
  },
  {
    id: 'worldbank',
    name: 'World Bank',
    logo: 'https://www.publicservice.go.ke/wp-content/uploads/2024/04/world-bank_0.gif',
  },
  {
    id: 'commonwealth',
    name: 'Commonwealth',
    logo: 'https://www.publicservice.go.ke/wp-content/uploads/2024/11/commonwealth_logo.webp',
  },
  {
    id: 'alf',
    name: 'African Leadership Academy',
    logo: 'https://www.publicservice.go.ke/wp-content/uploads/2024/09/alf_lgo.jpg',
  },
  {
    id: 'unodc',
    name: 'UNODC',
    logo: 'https://www.publicservice.go.ke/wp-content/uploads/2024/11/UNODC-logo-1-1024x538.webp',
  },
  {
    id: 'chandler',
    name: 'Chandler Institute of Governance',
    logo: 'https://www.publicservice.go.ke/wp-content/uploads/2024/11/chandler-logo-1.webp',
  },
  {
    id: 'acbf',
    name: 'African Capacity Building Foundation',
    logo: 'https://www.publicservice.go.ke/wp-content/uploads/2024/11/ACBF_lgo.webp',
  },
  {
    id: 'newcastle',
    name: 'Newcastle University',
    logo: 'https://www.publicservice.go.ke/wp-content/uploads/2024/11/nw.webp',
  },
  {
    id: 'aapscoms',
    name: 'AAPSCOMS',
    logo: 'https://www.publicservice.go.ke/wp-content/uploads/2024/05/AAPSCOMS.png',
  },
  {
    id: 'ccios',
    name: 'CCIOS',
    logo: 'https://www.publicservice.go.ke/wp-content/uploads/2024/05/ccios.png',
  },
  {
    id: 'elf',
    name: 'Emerging Leaders Foundation',
    logo: 'https://www.publicservice.go.ke/wp-content/uploads/2024/11/elf.webp',
  },
];

const PartnersSection = () => {
  const handlePartnerClick = (partner: Partner) => {
    if (!partner.url || partner.url === '#') return;

    trackEvent('partner_click', {
      partner: partner.name,
    });

    if (window.navigator?.vibrate) {
      window.navigator.vibrate(30);
    }

    window.open(partner.url, '_blank', 'noopener,noreferrer');
  };

  const handlePartnerWithUs = () => {
    trackEvent('partner_with_us_click');

    if (window.navigator?.vibrate) {
      window.navigator.vibrate(30);
    }

    window.open(
      'https://publicservice.go.ke/partner-with-us',
      '_blank',
      'noopener,noreferrer'
    );
  };

  return (
    <section
      aria-labelledby="partners-heading"
      className="relative overflow-hidden py-16 sm:py-20"
      style={{ backgroundColor: 'var(--psc-surface)' }}
    >
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-[var(--psc-primary-container)]/40 to-transparent"
      />

      <div className="mx-auto max-w-[1280px] px-4 sm:px-6 lg:px-8">

        <header className="mx-auto mb-10 max-w-3xl text-center sm:mb-12">
          <div className="mb-4 flex items-center justify-center gap-3">
            <span
              aria-hidden="true"
              className="h-px w-8 sm:w-12"
              style={{ backgroundColor: 'var(--psc-primary-container)' }}
            />

            <span 
              className="text-xs font-bold uppercase tracking-[0.18em]"
              style={{ color: 'var(--psc-primary)' }}
            >
              Collaboration
            </span>

            <span
              aria-hidden="true"
              className="h-px w-8 sm:w-12"
              style={{ backgroundColor: 'var(--psc-primary-container)' }}
            />
          </div>

          <h2
            id="partners-heading"
            className="text-3xl font-bold tracking-tight sm:text-4xl"
            style={{ color: 'var(--psc-on-surface)' }}
          >
            Our Partners
          </h2>

          <p 
            className="mx-auto mt-4 max-w-2xl text-sm leading-7 sm:text-base"
            style={{ color: 'var(--psc-on-surface-variant)' }}
          >
            Working with leading organizations to strengthen public service,
            build capacity and create lasting impact.
          </p>
        </header>

        <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 sm:gap-4 md:grid-cols-4 lg:grid-cols-6 lg:gap-5">
          {partners.map((partner) => {
            const isClickable = Boolean(partner.url) && partner.url !== '#';

            const content = (
              <>
                <div className="flex h-28 items-center justify-center px-5 py-5 sm:h-32 lg:h-36">
                  <img
                    src={partner.logo}
                    alt={partner.name}
                    loading="lazy"
                    decoding="async"
                    className="max-h-[72px] max-w-[85%] object-contain transition-transform duration-300 ease-out group-hover:scale-[1.04]"
                  />
                </div>

                <div 
                  className="px-3 py-2.5 text-center"
                  style={{ borderTop: '1px solid var(--psc-border)' }}
                >
                  <span 
                    className="line-clamp-1 text-[11px] font-medium"
                    style={{ color: 'var(--psc-on-surface-variant)' }}
                  >
                    {partner.name}
                  </span>
                </div>
              </>
            );

            const baseClasses = `
              group
              overflow-hidden
              rounded-xl
              transition-all
              duration-300
            `;

            if (isClickable) {
              return (
                <button
                  key={partner.id}
                  type="button"
                  onClick={() => handlePartnerClick(partner)}
                  aria-label={`Visit ${partner.name}`}
                  className={`
                    ${baseClasses}
                    cursor-pointer
                    text-left
                    hover:-translate-y-1
                    hover:border-[var(--psc-primary-container)]/50
                    hover:shadow-[0_12px_30px_rgba(0,0,0,0.08)]
                    dark:hover:shadow-[0_12px_30px_rgba(0,0,0,0.2)]
                    focus-visible:outline-none
                    focus-visible:ring-2
                    focus-visible:ring-[var(--psc-primary-container)]
                    focus-visible:ring-offset-2
                    dark:focus-visible:ring-offset-[#121212]
                  `}
                  style={{ 
                    border: '1px solid var(--psc-border)',
                    backgroundColor: 'var(--psc-surface-container)'
                  }}
                >
                  {content}
                </button>
              );
            }

            return (
              <div
                key={partner.id}
                className={baseClasses}
                style={{ 
                  border: '1px solid var(--psc-border)',
                  backgroundColor: 'var(--psc-surface-container)'
                }}
              >
                {content}
              </div>
            );
          })}
        </div>

        <div className="mt-10 text-center sm:mt-12">
          <button
            type="button"
            onClick={handlePartnerWithUs}
            className="
              group
              inline-flex items-center justify-center
              gap-2.5
              rounded-lg
              px-6 py-3
              text-sm
              font-bold
              uppercase
              tracking-wide
              text-white
              shadow-sm
              transition-all
              duration-300
              hover:-translate-y-0.5
              hover:shadow-lg
              focus-visible:outline-none
              focus-visible:ring-2
              focus-visible:ring-[var(--psc-primary-container)]
              focus-visible:ring-offset-2
              dark:focus-visible:ring-offset-[#121212]
              sm:px-7
            "
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
            <span>Partner With Us</span>

            <svg
              aria-hidden="true"
              className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              strokeWidth="2"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M5 12h14M13 6l6 6-6 6"
              />
            </svg>
          </button>
        </div>

      </div>
    </section>
  );
};

export default PartnersSection;