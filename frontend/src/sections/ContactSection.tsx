import * as React from "react";
import { useContent } from "../content/useContext";
import { trackEvent } from '../analytics';

/* Inline SVG Icons */
function MapPinIcon() {
  return (
    <svg className="w-6 h-6 flex-shrink-0" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z" />
      <circle cx="12" cy="10" r="3" />
    </svg>
  );
}

function PhoneIcon() {
  return (
    <svg className="w-6 h-6 flex-shrink-0" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z" />
    </svg>
  );
}

function MailIcon() {
  return (
    <svg className="w-6 h-6 flex-shrink-0" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z" />
      <polyline points="22,6 12,13 2,6" />
    </svg>
  );
}

function ClockIcon() {
  return (
    <svg className="w-6 h-6 flex-shrink-0" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <circle cx="12" cy="12" r="10" />
      <polyline points="12 6 12 12 16 14" />
    </svg>
  );
}

const defaultContact = {
  sectionTitle: {
    text1: "Get in",
    text2: "touch",
    text3: "Reach the Public Service Commission Kenya for inquiries, partnerships, or feedback."
  },
  contactInfo: {
    address: "Commission House, Harambee Avenue\nP. O. Box 30095-00100, Nairobi",
    phone: "+254 20 2223901, +254 20 2227471",
    callCenter: "+254 20 4865000",
    email: "psck@publicservice.go.ke",
    workingHours: "Mon - Fri, 8:00 AM - 5:00 PM"
  }
};

type ContactContent = typeof defaultContact;

