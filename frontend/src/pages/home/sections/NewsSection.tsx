// src/pages/home/sections/NewsSection.tsx
import { Link } from 'react-router-dom';
import { trackEvent } from '../../../analytics';

interface NewsItem {
  title: string;
  excerpt: string;
  image: string;
  date: string;
  href: string;
}

const NewsSection = () => {
  const newsItems: NewsItem[] = [
    {
      title: 'PSC Moves to Reform Career Progression in the Public Service',
      excerpt: 'The Public Service Commission is developing a Career Management Policy aimed at reforming...',
      image: '/assets/DSC_5927-scaled.webp',
      date: 'Aug 2026',
      href: 'https://www.publicservice.go.ke/public-service-commission-is-developing-a-career-management-policy-aimed-at-reforming-career-progression/'
    },
    {
      title: 'PSC, Development Partners Align Priorities to Advance Disability Inclusion in Public Service',
      excerpt: 'PSC DMC in working meeting with Development partners',
      image: '/assets/1787292387938.jpeg',
      date: 'Aug 2026',
      href: 'https://www.publicservice.go.ke/psc-development-partners-align-workplans-for-the-year/'
    },
    {
      title: 'PSC CEO signs performance contract with the Commission',
      excerpt: 'The Public Service Commission Secretary, Mr. Paul Famba, on 17 August 2026, signed...',
      image: '/assets/DSC_5459-scaled.jpg',
      date: 'Aug 17, 2026',
      href: 'https://www.publicservice.go.ke/psc-ceo-signs-performance-contract-with-the-commission/'
    },
  ];

  const handleReadMore = (news: NewsItem) => {
    trackEvent('news_read_more', { title: news.title });
    if (window.navigator && window.navigator.vibrate) window.navigator.vibrate(50);
  };

  return (
    <section style={{ backgroundColor: 'var(--psc-surface)' }} className="py-20">
      <div className="px-4 md:px-8 max-w-[1280px] mx-auto">
        <div className="flex justify-between items-end mb-8">
          <div>
            <h2 
              className="text-3xl md:text-4xl font-bold mb-2"
              style={{ color: 'var(--psc-on-surface)' }}
            >
              News Updates
            </h2>
            <p style={{ color: 'var(--psc-on-surface-variant)' }}>
              Latest information and announcements
            </p>
          </div>
          <Link 
            to="/news" 
            className="hidden md:flex items-center gap-2 text-sm font-bold hover:underline"
            style={{ color: 'var(--psc-primary)' }}
          >
            VIEW MORE <span className="material-symbols-outlined text-sm">arrow_forward</span>
          </Link>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {newsItems.map((news: NewsItem, index: number) => (
            <article 
              key={index} 
              className="rounded-xl overflow-hidden hover:shadow-lg transition-shadow flex flex-col"
              style={{ 
                backgroundColor: 'var(--psc-surface-container)',
                border: '1px solid var(--psc-border)'
              }}
            >
              <img 
                alt={news.title} 
                className="w-full h-48 object-cover" 
                src={news.image} 
              />
              <div className="p-6 flex flex-col flex-grow">
                <h3 
                  className="text-lg font-semibold mb-3 line-clamp-2"
                  style={{ color: 'var(--psc-on-surface)' }}
                >
                  {news.title}
                </h3>
                <p 
                  className="mb-4 line-clamp-3 flex-grow"
                  style={{ color: 'var(--psc-on-surface-variant)' }}
                >
                  {news.excerpt}
                </p>
                <Link 
                  to={news.href} 
                  onClick={() => handleReadMore(news)}
                  className="text-sm font-bold flex items-center gap-1 mt-auto hover:underline"
                  style={{ color: 'var(--psc-primary)' }}
                >
                  Read More <span className="material-symbols-outlined text-sm">arrow_forward</span>
                </Link>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
};

export default NewsSection;