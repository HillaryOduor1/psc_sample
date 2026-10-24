// src/pages/tenders/TendersPage.tsx
import * as React from 'react';
import { Link } from 'react-router-dom';
import SectionTitle from '../../components/SectionTitle'; 

const TendersPage = () => {
  React.useEffect(() => {
    document.title = 'Tenders | Landscapes Integrity Solutions';
  }, []);

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 md:py-20">
      <SectionTitle 
        text1="Procurement" 
        text2="Tenders & Opportunities" 
        text3="Find open tenders, requests for proposals, and procurement opportunities."
      />
      
      <div className="mt-12 grid grid-cols-1 gap-6">
        {[1, 2, 3].map((tender) => (
          <div key={tender} className="bg-white dark:bg-[#123524] p-6 rounded-xl border border-[#D9DDD8] dark:border-[#2B4A3C] hover:shadow-lg transition-shadow">
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
              <div>
                <h3 className="text-xl font-bold mb-1">Tender Notice {tender}</h3>
                <p className="text-slate-500 dark:text-slate-400 text-sm">Deadline: December 31, 2026</p>
                <p className="text-slate-600 dark:text-slate-300 mt-2">Brief description of the tender opportunity.</p>
              </div>
              <Link to="#" className="bg-[#123524] text-white px-6 py-2 rounded-lg font-bold hover:bg-[#123524]/90 transition-colors whitespace-nowrap">
                View Details
              </Link>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default TendersPage;