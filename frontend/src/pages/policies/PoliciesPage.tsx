// src/pages/policies/PoliciesPage.tsx
import * as React from 'react';
import SectionTitle from '../../components/SectionTitle'; 

const PoliciesPage = () => {
  React.useEffect(() => {
    document.title = 'Policies | LIS Kenya';
  }, []);

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 md:py-20">
      <SectionTitle 
        text1="Governance" 
        text2="Policies & Guidelines" 
        text3="Access our policies, guidelines, and service charters."
      />
      <div className="mt-12 text-center">
        <p className="text-gray-600 dark:text-gray-400">Policies content coming soon.</p>
      </div>
    </div>
  );
};

export default PoliciesPage;