// src/pages/news/NewsPage.tsx
import * as React from 'react';
import SectionTitle from '../../components/SectionTitle'; 

const NewsPage = () => {
  React.useEffect(() => {
    document.title = 'News | LIS Kenya';
  }, []);

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 md:py-20">
      <SectionTitle 
        text1="Updates" 
        text2="News & Announcements" 
        text3="Stay informed with the latest news and updates from LIS Kenya."
      />
      <div className="mt-12 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {[1, 2, 3, 4, 5, 6].map((item) => (
          <article key={item} className="bg-white dark:bg-[#123524] rounded-xl border border-[#D0D5DD] dark:border-[#2B4A3C] overflow-hidden hover:shadow-lg transition-shadow">
            <div className="h-48 bg-gray-200 dark:bg-gray-700"></div>
            <div className="p-6">
              <h3 className="text-lg font-bold mb-2">News Article {item}</h3>
              <p className="text-sm text-gray-600 dark:text-gray-400 mb-4">Brief description of the news article.</p>
              <a href="#" className="text-[#895100] dark:text-[#ffb86b] font-bold hover:underline">Read More →</a>
            </div>
          </article>
        ))}
      </div>
    </div>
  );
};

export default NewsPage;