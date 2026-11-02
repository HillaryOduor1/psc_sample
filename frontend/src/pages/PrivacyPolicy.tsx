import * as React from 'react';
import { Link } from 'react-router-dom';
import { useContent } from '../content/useContext';

interface PolicyContent {
  title?: string;
  lastUpdated?: string;
  sections?: Array<{ heading: string; content: string }>;
  contactEmail?: string;
  contactPhone?: string;
  contactAddress?: string;
}

const defaultPolicy: PolicyContent = {
  title: 'Privacy Policy | Public Service Commission of Kenya',
  lastUpdated: 'May 2026',
  sections: [
    {
      heading: '1. Introduction',
      content:
        'The Public Service Commission of Kenya (PSC) is committed to protecting the privacy and personal data of all individuals who interact with our website, digital platforms, and services. This Privacy Policy explains how we collect, use, store, and protect personal data in accordance with the Data Protection Act, 2019, and guidance issued by the Office of the Data Protection Commissioner (ODPC).'
    },
    {
      heading: '2. Information We Collect',
      content:
        'We may collect personal data that you voluntarily provide when using our services, including but not limited to: name, national ID or passport number, email address, phone number, academic and professional qualifications, employment history, and any other information submitted through our recruitment portal or contact forms. We may also collect technical data such as IP address, browser type, and pages visited to improve our website.'
    },
    {
      heading: '3. How We Use Your Information',
      content:
        'PSC processes personal data for lawful purposes related to its constitutional and statutory mandate, including: recruitment and selection of public officers, maintaining employment records, responding to inquiries, service delivery, and compliance with legal obligations. We process data on the basis of legal obligation, public interest, contract performance, or your consent where required.'
    },
    {
      heading: '4. Cookies and Tracking Technologies',
      content:
        'Our website may use cookies and similar technologies to enhance functionality, analyse traffic, and improve user experience. You can control cookie preferences through your browser settings. Disabling cookies may affect certain features of the site.'
    },
    {
      heading: '5. Data Security',
      content:
        'PSC implements appropriate technical and organisational measures to safeguard personal data against unauthorised access, disclosure, alteration, or destruction. These measures include access controls, encryption where appropriate, staff training, and regular security reviews. PSC has also undertaken capacity building programmes on data protection and cybersecurity in partnership with recognised institutions.'
    },
    {
      heading: '6. Data Sharing and Third Parties',
      content:
        'We may share personal data with authorised government agencies, service providers acting on our behalf, or as required by law. Where we engage data processors, we ensure appropriate contractual safeguards are in place. We do not sell personal data. Transfers of personal data outside Kenya are conducted only where adequate safeguards exist, in line with the Data Protection Act.'
    },
    {
      heading: '7. Your Rights as a Data Subject',
      content:
        'Under the Data Protection Act, 2019, you have the right to: be informed about how your data is used; access your personal data; request rectification of inaccurate data; request erasure where applicable; object to processing; and lodge a complaint with the Office of the Data Protection Commissioner (ODPC). To exercise these rights, please contact us using the details below.'
    },
    {
      heading: '8. Data Retention',
      content:
        'We retain personal data only for as long as necessary to fulfil the purposes for which it was collected, or as required by applicable laws and regulations. Retention periods vary depending on the nature of the data and the purpose of processing.'
    },
    {
      heading: '9. Changes to This Privacy Policy',
      content:
        'PSC may update this Privacy Policy from time to time to reflect changes in our practices or legal requirements. Any updates will be posted on this page with a revised "Last updated" date. We encourage you to review this policy periodically.'
    },
    {
      heading: '10. Contact Us',
      content: ''
    }
  ],
  contactEmail: 'psck@publicservice.go.ke',
  contactPhone: '020 486 5000',
  contactAddress: 'Commission House, Harambee Avenue, P.O. Box 30095-00100, Nairobi, Kenya'
};

const PrivacyPolicy = () => {
  const { content } = useContent();
  const policy =
    (content && (content.privacyPolicy as PolicyContent)) || defaultPolicy;

  React.useEffect(() => {
    document.title = `${policy.title || 'Privacy Policy'} | Public Service Commission of Kenya`;
  }, [policy.title]);

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 py-12 md:py-20">
      <h1 className="text-3xl md:text-4xl font-bold mb-4 text-[#0d1b14] dark:text-white">
        {policy.title}
      </h1>
      <p className="text-sm text-gray-500 dark:text-gray-400 mb-8">
        Last updated: {policy.lastUpdated}
      </p>

      <div className="prose prose-slate dark:prose-invert max-w-none space-y-6 text-gray-700 dark:text-gray-300">
        {policy.sections?.map((section, idx) => (
          <div key={idx}>
            {section.heading && (
              <h2 className="text-xl font-semibold mt-8 mb-3">
                {section.heading}
              </h2>
            )}
            {section.content && <p>{section.content}</p>}
            {section.heading === '10. Contact Us' && (
              <ul className="list-none pl-0 space-y-1 mt-2">
                <li>
                  Email:{' '}
                  <a
                    href={`mailto:${policy.contactEmail}`}
                    className="text-primary hover:underline"
                  >
                    {policy.contactEmail}
                  </a>
                </li>
                <li>Phone: {policy.contactPhone}</li>
                <li>Address: {policy.contactAddress}</li>
                <li className="mt-3 text-sm text-gray-500 dark:text-gray-400">
                  You may also contact the Office of the Data Protection
                  Commissioner (ODPC) at{' '}
                  <a
                    href="https://www.odpc.go.ke"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-primary hover:underline"
                  >
                    www.odpc.go.ke
                  </a>{' '}
                  if you believe your data protection rights have been
                  infringed.
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

export default PrivacyPolicy;