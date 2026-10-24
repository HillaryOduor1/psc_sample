// src/pages/internship/InternshipPage.tsx
import * as React from "react";
import { Link } from "react-router-dom";
import { trackEvent } from "../../analytics";

const InternshipPage = () => {
  const [activeTab, setActiveTab] = React.useState<"shortlisted" | "appointed" | "opportunities" | "archived">("shortlisted");
  const sectionRefs = React.useRef<{ [key: string]: HTMLElement | null }>({});

  // Intersection Observer for animations
  React.useEffect(function() {
    if (typeof IntersectionObserver === "undefined") return;

    const observer = new IntersectionObserver(
      function(entries) {
        entries.forEach(function(entry) {
          if (entry.isIntersecting) {
            entry.target.classList.add("visible");
          }
        });
      },
      { threshold: 0.1 }
    );

    document.querySelectorAll(".animate-on-scroll").forEach(function(el) {
      observer.observe(el);
    });

    return function() {
      observer.disconnect();
    };
  }, []);

  // Scroll to section
  const scrollToSection = (sectionId: string) => {
    const section = document.getElementById(sectionId);
    if (section) {
      const navbarHeight = 80;
      const sectionPosition = section.getBoundingClientRect().top + window.pageYOffset - navbarHeight;
      window.scrollTo({ top: sectionPosition, behavior: "smooth" });
    }
  };

  // Handle tab click
  const handleTabClick = (tab: "shortlisted" | "appointed" | "opportunities" | "archived") => {
    setActiveTab(tab);
    trackEvent("internship_tab_click", { tab });
    if (window.navigator && window.navigator.vibrate) {
      window.navigator.vibrate(50);
    }
    const sectionMap: { [key: string]: string } = {
      shortlisted: "internShort",
      appointed: "internApp",
      opportunities: "internOpp",
      archived: "archiveIntern",
    };
    scrollToSection(sectionMap[tab]);
  };

  // Sample data
  const shortlistedItems = [
    {
      title: "Public Service Internship Programme Shortlisted Cohort 6 Applicants",
      date: "2024-10-15",
      downloads: 37520,
    },
    {
      title: "Public Service Internship Programme Shortlisted Cohort 5 Applicants",
      date: "2024-08-20",
      downloads: 28500,
    },
  ];

  const appointedItems = [
    {
      title: "PSIP List of Appointed Cohort VI Interns FY – 2023/2024",
      date: "2024-09-01",
      downloads: 8811,
    },
    {
      title: "PUBLIC SERVICE INTERNSHIP PROGRAMME (PSIP) APPOINTED COHORT V INTERNS 2022-2023",
      date: "2023-12-15",
      downloads: 2345,
    },
  ];

  const opportunitiesItems = [
    {
      title: "Internship Vacancies in the State Department for Early Learning & Basic Education",
      date: "2024-10-01",
      downloads: 5079,
    },
    {
      title: "Recruitment of Interns into Government Ministries, Departments & Agencies",
      date: "2024-09-15",
      downloads: 10750,
    },
    {
      title: "Call for Applications for Presidential Digital Talent Internship Programme (Digitalent) Cohort V",
      date: "2024-08-20",
      downloads: 3265,
    },
  ];

  return (
    <div className="internship-page" style={{ backgroundColor: "var(--psc-surface)" }}>
      {/* Hero Section */}
      <section
        className="relative overflow-hidden"
        style={{
          backgroundColor: "#1a1c1c",
          minHeight: "350px",
          display: "flex",
          alignItems: "center",
        }}
      >
        <div className="absolute inset-0">
          <img
            src="/assets/internship-hero-bg.webp"
            alt="Internship at PSC"
            className="w-full h-full object-cover opacity-40"
            style={{ objectPosition: "center" }}
          />
        </div>
        <div className="absolute inset-0" style={{
          background: "linear-gradient(90deg, rgba(0,0,0,0.85) 0%, rgba(0,0,0,0.55) 35%, rgba(0,0,0,0.20) 65%, rgba(0,0,0,0) 100%)"
        }}></div>
        <div className="relative z-10 w-full px-4 md:px-10 lg:px-40 py-16">
          <div className="max-w-[1280px] mx-auto">
            <h1
              className="text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-4 animate-on-scroll"
              style={{ opacity: 0, transform: "translateY(30px)" }}
            >
              Internship & Fellowship
            </h1>
            <div className="flex h-[3px] w-[80px] md:w-[110px]">
              <span
                className="w-1/2"
                style={{ backgroundColor: "var(--psc-primary-container)" }}
              ></span>
              <span className="w-1/2 bg-white"></span>
            </div>
            <p
              className="text-white/80 text-lg md:text-xl max-w-2xl mt-4 animate-on-scroll"
              style={{ opacity: 0, transform: "translateY(30px)" }}
            >
              Your future in public service starts here
            </p>
          </div>
        </div>
      </section>

      {/* Navigation Tabs */}
      <section
        className="py-6 px-4 md:px-10 lg:px-40"
        style={{ backgroundColor: "var(--psc-surface-container-low)" }}
      >
        <div className="max-w-[1280px] mx-auto">
          <div className="flex flex-wrap gap-2 md:gap-4">
            {[
              { id: "shortlisted", label: "PSIP Internship Shortlisted" },
              { id: "appointed", label: "PSIP Internship Appointed" },
              { id: "opportunities", label: "Internship Opportunities" },
              { id: "archived", label: "Archived Internship" },
            ].map(function(tab) {
              const isActive = activeTab === tab.id;
              return (
                <button
                  key={tab.id}
                  onClick={function() { handleTabClick(tab.id as any); }}
                  className="px-4 py-2 rounded-lg text-sm font-semibold transition-all duration-300"
                  style={{
                    backgroundColor: isActive ? "var(--psc-primary-container)" : "transparent",
                    color: isActive ? "var(--psc-on-primary)" : "var(--psc-on-surface-variant)",
                    border: isActive ? "none" : "1px solid var(--psc-border)",
                  }}
                  aria-current={isActive ? "page" : undefined}
                >
                  {tab.label}
                </button>
              );
            })}
          </div>
        </div>
      </section>

      {/* Apply Section */}
      <section className="py-12 px-4 md:px-10 lg:px-40">
        <div className="max-w-[1280px] mx-auto">
          <div
            className="rounded-xl p-8 md:p-12 relative overflow-hidden animate-on-scroll"
            style={{
              backgroundColor: "var(--psc-surface-container)",
              border: "1px solid var(--psc-border)",
              opacity: 0,
              transform: "translateY(30px)",
              transition: "all 0.6s cubic-bezier(0.25, 0.46, 0.45, 0.94)",
            }}
          >
            {/* Decorative pattern */}
            <div className="absolute inset-0 opacity-5 pointer-events-none">
              <div className="absolute -top-20 -right-20 w-64 h-64 rounded-full" style={{ backgroundColor: "var(--psc-primary-container)" }}></div>
              <div className="absolute -bottom-20 -left-20 w-64 h-64 rounded-full" style={{ backgroundColor: "var(--psc-primary-container)" }}></div>
            </div>
            <div className="relative z-10 flex flex-col md:flex-row items-center justify-between gap-6">
              <div>
                <h2
                  className="text-2xl md:text-3xl font-bold"
                  style={{ color: "var(--psc-on-surface)" }}
                >
                  Apply Now Through Our Portal
                </h2>
                <p
                  className="mt-1"
                  style={{ color: "var(--psc-on-surface-variant)" }}
                >
                  Your future in public service starts here
                </p>
              </div>
              <a
                href="https://pscims.publicservice.go.ke/jobs/ActiveAdvertsInternsInternshipExt.aspx"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-8 py-3 rounded-full text-white font-bold text-sm transition-all hover:scale-105"
                style={{ backgroundColor: "var(--psc-primary-container)" }}
              >
                APPLY ONLINE
                <span className="material-symbols-outlined text-sm">arrow_forward</span>
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* Shortlisted Section */}
      <section
        id="internShort"
        className="py-16 px-4 md:px-10 lg:px-40"
        style={{ backgroundColor: "var(--psc-surface-container-low)" }}
      >
        <div className="max-w-[1280px] mx-auto">
          <div className="flex items-center gap-3 mb-8">
            <div
              className="w-1 h-8 rounded-full"
              style={{ backgroundColor: "var(--psc-primary-container)" }}
            ></div>
            <h2
              className="text-2xl md:text-3xl font-bold"
              style={{ color: "var(--psc-on-surface)" }}
            >
              PSIP Internship Shortlisted
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {shortlistedItems.map(function(item, index) {
              return (
                <div
                  key={index}
                  className="animate-on-scroll rounded-xl p-6 transition-all duration-300 hover:shadow-md"
                  style={{
                    backgroundColor: "var(--psc-surface-container)",
                    border: "1px solid var(--psc-border)",
                    opacity: 0,
                    transform: "translateX(-20px)",
                    transition: "all 0.4s cubic-bezier(0.25, 0.46, 0.45, 0.94)",
                    transitionDelay: (index * 0.08) + "s",
                  }}
                >
                  <h3
                    className="text-sm font-semibold mb-2 line-clamp-2"
                    style={{ color: "var(--psc-on-surface)" }}
                  >
                    {item.title}
                  </h3>
                  <div className="flex items-center justify-between text-xs" style={{ color: "var(--psc-on-surface-light)" }}>
                    <span>📅 {item.date}</span>
                    <span>📥 {item.downloads.toLocaleString()} downloads</span>
                  </div>
                  <div className="mt-4 flex gap-2">
                    <button
                      className="px-4 py-1.5 rounded-full text-xs font-semibold transition-colors"
                      style={{
                        backgroundColor: "var(--psc-primary-container)",
                        color: "var(--psc-on-primary)",
                      }}
                    >
                      View More
                    </button>
                    <button
                      className="px-4 py-1.5 rounded-full text-xs font-semibold transition-colors"
                      style={{
                        backgroundColor: "var(--psc-surface-variant)",
                        color: "var(--psc-primary)",
                      }}
                    >
                      Download
                    </button>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Appointed Section */}
      <section
        id="internApp"
        className="py-16 px-4 md:px-10 lg:px-40"
        style={{ backgroundColor: "var(--psc-surface)" }}
      >
        <div className="max-w-[1280px] mx-auto">
          <div className="flex items-center gap-3 mb-8">
            <div
              className="w-1 h-8 rounded-full"
              style={{ backgroundColor: "var(--psc-primary-container)" }}
            ></div>
            <h2
              className="text-2xl md:text-3xl font-bold"
              style={{ color: "var(--psc-on-surface)" }}
            >
              PSIP Internship Appointed
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {appointedItems.map(function(item, index) {
              return (
                <div
                  key={index}
                  className="animate-on-scroll rounded-xl p-6 transition-all duration-300 hover:shadow-md"
                  style={{
                    backgroundColor: "var(--psc-surface-container)",
                    border: "1px solid var(--psc-border)",
                    opacity: 0,
                    transform: "translateY(30px)",
                    transition: "all 0.5s cubic-bezier(0.25, 0.46, 0.45, 0.94)",
                    transitionDelay: (index * 0.1) + "s",
                  }}
                >
                  <h3
                    className="text-sm font-semibold mb-2 line-clamp-2"
                    style={{ color: "var(--psc-on-surface)" }}
                  >
                    {item.title}
                  </h3>
                  <div className="flex items-center justify-between text-xs" style={{ color: "var(--psc-on-surface-light)" }}>
                    <span>📅 {item.date}</span>
                    <span>📥 {item.downloads.toLocaleString()} downloads</span>
                  </div>
                  <div className="mt-4 flex gap-2">
                    <button
                      className="px-4 py-1.5 rounded-full text-xs font-semibold transition-colors"
                      style={{
                        backgroundColor: "var(--psc-primary-container)",
                        color: "var(--psc-on-primary)",
                      }}
                    >
                      View More
                    </button>
                    <button
                      className="px-4 py-1.5 rounded-full text-xs font-semibold transition-colors"
                      style={{
                        backgroundColor: "var(--psc-surface-variant)",
                        color: "var(--psc-primary)",
                      }}
                    >
                      Download
                    </button>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Opportunities Section */}
      <section
        id="internOpp"
        className="py-16 px-4 md:px-10 lg:px-40"
        style={{ backgroundColor: "var(--psc-surface-container-low)" }}
      >
        <div className="max-w-[1280px] mx-auto">
          <div className="flex items-center gap-3 mb-8">
            <div
              className="w-1 h-8 rounded-full"
              style={{ backgroundColor: "var(--psc-primary-container)" }}
            ></div>
            <h2
              className="text-2xl md:text-3xl font-bold"
              style={{ color: "var(--psc-on-surface)" }}
            >
              Internship Opportunities
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {opportunitiesItems.map(function(item, index) {
              return (
                <div
                  key={index}
                  className="animate-on-scroll rounded-xl p-6 transition-all duration-300 hover:shadow-md"
                  style={{
                    backgroundColor: "var(--psc-surface-container)",
                    border: "1px solid var(--psc-border)",
                    opacity: 0,
                    transform: "translateX(-20px)",
                    transition: "all 0.4s cubic-bezier(0.25, 0.46, 0.45, 0.94)",
                    transitionDelay: (index * 0.08) + "s",
                  }}
                >
                  <h3
                    className="text-sm font-semibold mb-2 line-clamp-2"
                    style={{ color: "var(--psc-on-surface)" }}
                  >
                    {item.title}
                  </h3>
                  <div className="flex items-center justify-between text-xs" style={{ color: "var(--psc-on-surface-light)" }}>
                    <span>📅 {item.date}</span>
                    <span>📥 {item.downloads.toLocaleString()} downloads</span>
                  </div>
                  <div className="mt-4 flex gap-2">
                    <button
                      className="px-4 py-1.5 rounded-full text-xs font-semibold transition-colors"
                      style={{
                        backgroundColor: "var(--psc-primary-container)",
                        color: "var(--psc-on-primary)",
                      }}
                    >
                      View More
                    </button>
                    <button
                      className="px-4 py-1.5 rounded-full text-xs font-semibold transition-colors"
                      style={{
                        backgroundColor: "var(--psc-surface-variant)",
                        color: "var(--psc-primary)",
                      }}
                    >
                      Download
                    </button>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Archived Section */}
      <section
        id="archiveIntern"
        className="py-16 px-4 md:px-10 lg:px-40"
        style={{ backgroundColor: "var(--psc-surface)" }}
      >
        <div className="max-w-[1280px] mx-auto">
          <div className="flex items-center gap-3 mb-8">
            <div
              className="w-1 h-8 rounded-full"
              style={{ backgroundColor: "var(--psc-primary-container)" }}
            ></div>
            <h2
              className="text-2xl md:text-3xl font-bold"
              style={{ color: "var(--psc-on-surface)" }}
            >
              Archived Internships
            </h2>
          </div>

          <div
            className="rounded-xl p-12 text-center animate-on-scroll"
            style={{
              backgroundColor: "var(--psc-surface-container)",
              border: "1px solid var(--psc-border)",
              opacity: 0,
              transform: "translateY(30px)",
              transition: "all 0.6s cubic-bezier(0.25, 0.46, 0.45, 0.94)",
            }}
          >
            <div
              className="w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-4"
              style={{ backgroundColor: "var(--psc-surface-variant)" }}
            >
              <span className="material-symbols-outlined text-4xl" style={{ color: "var(--psc-on-surface-light)" }}>
                archive
              </span>
            </div>
            <h3
              className="text-xl font-bold mb-2"
              style={{ color: "var(--psc-on-surface)" }}
            >
              No Archived Internships
            </h3>
            <p
              className="max-w-md mx-auto"
              style={{ color: "var(--psc-on-surface-variant)" }}
            >
              Currently, there are no archived internships. Please check back later for updates.
            </p>
          </div>
        </div>
      </section>

      {/* CSS for animations */}
      <style>{`
        .internship-page .animate-on-scroll.visible {
          opacity: 1 !important;
          transform: translateX(0) translateY(0) !important;
        }

        .internship-page .line-clamp-2 {
          display: -webkit-box;
          -webkit-line-clamp: 2;
          -webkit-box-orient: vertical;
          overflow: hidden;
        }

        @media (prefers-reduced-motion: reduce) {
          .internship-page .animate-on-scroll {
            opacity: 1 !important;
            transform: none !important;
            transition: none !important;
          }
        }

        @media (max-width: 768px) {
          .internship-page .grid-cols-3 {
            grid-template-columns: 1fr 1fr !important;
          }
          .internship-page .grid-cols-2 {
            grid-template-columns: 1fr !important;
          }
        }

        @media (max-width: 480px) {
          .internship-page .grid-cols-3 {
            grid-template-columns: 1fr !important;
          }
          .internship-page .flex-wrap {
            gap: 0.5rem !important;
          }
        }
      `}</style>
    </div>
  );
};

export default InternshipPage;