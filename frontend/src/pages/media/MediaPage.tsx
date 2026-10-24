// src/pages/media/MediaPage.tsx
import * as React from 'react';
import SectionTitle from '../../components/SectionTitle'; 

const MediaPage = () => {
  React.useEffect(() => {
    document.title = 'Media Centre | Landscapes Integrity Solutions';
  }, []);

  const mediaItems = [
    { title: 'LIS Launches New Climate Policy Framework', date: 'Dec 15, 2025', type: 'Press Release' },
    { title: 'Interview with CEO: The Future of Landscape Governance', date: 'Dec 10, 2025', type: 'Podcast' },
    { title: 'Annual Conference 2025 Highlights', date: 'Nov 28, 2025', type: 'Video' },
    { title: 'LIS Partners with UNEP on New Initiative', date: 'Nov 15, 2025', type: 'News' },
  ];

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 md:py-20">
      <SectionTitle 
        text1="Media" 
        text2="Media Centre" 
        text3="Stay updated with the latest news, events, and media coverage from LIS."
      />
      
      <div className="mt-12 grid grid-cols-1 md:grid-cols-2 gap-6">
        {mediaItems.map((item, idx) => (
          <div key={idx} className="bg-white dark:bg-[#123524] p-6 rounded-xl border border-[#D9DDD8] dark:border-[#2B4A3C] hover:shadow-lg transition-shadow">
            <div className="flex items-center gap-2 mb-3">
              <span className="text-xs font-bold uppercase tracking-wider text-[#123524] bg-[#123524]/10 px-2 py-1 rounded">
                {item.type}
              </span>
              <span className="text-sm text-slate-500 dark:text-slate-400">{item.date}</span>
            </div>
            <h3 className="text-xl font-bold mb-2 text-[#123524] dark:text-white">{item.title}</h3>
            <a href="#" className="text-[#123524] font-bold hover:underline">Read More →</a>
          </div>
        ))}
      </div>
    </div>
  );
};

export default MediaPage;