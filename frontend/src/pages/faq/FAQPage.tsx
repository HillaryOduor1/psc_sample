// src/pages/faq/FAQPage.tsx
import * as React from 'react';
import SectionTitle from '../../components/SectionTitle';

const FAQPage = () => {
  React.useEffect(() => {
    document.title = 'FAQ | Public Service Commission Kenya';
  }, []);

  const faqs = [
    {
      question: "What is the Public Service Commission (PSC)?",
      answer: "The Public Service Commission is a Constitutional Commission established under Article 233(1) of the Constitution of Kenya. It consists of a Chairperson, a Vice Chairperson, and seven Commissioners appointed by the President with the approval of the National Assembly. The Commission is mandated to promote the values and principles of public service, establish and abolish offices, appoint persons to hold or act in those offices, and exercise disciplinary control over persons holding office."
    },
    {
      question: "How do I apply for a job advertised by the PSC?",
      answer: "All applications must be submitted through the PSC Recruitment Portal. Once you find an advertised vacancy on our Jobs page, click 'Apply Online' to be redirected to the portal. Ensure you have your National ID, academic certificates, and a valid email address ready. Applications must be submitted on or before the stated deadline; late applications are not accepted."
    },
    {
      question: "Does the PSC charge any fees for job applications, shortlisting, or appointments?",
      answer: "No. The Public Service Commission does not charge any fees for any of its services, including job applications, shortlisting, appointments, promotions, or processing of disciplinary matters and appeals. Any person or entity requesting payment in exchange for PSC services is a fraudster and should be reported immediately to the relevant authorities."
    },
    {
      question: "How can I check the status of my application?",
      answer: "You can check the status of your application at any time by logging into the PSC Recruitment Portal. Shortlisted candidates are also publicly announced on our website under the 'Shortlisted Candidates' section on the Jobs page. Only shortlisted candidates are contacted for interviews; if you do not hear from us within the advertised timeframe, please consider your application unsuccessful."
    },
    {
      question: "What should I do if I encounter a technical issue during the application process?",
      answer: "If you experience issues with the PSC Recruitment Portal (such as upload errors or login failures), please contact the PSC Call Centre on +254 20 4865000 or email psck@publicservice.go.ke. Kindly avoid waiting until the last day of the deadline to submit your application to allow time for any technical support."
    },
    {
      question: "How do I report corruption or unethical conduct in the public service?",
      answer: "The Commission takes allegations of corruption and unethical conduct very seriously. You can report incidents through the 'Report Corruption' link available on our home page, which routes to the relevant investigative channels. You can also report to the Ethics and Anti-Corruption Commission (EACC) or the Directorate of Criminal Investigations (DCI)."
    },
    {
      question: "How can I reach the PSC for general inquiries?",
      answer: "You can contact us during official working hours (Monday to Friday, 8:00 AM to 5:00 PM). Our physical address is Commission House, Harambee Avenue, Nairobi. P.O. Box 30095-00100, Nairobi. Phone: +254 20 2223901 / +254 20 2227471. Call Centre: +254 20 4865000. Email: psck@publicservice.go.ke."
    }
  ];

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12 md:py-20">
      <SectionTitle
        text1="FAQ"
        text2="Frequently Asked Questions"
        text3="Find answers to common questions about the Public Service Commission, our mandate, and how to engage with us."
      />

      <div className="mt-12" style={{ display: "flex", flexDirection: "column" }}>
        {faqs.map((faq, idx) => (
          <div
            key={idx}
            className="p-6 rounded-xl"
            style={{
              backgroundColor: "var(--psc-surface-container)",
              border: "1px solid var(--psc-border)",
              marginBottom: idx === faqs.length - 1 ? "0" : "24px",
            }}
          >
            <h3
              className="text-xl font-bold mb-3"
              style={{ color: "var(--psc-on-surface)" }}
            >
              {faq.question}
            </h3>
            <p
              className="leading-relaxed"
              style={{ color: "var(--psc-on-surface-variant)", lineHeight: 1.7 }}
            >
              {faq.answer}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default FAQPage;