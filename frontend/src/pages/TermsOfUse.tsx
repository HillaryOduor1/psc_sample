import * as React from 'react';
import { Link } from 'react-router-dom';
import { useContent } from '../content/useContext';

interface TermsContent {
  title?: string;
  effectiveDate?: string;
  sections?: Array<{ heading: string; content: string }>;
  contactEmail?: string;
}

const defaultTerms: TermsContent = {
  title: 'Terms of Use | Public Service Commission of Kenya',
  effectiveDate: 'May 2026',
  sections: [
    {
      heading: '1. Use of Content',
      content:
        'All content on this website, including text, graphics, logos, and documents, is the property of the Public Service Commission of Kenya (PSC) and is protected by applicable copyright and intellectual property laws. Content is provided for informational and public service purposes. Unauthorised reproduction or commercial use is prohibited.'
    },
    {
      heading: '2. User Conduct',
      content:
        'You agree to use this website only for lawful purposes and in a manner that does not infringe the rights of, or restrict the use of, this website by any third party. You must not attempt to gain unauthorised access to any part of the site, its servers, or any systems connected to it.'
    },
    {
      heading: '3. Accuracy of Information and Statutory Warning',
      content:
        'While PSC endeavours to keep information on this website accurate and current, we make no representations or warranties of any kind regarding completeness or accuracy. Be advised that Section 100(4) of the Public Service Commission Act, 2017 provides that a person who gives false or misleading information to the Commission is, on conviction, liable to a fine not exceeding Kshs. 200,000 or to imprisonment for a term not exceeding two years, or to both.'
    },
    {
      heading: '4. Recruitment Advertisements and Fraud Warning',
      content:
        'PSC advertises all vacant positions on its official website (www.publicservice.go.ke) and in mainstream media. The Commission does not charge any fee at any stage of the recruitment process. Any advert circulating on social media or other channels requesting payment is fraudulent and should be reported. Always verify job advertisements against the official PSC website before engaging further.'
    },
    {
      heading: '5. Third-Party Links',
      content:
        'This website may contain links to external websites not controlled by PSC. Such links are provided for convenience only. PSC is not responsible for the content, privacy practices, or availability of those external sites.'
    },
    {
      heading: '6. Limitation of Liability',
      content:
        'PSC shall not be liable for any direct, indirect, incidental, or consequential damages arising from the use of, or inability to use, this website or its content. This includes, without limitation, any loss of data or profit.'
    },
    {
      heading: '7. Changes to These Terms',
      content:
        'PSC reserves the right to modify these Terms of Use at any time. Changes will be effective immediately upon posting on this page. Your continued use of the website after changes are posted constitutes acceptance of the revised terms.'
    },
    {
      heading: '8. Governing Law',
      content:
        'These Terms of Use shall be governed by and construed in accordance with the laws of the Republic of Kenya.'
    },
    {
      heading: '9. Contact Us',
      content:
        'For questions regarding these Terms of Use, or to report any issues with this website, please contact the Commission through the channels below.'
    }
  ],
  contactEmail: 'psck@publicservice.go.ke'
};

const TermsOfUse = () => {
  const { content } = useContent();
  const terms = (content && (content.termsOfUse as TermsContent)) || defaultTerms;

  React.useEffect(() => {
    document.title = `${terms.title || 'Terms of Use'} | Public Service Commission of Kenya`;
  }, [terms.title]);

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 py-12 md:py-20">
      <h1 className="text-3xl md:text-4xl font-bold mb-4 text-[#0d1b14] dark:text-white">{terms.title}</h1>
      <p className="text-sm text-gray-500 dark:text-gray-400 mb-8">Effective date: {terms.effectiveDate}</p>

      <div className="prose prose-slate dark:prose-invert max-w-none space-y-6 text-gray-700 dark:text-gray-300">
        {terms.sections?.map((section, idx) => (
          <div key={idx}>
            {section.heading && <h2 className="text-xl font-semibold mt-8 mb-3">{section.heading}</h2>}
            {section.content && <p>{section.content}</p>}
            {section.heading === '9. Contact Us' && (
              <ul className="list-none pl-0 space-y-1 mt-2">
                <li>
                  Email:{' '}
                  <a href={`mailto:${terms.contactEmail}`} className="text-primary hover:underline">
                    {terms.contactEmail}
                  </a>
                </li>
                <li>Call Centre: 020 486 5000</li>
                <li>Address: Commission House, Harambee Avenue, P.O. Box 30095-00100, Nairobi, Kenya</li>
              </ul>
            )}
          </div>
        ))}
        <div className="mt-10 pt-6 border-t border-gray-200 dark:border-gray-700 text-sm">
          <Link to="/" className="text-primary hover:underline">← Back to Home</Link>
        </div>
      </div>
    </div>
  );
};

export default TermsOfUse;