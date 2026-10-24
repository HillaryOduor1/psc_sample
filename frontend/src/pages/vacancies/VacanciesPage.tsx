// src/pages/vacancies/VacanciesPage.tsx
import * as React from 'react';
import SectionTitle from '../../components/SectionTitle'; 

const VacanciesPage = () => {
  React.useEffect(() => {
    document.title = 'Vacancies | LIS Kenya';
  }, []);

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 md:py-20">
      <SectionTitle 
        text1="Careers" 
        text2="Current Vacancies" 
        text3="Explore open positions at LIS Kenya."
      />
      <div className="mt-12 text-center">
        <p className="text-gray-600 dark:text-gray-400">No current vacancies. Please check back later.</p>
      </div>
    </div>
  );
};

export default VacanciesPage;