export default function ContactSection() {
  const { content } = useContent();
  const contact = (content && content.contact) ? (content.contact as ContactContent) : defaultContact;
  
  // Use fallback contactInfo if content.contact doesn't have it populated yet
  const info = contact.contactInfo || defaultContact.contactInfo;

  const handleCardClick = (type: string, link: string) => {
    trackEvent("contact_card_click", { type });
    if (window.navigator && window.navigator.vibrate) {
      window.navigator.vibrate(50);
    }
    if (link) {
      window.location.href = link;
    }
  };

  return (
    <section
      id="ContactSection"
      className="px-4 sm:px-6 md:px-12 lg:px-20 xl:px-28 py-16 md:py-24"
      style={{ backgroundColor: "var(--psc-surface)" }}
    >
      <div className="max-w-[1280px] mx-auto">
        
        {/* Improved Header Section */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <h2 
            className="text-3xl md:text-4xl lg:text-5xl font-bold mb-4" 
            style={{ color: "var(--psc-on-surface)" }}
          >
            {contact.sectionTitle.text1}{" "}
            <span style={{ color: "var(--psc-primary)" }}>
              {contact.sectionTitle.text2}
            </span>
          </h2>
          
          {/* Decorative Line */}
          <div className="flex justify-center mb-6">
            <div className="flex h-[3px] w-[80px]">
              <span
                className="w-1/2"
                style={{ backgroundColor: "var(--psc-primary-container)" }}
              ></span>
              <span
                className="w-1/2"
                style={{ backgroundColor: "var(--psc-border)" }}
              ></span>
            </div>
          </div>

          <p 
            className="text-base md:text-lg leading-relaxed" 
            style={{ color: "var(--psc-on-surface-variant)" }}
          >
            {contact.sectionTitle.text3}
          </p>
        </div>

        {/* Contact Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
          
          {/* Physical Address */}
          <div 
            className="rounded-2xl p-8 flex flex-col transition-all duration-300 hover:-translate-y-1 hover:shadow-lg"
            style={{ 
              backgroundColor: "var(--psc-surface-container)", 
              border: "1px solid var(--psc-border)" 
            }}
          >
            <div 
              className="w-14 h-14 rounded-full flex items-center justify-center mb-6"
              style={{ 
                backgroundColor: "rgba(230,140,0,0.1)", 
                color: "var(--psc-primary)" 
              }}
            >
              <MapPinIcon />
            </div>
            <h3 className="text-xl font-bold mb-3" style={{ color: "var(--psc-on-surface)" }}>
              Our Location
            </h3>
            <p className="text-sm md:text-base leading-relaxed whitespace-pre-line" style={{ color: "var(--psc-on-surface-variant)" }}>
              {info.address}
            </p>
          </div>

          {/* Phone Numbers */}
          <div 
            className="rounded-2xl p-8 flex flex-col transition-all duration-300 hover:-translate-y-1 hover:shadow-lg"
            style={{ 
              backgroundColor: "var(--psc-surface-container)", 
              border: "1px solid var(--psc-border)" 
            }}
          >
            <div 
              className="w-14 h-14 rounded-full flex items-center justify-center mb-6"
              style={{ 
                backgroundColor: "rgba(230,140,0,0.1)", 
                color: "var(--psc-primary)" 
              }}
            >
              <PhoneIcon />
            </div>
            <h3 className="text-xl font-bold mb-3" style={{ color: "var(--psc-on-surface)" }}>
              Phone Numbers
            </h3>
            <div className="flex flex-col gap-2">
              <a 
                href={`tel:${info.phone.split(',')[0].replace(/\s+/g, '')}`}
                onClick={() => handleCardClick("phone_main", "")}
                className="text-sm md:text-base hover:underline w-fit" 
                style={{ color: "var(--psc-on-surface-variant)" }}
              >
                {info.phone}
              </a>
              <p className="text-sm md:text-base mt-2" style={{ color: "var(--psc-on-surface-variant)" }}>
                <span className="font-semibold" style={{ color: "var(--psc-on-surface)" }}>Call Centre:</span>{" "}
                <a 
                  href={`tel:${info.callCenter.replace(/\s+/g, '')}`}
                  onClick={() => handleCardClick("phone_callcenter", "")}
                  className="hover:underline"
                >
                  {info.callCenter}
                </a>
              </p>
            </div>
          </div>

          {/* Email & Hours */}
          <div 
            className="rounded-2xl p-8 flex flex-col transition-all duration-300 hover:-translate-y-1 hover:shadow-lg md:col-span-2 lg:col-span-1"
            style={{ 
              backgroundColor: "var(--psc-surface-container)", 
              border: "1px solid var(--psc-border)" 
            }}
          >
            <div className="flex gap-4 mb-8">
              <div 
                className="w-14 h-14 rounded-full flex items-center justify-center shrink-0"
                style={{ 
                  backgroundColor: "rgba(230,140,0,0.1)", 
                  color: "var(--psc-primary)" 
                }}
              >
                <MailIcon />
              </div>
              <div className="flex flex-col justify-center">
                <h3 className="text-xl font-bold mb-1" style={{ color: "var(--psc-on-surface)" }}>
                  Email Us
                </h3>
                <a 
                  href={`mailto:${info.email}`}
                  onClick={() => handleCardClick("email", "")}
                  className="text-sm md:text-base hover:underline break-all" 
                  style={{ color: "var(--psc-on-surface-variant)" }}
                >
                  {info.email}
                </a>
              </div>
            </div>

            <div className="flex gap-4 mt-auto pt-6 border-t" style={{ borderColor: "var(--psc-border)" }}>
              <div 
                className="w-14 h-14 rounded-full flex items-center justify-center shrink-0"
                style={{ 
                  backgroundColor: "rgba(230,140,0,0.1)", 
                  color: "var(--psc-primary)" 
                }}
              >
                <ClockIcon />
              </div>
              <div className="flex flex-col justify-center">
                <h3 className="text-xl font-bold mb-1" style={{ color: "var(--psc-on-surface)" }}>
                  Working Hours
                </h3>
                <p className="text-sm md:text-base" style={{ color: "var(--psc-on-surface-variant)" }}>
                  {info.workingHours}
                </p>
              </div>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
}

/*import { useEffect, useState, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import SectionTitle from "../components/SectionTitle";
import { useContent } from "../content/useContext";
import { trackEvent } from '../analytics';
import { GoogleReCaptchaProvider, useGoogleReCaptcha } from "react-google-recaptcha-v3";

/* Inline SVG Icons /
function UserIcon() {
  return (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" aria-hidden="true">
      <path d="M12 12a5 5 0 1 0-5-5 5 5 0 0 0 5 5Zm0 2c-4.42 0-8 2.24-8 5v1h16v-1c0-2.76-3.58-5-8-5Z" fill="currentColor"/>
    </svg>
  );
}

function MailIcon() {
  return (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" aria-hidden="true">
      <path d="M4 4h16a2 2 0 0 1 2 2v12a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2V6a2 2 0 0 1 2-2Zm0 4 8 5 8-5" stroke="currentColor" strokeWidth="2" fill="none"/>
    </svg>
  );
}

gsap.registerPlugin(ScrollTrigger);

const defaultContact = {
  sectionTitle: {
    text1: "Get in",
    text2: "touch",
    text3: "Reach the Public Service Commission Kenya for inquiries, partnerships, or feedback."
  },
  form: {
    nameLabel: "Your Name",
    namePlaceholder: "Enter your full name",
    emailLabel: "Email Address",
    emailPlaceholder: "you@example.com",
    messageLabel: "Message",
    messagePlaceholder: "How can we assist you today?",
    submitText: "Send Message"
  }
};

type ContactContent = typeof defaultContact;

const RECAPTCHA_SITE_KEY = import.meta.env.VITE_RECAPTCHA_SITE_KEY || '';

const ContactForm = () => {
  const { content } = useContent();
  const contact = (content && content.contact) ? (content.contact as ContactContent) : defaultContact;

  const formRef = useRef<HTMLFormElement>(null);
  const { executeRecaptcha } = useGoogleReCaptcha();
  const [formState, setFormState] = useState({ name: "", email: "", message: "", hp: "" });
  const [status, setStatus] = useState<{ type: "success" | "error" | ""; message: string }>({ type: "", message: "" });
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (!formRef.current) return;
    const runAnimation = () => {
      const items = formRef.current?.querySelectorAll("[data-animate]");
      if (!items?.length) return;
      gsap.fromTo(
        items,
        { y: 120, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.7, ease: "power3.out", stagger: 0.1, scrollTrigger: { trigger: formRef.current, start: "top 85%", once: true } }
      );
    };
    if (document.readyState === "complete") runAnimation();
    else {
      window.addEventListener("load", runAnimation);
      return () => window.removeEventListener("load", runAnimation);
    }
  }, []);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormState({ ...formState, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus({ type: "", message: "" });
    setLoading(true);

    if (!executeRecaptcha) {
      setStatus({ type: "error", message: "reCAPTCHA not loaded. Please refresh." });
      setLoading(false);
      return;
    }

    let recaptchaToken = '';
    try {
      recaptchaToken = await executeRecaptcha('contact_submit');
    } catch (err) {
      setStatus({ type: "error", message: "reCAPTCHA verification failed. Please try again." });
      setLoading(false);
      return;
    }

    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ...formState, recaptchaToken }),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.errors?.[0]?.msg || data.error || "Submission failed");
      setStatus({ type: "success", message: "Message sent successfully. The PSC team will respond shortly." });
      trackEvent('form_submitted_contact');
      if (window.navigator && window.navigator.vibrate) window.navigator.vibrate(50);
      setFormState({ name: "", email: "", message: "", hp: "" });
    } catch (err: any) {
      setStatus({ type: "error", message: err.message });
      if (window.navigator && window.navigator.vibrate) window.navigator.vibrate(200);
    } finally {
      setLoading(false);
    }
  };

  return (
    <form
      ref={formRef}
      onSubmit={handleSubmit}
      className="mt-12 md:mt-16 max-w-xl md:max-w-2xl mx-auto w-full grid grid-cols-1 md:grid-cols-2 gap-6"
      style={{ color: "var(--psc-on-surface)" }}
    >
      {/* Honeypot field – hidden from users but visible to bots /}
      <div style={{ display: 'none' }} aria-hidden="true">
        <label htmlFor="hp">Leave this empty</label>
        <input id="hp" name="hp" type="text" value={formState.hp} onChange={handleChange} tabIndex={-1} autoComplete="off" />
      </div>

      <div data-animate className="flex flex-col">
        <label
          htmlFor="contact-name"
          className="text-sm font-semibold mb-2 ml-1"
          style={{ color: "var(--psc-on-surface)" }}
        >
          {contact.form.nameLabel}
        </label>
        <div
          className="flex items-center px-4 rounded-xl transition-colors"
          style={{
            border: "1px solid var(--psc-border)",
            backgroundColor: "var(--psc-surface)",
            color: "var(--psc-on-surface-variant)",
          }}
        >
          <span className="flex-shrink-0 mr-3" style={{ color: "var(--psc-on-surface-light)" }}>
            <UserIcon />
          </span>
          <input
            id="contact-name"
            name="name"
            type="text"
            value={formState.name}
            onChange={handleChange}
            required
            placeholder={contact.form.namePlaceholder}
            className="w-full py-3.5 text-base bg-transparent outline-none"
            style={{
              color: "var(--psc-on-surface)",
              fontSize: "16px",
            }}
            aria-required="true"
            autoComplete="name"
          />
        </div>
      </div>

      <div data-animate className="flex flex-col">
        <label
          htmlFor="contact-email"
          className="text-sm font-semibold mb-2 ml-1"
          style={{ color: "var(--psc-on-surface)" }}
        >
          {contact.form.emailLabel}
        </label>
        <div
          className="flex items-center px-4 rounded-xl transition-colors"
          style={{
            border: "1px solid var(--psc-border)",
            backgroundColor: "var(--psc-surface)",
            color: "var(--psc-on-surface-variant)",
          }}
        >
          <span className="flex-shrink-0 mr-3" style={{ color: "var(--psc-on-surface-light)" }}>
            <MailIcon />
          </span>
          <input
            id="contact-email"
            name="email"
            type="email"
            value={formState.email}
            onChange={handleChange}
            required
            placeholder={contact.form.emailPlaceholder}
            className="w-full py-3.5 text-base bg-transparent outline-none"
            style={{
              color: "var(--psc-on-surface)",
              fontSize: "16px",
            }}
            aria-required="true"
            autoComplete="email"
          />
        </div>
      </div>

      <div className="md:col-span-2 flex flex-col" data-animate>
        <label
          htmlFor="contact-message"
          className="text-sm font-semibold mb-2 ml-1"
          style={{ color: "var(--psc-on-surface)" }}
        >
          {contact.form.messageLabel}
        </label>
        <textarea
          id="contact-message"
          name="message"
          rows={5}
          value={formState.message}
          onChange={handleChange}
          required
          placeholder={contact.form.messagePlaceholder}
          className="w-full p-4 rounded-xl outline-none resize-none"
          style={{
            border: "1px solid var(--psc-border)",
            backgroundColor: "var(--psc-surface)",
            color: "var(--psc-on-surface)",
            fontSize: "16px",
          }}
          aria-required="true"
        />
      </div>

      <div className="md:col-span-2 flex justify-start pt-4" data-animate>
        <button
          type="submit"
          disabled={loading}
          className="w-full md:w-auto px-12 py-4 text-base font-bold rounded-full transition-all hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed min-h-[44px]"
          style={{
            backgroundColor: "var(--psc-primary-container)",
            color: "var(--psc-on-primary)",
          }}
        >
          {loading ? (
            <span className="flex items-center justify-center">
              <svg
                aria-hidden="true"
                className="w-5 h-5 animate-spin mr-2"
                viewBox="0 0 100 101"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z"
                  fill="currentColor"
                  opacity="0.3"
                />
                <path
                  d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z"
                  fill="currentColor"
                />
              </svg>
              Sending...
            </span>
          ) : (
            contact.form.submitText
          )}
        </button>
      </div>

      {status.message && (
        <div
          className="md:col-span-2 text-sm font-medium p-3 rounded-lg"
          role={status.type === "success" ? "status" : "alert"}
          style={{
            backgroundColor: status.type === "success" ? "var(--psc-success-container)" : "var(--psc-error-container)",
            color: status.type === "success" ? "var(--psc-on-success-container)" : "var(--psc-on-error-container)",
            border: "1px solid " + (status.type === "success" ? "var(--psc-success)" : "var(--psc-error)"),
          }}
        >
          {status.message}
        </div>
      )}
    </form>
  );
};

export default function ContactSection() {
  const { content } = useContent();
  const contact = (content && content.contact) ? (content.contact as ContactContent) : defaultContact;

  if (!RECAPTCHA_SITE_KEY) {
    console.warn('reCAPTCHA site key missing – CAPTCHA disabled');
  }

  return (
    <GoogleReCaptchaProvider reCaptchaKey={RECAPTCHA_SITE_KEY} language="en">
      <section
        id="ContactSection"
        className="px-4 sm:px-6 md:px-12 lg:px-20 xl:px-28 py-16 md:py-24"
        style={{ backgroundColor: "var(--psc-surface)" }}
      >
        <SectionTitle
          text1={contact.sectionTitle.text1}
          text2={contact.sectionTitle.text2}
          text3={contact.sectionTitle.text3}
        />
        <ContactForm />
      </section>
    </GoogleReCaptchaProvider>
  );
}*/