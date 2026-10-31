// src/pages/home/sections/OpportunitiesSection.tsx
import { useState } from 'react';
import { trackEvent } from '../../../analytics';

interface ProgramLink {
  title: string;
  url: string;
}

const OpportunitiesSection = () => {
  const [activeTab, setActiveTab] = useState<'programs' | 'internships'>('programs');

  const youthPrograms: ProgramLink[] = [
    { title: 'Youth Empowerment', url: 'https://vision2030.go.ke/project/youth-empowerment/' },
    { title: 'Youth Empowerment Programmes', url: 'https://youth.go.ke/youth-empowerment-centers/' },
    { title: 'Kenya Youth Employment & Opportunities', url: 'https://kyeop.go.ke/' },
    { title: 'Youth Enterprise Development Fund', url: 'http://www.youthfund.go.ke/' },
    { title: 'Uwezo Fund', url: 'https://www.uwezo.go.ke/loan-products/' },
    { title: 'Youth Innovation & Enterprise Development', url: 'https://psyg.go.ke/youth-employment/' },
    { title: 'Ajira Digital Programme', url: 'https://ajiradigital.go.ke/#/index' },
  ];

  const internships: ProgramLink[] = [
    { title: 'CBK Internship Programme', url: 'https://www.centralbank.go.ke/2023/07/04/cbk-internship-program-6/' },
    { title: 'Career Development Programme', url: 'https://www.cak.go.ke/careers/Impacting-Knowledge-and-Experience' },
    { title: 'KIPPRA Internship', url: 'https://kippra.or.ke/internships/' },
    { title: 'KURA Internship', url: 'https://kura.go.ke/internship-opportunities/' },
    { title: 'KNCHR Internship', url: 'https://www.knchr.org/Careers/Internship-Programme' },
    { title: 'KNLS Internship', url: 'https://www.knls.ac.ke/internship/' },
    { title: "NGO's Coordination Board Internship", url: 'https://ngobureau.go.ke/?page_id=70' },
    { title: 'Engineers Board Of Kenya Internship', url: 'https://ebk.go.ke/graduate-engineers-internship-programme/' },
    { title: 'Kenya Revenue Authority Internship', url: 'https://www.kra.go.ke/careers' },
    { title: 'Presidential DigiTalent Programme', url: 'https://digitalent.go.ke/' },
  ];

  const handleLinkClick = (title: string, url: string) => {
    trackEvent('opportunity_link_click', { title, url });
    if (window.navigator && window.navigator.vibrate) window.navigator.vibrate(50);
    window.open(url, '_blank', 'noopener,noreferrer');
  };

  return (
    <section style={{ backgroundColor: 'var(--psc-surface)' }} className="py-20">
      <div className="px-4 md:px-8 max-w-[1280px] mx-auto">
        {/* Upcoming Events Section */}
        <div className="mb-16">
          <div className="flex items-center gap-3 mb-6">
            {/* Left border removed here */}
            <h2 
              className="text-2xl md:text-3xl font-bold"
              style={{ color: 'var(--psc-on-surface)' }}
            >
              Upcoming Events
            </h2>
          </div>
          
          <div 
            className="rounded-2xl shadow-lg p-8 text-center"
            style={{ 
              backgroundColor: 'var(--psc-surface-container)',
              border: '1px solid var(--psc-border)'
            }}
          >
            <div className="flex flex-col items-center justify-center py-12">
              <h3 
                className="text-xl font-semibold mb-2"
                style={{ color: 'var(--psc-on-surface)' }}
              >
                No Upcoming Events
              </h3>
              <p 
                className="max-w-md"
                style={{ color: 'var(--psc-on-surface-variant)' }}
              >
                Currently, there are no events planned. Please check back later for updates on our programs and activities.
              </p>
              <div className="mt-6 flex gap-2 flex-wrap justify-center">
                <span 
                  className="px-3 py-1 text-xs rounded-full"
                  style={{ 
                    backgroundColor: 'var(--psc-surface-variant)',
                    color: 'var(--psc-primary)'
                  }}
                >
                  Check back soon
                </span>
                <span 
                  className="px-3 py-1 text-xs rounded-full"
                  style={{ 
                    backgroundColor: 'var(--psc-surface-variant)',
                    color: 'var(--psc-primary)'
                  }}
                >
                  Subscribe for updates
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* Government Programmes & Opportunities */}
        <div>
          <div className="flex items-center gap-3 mb-6">
            {/* Left border removed here */}
            <h2 
              className="text-2xl md:text-3xl font-bold"
              style={{ color: 'var(--psc-on-surface)' }}
            >
              Explore Other Government Programmes & Opportunities
            </h2>
          </div>

          <div 
            className="flex gap-2 mb-6 rounded-xl p-1 w-full max-w-md"
            style={{ 
              backgroundColor: 'var(--psc-surface-container)',
              border: '1px solid var(--psc-border)'
            }}
          >
            <button
              onClick={() => setActiveTab('programs')}
              className={`flex-1 px-6 py-2.5 rounded-lg text-sm font-bold transition-all ${
                activeTab === 'programs'
                  ? 'text-white shadow-md'
                  : ''
              }`}
              style={{
                backgroundColor: activeTab === 'programs' ? 'var(--psc-primary-container)' : 'transparent',
                color: activeTab === 'programs' ? '#ffffff' : 'var(--psc-on-surface-variant)'
              }}
            >
              Youth Programs
            </button>
            <button
              onClick={() => setActiveTab('internships')}
              className={`flex-1 px-6 py-2.5 rounded-lg text-sm font-bold transition-all ${
                activeTab === 'internships'
                  ? 'text-white shadow-md'
                  : ''
              }`}
              style={{
                backgroundColor: activeTab === 'internships' ? 'var(--psc-primary-container)' : 'transparent',
                color: activeTab === 'internships' ? '#ffffff' : 'var(--psc-on-surface-variant)'
              }}
            >
              Internships
            </button>
          </div>

          <div 
            className="rounded-2xl shadow-lg p-6 md:p-8"
            style={{ 
              backgroundColor: 'var(--psc-surface-container)',
              border: '1px solid var(--psc-border)'
            }}
          >
            <h3 
              className="text-lg font-bold mb-4 flex items-center gap-2"
              style={{ color: 'var(--psc-on-surface)' }}
            >
              <span 
                className="w-2 h-2 rounded-full"
                style={{ backgroundColor: 'var(--psc-primary-container)' }}
              ></span>
              {activeTab === 'programs' ? 'Youth Empowerment Programmes' : 'Key Government Internships'}
            </h3>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
              {(activeTab === 'programs' ? youthPrograms : internships).map((item, index) => (
                <button
                  key={index}
                  onClick={() => handleLinkClick(item.title, item.url)}
                  className="w-full text-left flex items-start gap-3 p-2 rounded-lg transition-colors group"
                  style={{ color: 'var(--psc-on-surface-variant)' }}
                >
                  <svg 
                    className="w-5 h-5 flex-shrink-0 mt-0.5"
                    style={{ color: 'var(--psc-primary-container)' }}
                    fill="currentColor" 
                    viewBox="0 0 512 512"
                  >
                    <path d="M505 174.8l-39.6-39.6c-9.4-9.4-24.6-9.4-33.9 0L192 374.7 80.6 263.2c-9.4-9.4-24.6-9.4-33.9 0L7 302.9c-9.4 9.4-9.4 24.6 0 34L175 505c9.4 9.4 24.6 9.4 33.9 0l296-296.2c9.4-9.5 9.4-24.7.1-34zm-324.3 106c6.2 6.3 16.4 6.3 22.6 0l208-208.2c6.2-6.3 6.2-16.4 0-22.6L366.1 4.7c-6.2-6.3-16.4-6.3-22.6 0L192 156.2l-55.4-55.5c-6.2-6.3-16.4-6.3-22.6 0L68.7 146c-6.2 6.3-6.2 16.4 0 22.6l112 112.2z"/>
                  </svg>
                  <span 
                    className="text-sm transition-colors group-hover:text-[var(--psc-primary)]"
                    style={{ color: 'var(--psc-on-surface-variant)' }}
                  >
                    {item.title}
                  </span>
                </button>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default OpportunitiesSection;