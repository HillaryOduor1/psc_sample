// src/pages/resources/ResourcesPage.tsx
import * as React from 'react';
import { Link } from 'react-router-dom';
import SectionTitle from '../../components/SectionTitle'; 

const ResourcesPage = () => {
  React.useEffect(() => {
    document.title = 'Resources | Landscapes Integrity Solutions';
  }, []);

  const resources = [
    { title: 'Strategic Plan 2023-2027', type: 'PDF', size: '2.5 MB' },
    { title: 'Annual Report 2025', type: 'PDF', size: '3.2 MB' },
    { title: 'Research Brief: Climate Policy', type: 'PDF', size: '1.8 MB' },
    { title: 'Land Governance Framework', type: 'PDF', size: '4.1 MB' },
  ];

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 md:py-20">
      <SectionTitle 
        text1="Resources" 
        text2="Publications & Reports" 
        text3="Access our latest research, reports, and policy briefs."
      />
      
      <div className="mt-12 bg-white dark:bg-[#123524] rounded-xl border border-[#D9DDD8] dark:border-[#2B4A3C] overflow-hidden">
        <table className="w-full">
          <thead className="bg-[#F6F8F7] dark:bg-[#0D2418] border-b border-[#D9DDD8] dark:border-[#2B4A3C]">
            <tr>
              <th className="px-6 py-4 text-left font-semibold">Title</th>
              <th className="px-6 py-4 text-left font-semibold">Type</th>
              <th className="px-6 py-4 text-left font-semibold">Size</th>
              <th className="px-6 py-4 text-left font-semibold">Action</th>
            </tr>
          </thead>
          <tbody>
            {resources.map((resource, idx) => (
              <tr key={idx} className="border-b border-[#D9DDD8] dark:border-[#2B4A3C] last:border-0">
                <td className="px-6 py-4">{resource.title}</td>
                <td className="px-6 py-4 text-sm text-slate-500 dark:text-slate-400">{resource.type}</td>
                <td className="px-6 py-4 text-sm text-slate-500 dark:text-slate-400">{resource.size}</td>
                <td className="px-6 py-4">
                  <a href="#" className="text-[#123524] font-bold hover:underline text-sm">Download</a>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default ResourcesPage;