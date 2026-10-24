// src/pages/faq/FAQPage.tsx
import * as React from 'react';
import SectionTitle from '../../components/SectionTitle';

const FAQPage = () => {
  React.useEffect(() => {
    document.title = 'FAQ | Landscapes Integrity Solutions';
  }, []);

  const faqs = [
    {
      question: "What is Landscapes Integrity Solutions?",
      answer: "LIS is a think tank and advisory firm that bridges the gap between global environmental policy and local conservation practice through rigorous research, strategic advisory, and actionable intelligence."
    },
    {
      question: "How can I partner with LIS?",
      answer: "We welcome partnerships with governments, NGOs, research institutions, and the private sector. Contact our team at partnerships@lis.org to explore collaboration opportunities."
    },
    {
      question: "What services do you offer?",
      answer: "We offer research and policy analysis, strategic advisory services, capacity building, and implementation support for landscape governance and sustainability initiatives."
    },
    {
      question: "How do I apply for a job at LIS?",
      answer: "Visit our Jobs page to view current openings and submit your application through the online portal."
    },
  ];

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12 md:py-20">
      <SectionTitle 
        text1="FAQ" 
        text2="Frequently Asked Questions" 
        text3="Find answers to common questions about LIS, our work, and how to engage with us."
      />
      
      <div className="mt-12 space-y-6">
        {faqs.map((faq, idx) => (
          <div key={idx} className="bg-white dark:bg-[#123524] p-6 rounded-xl border border-[#D9DDD8] dark:border-[#2B4A3C]">
            <h3 className="text-xl font-bold mb-3 text-[#123524] dark:text-white">{faq.question}</h3>
            <p className="text-slate-600 dark:text-slate-400 leading-relaxed">{faq.answer}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default FAQPage;