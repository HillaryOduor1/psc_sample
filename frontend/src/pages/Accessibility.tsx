import * as React from 'react';
import { Link } from 'react-router-dom';
import { useContent } from '../content/useContext';

interface AccessibilityContent {
  title?: string;
  lastUpdated?: string;
  sections?: Array<{ heading: string; content: string }>;
  contactEmail?: string;
  contactPhone?: string;
  contactAddress?: string;
}

const defaultAccessibility: AccessibilityContent = {
  title: 'Accessibility Statement | Public Service Commission of Kenya',
  lastUpdated: 'May 2026',
  sections: [
    {
      heading: 'Our Commitment',
      content:
        'The Public Service Commission of Kenya (PSC) is committed to ensuring that all persons, including persons with disabilities (PWDs), can access our services, information, and digital platforms on an equal basis. This commitment is anchored in the Constitution of Kenya, 2010, the Persons with Disabilities Act, 2025, and the Convention on the Rights of Persons with Disabilities (CRPD).'
    },
    {
      heading: 'Conformance Status',
      content:
        'This website is partially conformant with WCAG 2.1 Level AA. We acknowledge that gaps remain and are actively working to improve accessibility across all our digital platforms. As part of this effort, PSC has commenced a comprehensive Accessibility and Usability Audit in collaboration with the National Council for Persons with Disabilities (NCPWD), covering our physical infrastructure, digital platforms, service delivery systems, and employment practices.'
    },
    {
      heading: 'Accessibility Features You Can Use',
      content:
        'This site includes a theme toggle for high-contrast viewing, support for browser zoom up to 200%, responsive layouts for mobile and assistive devices, and keyboard-navigable menus and forms. We continue to explore additional features to enhance usability for all visitors.'
    },
    {
      heading: 'Feedback and Contact',
      content: ''
    },
    {
      heading: 'Third-Party Content',
      content:
        'Some external documents or linked resources (for example, older PDF reports or third-party portals) may not be fully accessible. Where possible, we provide alternative formats upon request. If you encounter a barrier, please contact us so we can assist.'
    },
    {
      heading: 'Assessment Methods',
      content:
        'PSC uses a combination of automated accessibility testing tools, manual keyboard navigation checks, and screen reader testing. The ongoing audit with NCPWD will provide a more comprehensive assessment of our digital and physical accessibility.'
    },
    {
      heading: 'Known Limitations',
      content:
        'We are aware that some legacy PDF documents may lack proper tagging or reading order. Remediation is underway. Some interactive features on the PSC job application portal may also present challenges for certain assistive technologies; improvements are planned as part of the audit recommendations.'
    }
  ],
  contactEmail: 'psck@publicservice.go.ke',
  contactPhone: '020 486 5000',
  contactAddress: 'Commission House, Harambee Avenue, P.O. Box 30095-00100, Nairobi, Kenya'
};

const Accessibility = () => {
  const { content } = useContent();
  const a11y =
    (content && (content.accessibility as AccessibilityContent)) ||
    defaultAccessibility;

  React.useEffect(() => {
    document.title = `${a11y.title || 'Accessibility Statement'} | Public Service Commission of Kenya`;
  }, [a11y.title]);

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 py-12 md:py-20">
      <h1 className="text-3xl md:text-4xl font-bold mb-4 text-[#0d1b14] dark:text-white">
        {a11y.title}
      </h1>
      <p className="text-sm text-gray-500 dark:text-gray-400 mb-8">
        Last updated: {a11y.lastUpdated}
      </p>

      <div className="prose prose-slate dark:prose-invert max-w-none space-y-6 text-gray-700 dark:text-gray-300">
        {a11y.sections?.map((section, idx) => (
          <div key={idx}>
            {section.heading && (
              <h2 className="text-xl font-semibold mt-8 mb-3">
                {section.heading}
              </h2>
            )}
            {section.content && <p>{section.content}</p>}
            {section.heading === 'Feedback and Contact' && (
              <ul className="list-none pl-0 space-y-1 mt-2">
                <li>
                  Email:{' '}
                  <a
                    href={`mailto:${a11y.contactEmail}`}
                    className="text-primary hover:underline"
                  >
                    {a11y.contactEmail}
                  </a>
                </li>
                <li>Phone: {a11y.contactPhone}</li>
                <li>Address: {a11y.contactAddress}</li>
                <li className="mt-3 text-sm text-gray-500 dark:text-gray-400">
                  For accessibility-specific feedback, you may also contact the
                  PSC Disability Mainstreaming Committee through the general
                  channels above.
                </li>
              </ul>
            )}
          </div>
        ))}
        <div className="mt-10 pt-6 border-t border-gray-200 dark:border-gray-700 text-sm">
          <Link to="/" className="text-primary hover:underline">
            ← Back to Home
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Accessibility;