// src/pages/home/sections/AboutSection.tsx
import * as React from "react";
import { useContent } from "../../../content/useContext";
import { trackEvent } from "../../../analytics";

type AboutFeature = {
  icon: string;
  title: string;
  description: string;
};

type AboutSectionData = {
  badge: string;
  title: string;
  description1: string;
  description2: string;
  image: string;
  features?: AboutFeature[];
};

interface AboutSectionProps {
  isFullPage?: boolean;
}

const AboutSection = ({ isFullPage = false }: AboutSectionProps) => {
  const { content } = useContent();
  const about = (content && content.about) as AboutSectionData | undefined;
  const [activeTab, setActiveTab] = React.useState(0);
  const sectionRef = React.useRef<HTMLElement>(null);

  // Stats data
  const stats = [
    { number: "1954", label: "Year Established" },
    { number: "20K+", label: "Youths Trained Under PSIP" },
  ];

  // Directorates data
  const directorates = [
    {
      id: 1,
      number: "01",
      title: "Establishment & Management Consultancy Services",
      description:
        "Offering management consultancy services to ministries, departments and other public-sector institutions; provision of guidelines on establishment and abolition of offices and organizational structures.",
    },
    {
      id: 2,
      number: "02",
      title: "Compliance & Quality Assurance",
      description:
        "Promotion of the values and principles in Articles 10 and 232 of the Constitution in the public service; promoting good governance, ethics and integrity.",
    },
    {
      id: 3,
      number: "03",
      title: "Human Resource Management & Development",
      description:
        "Formulation, interpretation and monitoring of human resource management and development policies, rules, regulations, and procedures in the Public Service.",
    },
    {
      id: 4,
      number: "04",
      title: "Performance Management & Service Delivery Improvement",
      description:
        "Ensuring a strategic and integrated approach to performance management to improve public service delivery and outcomes desired by the citizens.",
    },
    {
      id: 5,
      number: "05",
      title: "Recruitment & Selection",
      description:
        "Reviewing and establishing recruitment policy and procedures; planning, directing and coordinating recruitment and selection annual master plan.",
    },
    {
      id: 6,
      number: "06",
      title: "Finance & Planning",
      description:
        "Providing strategic leadership in the development of the Commission's mandate implementation strategy; ensuring alignment with the Government Budget Policy Framework.",
    },
    {
      id: 7,
      number: "07",
      title: "Legal Services",
      description:
        "Handling civil, criminal and industrial cases; researching and drafting opinions on legal matters; advising the Commission on compliance with all laws.",
    },
    {
      id: 8,
      number: "08",
      title: "Board Management Services",
      description:
        "Scrutinizing and analyzing of cases; preparation of agenda for the Commission's Board meetings; offering technical advisory on HR matters.",
    },
  ];

  // Committee data
  const committees = [
    {
      id: 1,
      title: "Compliance & Quality Assurance Committee",
      description:
        "The Committee derives its functions from Articles 234(2) (c), (d) and (h) of the Constitution and PARTS IX and XI of the PSC Act, 2017.",
    },
    {
      id: 2,
      title: "Finance, Planning, ICT, Partnership & General Purpose",
      description:
        "The Committee derives its functions from Article 253 of the Constitution and Section 16 and Parts III of the Public Service Commission Act, 2017.",
    },
    {
      id: 3,
      title: "Terms & Conditions of Service Committee",
      description:
        "The Committee derives its functions from Article 234 (2) (a) (d), (e), (f) and (g) and 232(1) of the Constitution and Parts VI, VII, VIII, XII and XIII of the PSC Act, 2017.",
    },
    {
      id: 4,
      title: "Capacity & Capability Development Committee",
      description:
        "The Committee derives its functions from Article 234(2) (f) of the Constitution; namely, develop human resources in the public service.",
    },
    {
      id: 5,
      title: "County Appeals, Discipline & Devolution Matters",
      description:
        "The Committee derives its functions from Article 234(2) (i) and the Fourth Schedule of the Constitution and part XV of the PSC Act, 2017.",
    },
    {
      id: 6,
      title: "Public Service Performance & Transformation Committee",
      description:
        "The Committee derives its functions from Article 234 (2) (e) of the Constitution and Part X of the PSC Act, 2017.",
    },
    {
      id: 7,
      title: "Human Resource Planning, Establishment & Recruitment Committee",
      description:
        "The Committee derives its functions from Article 234(2) (a)(i) & (ii), 132(4) (a) and 155(3) (a), of the Constitution and Parts IV & VI of the PSC Act, 2017.",
    },
    {
      id: 8,
      title: "Public Affairs & Communication Committee",
      description:
        "The Committee derives its functions from Articles 254(3), 232(1)(f) and 35(3) of the Constitution; Access to Information Act, 2016.",
    },
    {
      id: 9,
      title: "Audit Committee",
      description:
        "The Committee derives its functions from Section 73(5) of the Public Finance Management Act, 2012.",
    },
  ];

  // Functions data
  const functionsList = [
    "Establish and abolish offices in the public service",
    "Appoint persons to hold or act in those offices",
    "Exercise disciplinary control over persons holding office",
    "Promote values and principles in Articles 10 and 232",
    "Investigate, monitor and evaluate the public service",
    "Ensure the public service is efficient and effective",
    "Develop human resources in the public service",
    "Review and make recommendations on conditions of service",
    "Evaluate and report to the President and Parliament",
    "Hear and determine appeals from county governments",
    "Nominate persons to Judicial Service Commission",
    "Recommend persons for appointment as Principal Secretaries",
  ];

  // Intersection Observer for animations
  React.useEffect(() => {
    if (typeof IntersectionObserver === "undefined") return;

    const observer = new IntersectionObserver(
      function (entries) {
        entries.forEach(function (entry) {
          if (entry.isIntersecting) {
            entry.target.classList.add("visible");
          }
        });
      },
      { threshold: 0.1 }
    );

    document.querySelectorAll(".animate-on-scroll").forEach(function (el) {
      observer.observe(el);
    });

    return function () {
      observer.disconnect();
    };
  }, []);

  // Handle tab switching
  const handleTabClick = function (index: number) {
    setActiveTab(index);
    trackEvent("about_tab_click", { tab: index });
  };

  // Handle directorate click
  const handleDirectorateClick = function (title: string) {
    trackEvent("directorate_click", { title: title });
    if (window.navigator && window.navigator.vibrate) {
      window.navigator.vibrate(50);
    }
  };

  // Handle committee click
  const handleCommitteeClick = function (title: string) {
    trackEvent("committee_click", { title: title });
    if (window.navigator && window.navigator.vibrate) {
      window.navigator.vibrate(50);
    }
  };

  // If no content, show nothing
  if (!about) return null;

  // Render just the home section if not full page
  if (!isFullPage) {
    const features = about.features || [];

    return (
      <section
        className="py-24 px-4 md:px-10 lg:px-40 overflow-hidden"
        style={{
          backgroundColor: "var(--psc-surface)",
          color: "var(--psc-on-surface)",
        }}
        id="about"
        ref={sectionRef}
      >
        <div className="max-w-[1280px] mx-auto grid lg:grid-cols-2 gap-16 items-center">
          {/* Image Column */}
          <div className="relative order-2 lg:order-1">
            <div
              className="absolute -top-4 -left-4 w-24 h-24 rounded-xl -z-10"
              style={{
                backgroundColor: "var(--psc-primary-container)",
                opacity: 0.1,
              }}
              aria-hidden="true"
            ></div>
            <div
              className="absolute -bottom-4 -right-4 w-24 h-24 rounded-xl -z-10"
              style={{
                backgroundColor: "var(--psc-primary-container)",
                opacity: 0.05,
              }}
              aria-hidden="true"
            ></div>
            <img
              alt="Team collaborating in a modern office"
              className="rounded-2xl shadow-2xl w-full object-cover aspect-[4/3] max-h-[500px] animate-on-scroll"
              style={{
                border: "1px solid var(--psc-border)",
                opacity: 0,
                transform: "translateX(-30px)",
                transition: "all 0.8s cubic-bezier(0.25, 0.46, 0.45, 0.94)",
              }}
              src={about.image}
            />
          </div>

          {/* Content Column */}
          <div className="order-1 lg:order-2">
            <div
              className="animate-on-scroll"
              style={{
                opacity: 0,
                transform: "translateY(30px)",
                transition: "all 0.6s cubic-bezier(0.25, 0.46, 0.45, 0.94)",
              }}
            >
              <h2
                className="font-bold text-sm tracking-[0.2em] uppercase mb-4 flex items-center gap-3"
                style={{ color: "var(--psc-primary)" }}
              >
                <span
                  className="w-8 h-px"
                  style={{ backgroundColor: "var(--psc-primary-container)" }}
                ></span>
                {about.badge}
              </h2>

              <h3
                className="text-3xl md:text-4xl font-extrabold mb-6 leading-tight"
                style={{ color: "var(--psc-on-surface)" }}
              >
                {about.title}
              </h3>

              <p
                className="text-lg mb-4 leading-relaxed"
                style={{ color: "var(--psc-on-surface-variant)" }}
              >
                {about.description1}
              </p>

              <p
                className="text-lg mb-8 leading-relaxed"
                style={{ color: "var(--psc-on-surface-variant)" }}
              >
                {about.description2}
              </p>

              {features && features.length > 0 && (
                <div className="grid grid-cols-2 gap-4 mb-8">
                  {features.map(function (feature, index) {
                    return (
                      <div
                        key={index}
                        className="flex items-start gap-3 p-3 rounded-lg transition-all hover:shadow-md"
                        style={{
                          backgroundColor: "var(--psc-surface-container)",
                          border: "1px solid var(--psc-border)",
                          transition: "all 0.3s ease",
                        }}
                      >
                        <span
                          className="material-symbols-outlined p-1.5 rounded-lg flex-shrink-0"
                          style={{
                            color: "var(--psc-primary)",
                            backgroundColor: "var(--psc-primary-container)",
                            opacity: 0.1,
                            fontSize: "20px",
                          }}
                          aria-hidden="true"
                        >
                          {feature.icon}
                        </span>
                        <div>
                          <h4
                            className="font-bold text-sm"
                            style={{ color: "var(--psc-on-surface)" }}
                          >
                            {feature.title}
                          </h4>
                          <p
                            className="text-xs"
                            style={{ color: "var(--psc-on-surface-variant)" }}
                          >
                            {feature.description}
                          </p>
                        </div>
                      </div>
                    );
                  })}
                </div>
              )}

              <a
                href="/about"
                onClick={function () {
                  trackEvent("about_read_more");
                  if (window.navigator && window.navigator.vibrate) {
                    window.navigator.vibrate(50);
                  }
                }}
                className="inline-flex items-center gap-2 px-6 py-3 rounded-full font-bold text-sm transition-all hover:scale-105 hover:shadow-lg"
                style={{
                  backgroundColor: "var(--psc-primary-container)",
                  color: "var(--psc-on-primary)",
                }}
              >
                Learn More About Us
                <svg
                  className="w-4 h-4 transition-transform group-hover:translate-x-1"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  strokeWidth="2"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M5 12h14M13 6l6 6-6 6"
                  />
                </svg>
              </a>
            </div>
          </div>
        </div>

        <style>{`
          .animate-on-scroll.visible {
            opacity: 1 !important;
            transform: translateX(0) translateY(0) !important;
          }

          @media (prefers-reduced-motion: reduce) {
            .animate-on-scroll {
              opacity: 1 !important;
              transform: none !important;
              transition: none !important;
            }
          }
        `}</style>
      </section>
    );
  }

  // Full page render
  return (
    <div className="about-page" style={{ backgroundColor: "var(--psc-surface)" }}>
      {/* Hero Section */}
      <section
        className="relative overflow-hidden"
        style={{
          backgroundColor: "#1a1c1c",
          minHeight: "400px",
          display: "flex",
          alignItems: "center",
        }}
      >
        <div className="absolute inset-0">
          <img
            src="/assets/about-hero-bg.webp"
            alt="About PSC"
            className="w-full h-full object-cover opacity-40"
            style={{ objectPosition: "center" }}
          />
        </div>
        <div
          className="absolute inset-0"
          style={{
            background:
              "linear-gradient(90deg, rgba(0,0,0,0.85) 0%, rgba(0,0,0,0.55) 35%, rgba(0,0,0,0.20) 65%, rgba(0,0,0,0) 100%)",
          }}
        ></div>
        <div className="relative z-10 w-full px-4 md:px-10 lg:px-40 py-16">
          <div className="max-w-[1280px] mx-auto">
            <h1
              className="text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-4 animate-on-scroll"
              style={{ opacity: 0, transform: "translateY(30px)" }}
            >
              About Us
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
              Excellence in Service - A Citizen-Centric Public Service
            </p>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-16 px-4 md:px-10 lg:px-40">
        <div className="max-w-[1280px] mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {stats.map(function (stat, index) {
              return (
                <div
                  key={index}
                  className="animate-on-scroll rounded-xl p-8 text-center"
                  style={{
                    backgroundColor: "var(--psc-surface-container)",
                    border: "1px solid var(--psc-border)",
                    opacity: 0,
                    transform: "translateY(30px)",
                    transition: "all 0.6s cubic-bezier(0.25, 0.46, 0.45, 0.94)",
                    transitionDelay: index * 0.15 + "s",
                  }}
                >
                  <h2
                    className="text-5xl md:text-6xl font-bold"
                    style={{ color: "var(--psc-primary-container)" }}
                  >
                    {stat.number}
                  </h2>
                  <p
                    className="text-lg mt-2"
                    style={{ color: "var(--psc-on-surface-variant)" }}
                  >
                    {stat.label}
                  </p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* About Content Section */}
      <section className="py-16 px-4 md:px-10 lg:px-40">
        <div className="max-w-[1280px] mx-auto">
          <div className="grid lg:grid-cols-2 gap-12 items-start">
            {/* Left Column - About Text */}
            <div>
              <span
                className="text-sm font-bold tracking-[0.2em] uppercase"
                style={{ color: "var(--psc-primary)" }}
              >
                About The Commission
              </span>
              <h2
                className="text-3xl md:text-4xl font-bold mt-2 mb-6"
                style={{ color: "var(--psc-on-surface)" }}
              >
                Excellence in Service
              </h2>

              {/* Tabs */}
              <div
                className="flex border-b mb-6"
                style={{ borderColor: "var(--psc-border)" }}
              >
                <button
                  onClick={function () {
                    handleTabClick(0);
                  }}
                  className="px-4 py-2 font-semibold text-sm transition-all duration-300 relative"
                  style={{
                    color:
                      activeTab === 0
                        ? "var(--psc-primary-container)"
                        : "var(--psc-on-surface-variant)",
                    borderBottom:
                      activeTab === 0
                        ? "2px solid var(--psc-primary-container)"
                        : "2px solid transparent",
                  }}
                >
                  About Us
                </button>
                <button
                  onClick={function () {
                    handleTabClick(1);
                  }}
                  className="px-4 py-2 font-semibold text-sm transition-all duration-300 relative"
                  style={{
                    color:
                      activeTab === 1
                        ? "var(--psc-primary-container)"
                        : "var(--psc-on-surface-variant)",
                    borderBottom:
                      activeTab === 1
                        ? "2px solid var(--psc-primary-container)"
                        : "2px solid transparent",
                  }}
                >
                  Historical Background
                </button>
              </div>

              {/* Tab Content */}
              <div className="min-h-[200px]">
                {activeTab === 0 && (
                  <div className="animate-fade-in">
                    <p style={{ color: "var(--psc-on-surface-variant)" }}>
                      The Public Service Commission is a Constitutional Commission established
                      under Article 233(1) of the Constitution. It consists of a Chairperson,
                      Vice Chairperson and seven Commissioners appointed by the President with
                      the approval of the National Assembly.
                    </p>
                    <div className="mt-4 space-y-2">
                      <p style={{ color: "var(--psc-on-surface-variant)" }}>
                        <strong style={{ color: "var(--psc-on-surface)" }}>Mission:</strong>{" "}
                        To Reform and Transform the Public Service for Efficient and Effective
                        Service Delivery.
                      </p>
                      <p style={{ color: "var(--psc-on-surface-variant)" }}>
                        <strong style={{ color: "var(--psc-on-surface)" }}>Vision:</strong>{" "}
                        A Citizen-Centric Public Service.
                      </p>
                    </div>
                  </div>
                )}
                {activeTab === 1 && (
                  <div className="animate-fade-in">
                    <p style={{ color: "var(--psc-on-surface-variant)" }}>
                      The Commission dates back to 1954 when Civil Service Commission was
                      established by British Colonial Government following Holmes Commission
                      Report, 1948. Civil Service Commission played an advisory role to the
                      Governor in matters of appointments. At independence in 1963, it was
                      enshrined in the Constitution and renamed Public Service Commission (PSC).
                    </p>
                    <div className="flex flex-wrap gap-3 mt-6">
                      <button
                        onClick={function () {
                          trackEvent("read_more_history");
                          if (window.navigator && window.navigator.vibrate) {
                            window.navigator.vibrate(50);
                          }
                        }}
                        className="px-6 py-2.5 rounded-full text-white font-bold text-sm transition-all hover:scale-105"
                        style={{ backgroundColor: "var(--psc-primary-container)" }}
                      >
                        READ MORE
                      </button>
                      <a
                        href="https://www.publicservice.go.ke/wp-content/uploads/2024/03/Board-Charter-1-1.pdf"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="px-6 py-2.5 rounded-full text-white font-bold text-sm transition-all hover:scale-105"
                        style={{ backgroundColor: "#000000" }}
                      >
                        DOWNLOAD BOARD CHARTER
                      </a>
                    </div>
                  </div>
                )}
              </div>
            </div>

            {/* Right Column - Image */}
            <div className="relative">
              <div
                className="absolute -top-4 -right-4 w-24 h-24 rounded-xl -z-10"
                style={{
                  backgroundColor: "var(--psc-primary-container)",
                  opacity: 0.1,
                }}
              ></div>
              <img
                src={about.image}
                alt="Public Service Commission"
                className="rounded-2xl shadow-2xl w-full object-cover"
                style={{
                  border: "1px solid var(--psc-border)",
                }}
              />
            </div>
          </div>
        </div>
      </section>

      {/* Directorates Section */}
      <section
        className="py-20 px-4 md:px-10 lg:px-40"
        style={{ backgroundColor: "var(--psc-surface-container-low)" }}
      >
        <div className="max-w-[1280px] mx-auto">
          <div className="text-center mb-12">
            <span
              className="text-sm font-bold tracking-[0.2em] uppercase"
              style={{ color: "var(--psc-primary)" }}
            >
              Our Structure
            </span>
            <h2
              className="text-3xl md:text-4xl font-bold mt-2"
              style={{ color: "var(--psc-on-surface)" }}
            >
              Directorates
            </h2>
            <p
              className="mt-4 max-w-2xl mx-auto"
              style={{ color: "var(--psc-on-surface-variant)" }}
            >
              The Commission is organized into specialized directorates to effectively deliver on
              its mandate.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {directorates.map(function (directorate, index) {
              return (
                <div
                  key={directorate.id}
                  className="animate-on-scroll group rounded-xl p-6 transition-all duration-300 hover:-translate-y-2 hover:shadow-xl"
                  style={{
                    backgroundColor: "var(--psc-surface-container)",
                    border: "1px solid var(--psc-border)",
                    opacity: 0,
                    transform: "translateY(30px)",
                    transition: "all 0.5s cubic-bezier(0.25, 0.46, 0.45, 0.94)",
                    transitionDelay: index * 0.08 + "s",
                  }}
                >
                  <div className="flex items-center gap-3 mb-3">
                    <span
                      className="text-3xl font-bold opacity-50"
                      style={{ color: "var(--psc-primary-container)" }}
                    >
                      {directorate.number}
                    </span>
                  </div>
                  <h3
                    className="text-lg font-bold mb-2 line-clamp-2"
                    style={{ color: "var(--psc-on-surface)" }}
                  >
                    {directorate.title}
                  </h3>
                  <p
                    className="text-sm line-clamp-3 mb-4"
                    style={{ color: "var(--psc-on-surface-variant)" }}
                  >
                    {directorate.description}
                  </p>
                  <button
                    onClick={function () {
                      handleDirectorateClick(directorate.title);
                    }}
                    className="inline-flex items-center gap-1 text-sm font-semibold transition-all group-hover:gap-2"
                    style={{ color: "var(--psc-primary-container)" }}
                  >
                    Learn More
                    <svg
                      className="w-4 h-4 transition-transform group-hover:translate-x-1"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                      strokeWidth="2"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M5 12h14M13 6l6 6-6 6"
                      />
                    </svg>
                  </button>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Committees Section */}
      <section className="py-20 px-4 md:px-10 lg:px-40">
        <div className="max-w-[1280px] mx-auto">
          <div className="text-center mb-12">
            <span
              className="text-sm font-bold tracking-[0.2em] uppercase"
              style={{ color: "var(--psc-primary)" }}
            >
              Governance
            </span>
            <h2
              className="text-3xl md:text-4xl font-bold mt-2"
              style={{ color: "var(--psc-on-surface)" }}
            >
              Board Committees
            </h2>
            <p
              className="mt-4 max-w-2xl mx-auto"
              style={{ color: "var(--psc-on-surface-variant)" }}
            >
              The Commission is supported by specialized committees that provide oversight and
              guidance.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {committees.map(function (committee, index) {
              return (
                <div
                  key={committee.id}
                  className="animate-on-scroll group rounded-xl p-4 transition-all duration-300 hover:shadow-md cursor-pointer"
                  style={{
                    backgroundColor: "var(--psc-surface-container)",
                    border: "1px solid var(--psc-border)",
                    opacity: 0,
                    transform: "translateX(-20px)",
                    transition: "all 0.4s cubic-bezier(0.25, 0.46, 0.45, 0.94)",
                    transitionDelay: index * 0.06 + "s",
                  }}
                  onClick={function () {
                    handleCommitteeClick(committee.title);
                  }}
                >
                  <div className="flex items-center justify-between gap-4">
                    <div className="flex-1">
                      <h3
                        className="font-semibold text-sm md:text-base"
                        style={{ color: "var(--psc-on-surface)" }}
                      >
                        {committee.title}
                      </h3>
                      <p
                        className="text-xs mt-1 line-clamp-2"
                        style={{ color: "var(--psc-on-surface-variant)" }}
                      >
                        {committee.description}
                      </p>
                    </div>
                    <div
                      className="flex-shrink-0 w-8 h-8 rounded-full flex items-center justify-center transition-transform group-hover:scale-110"
                      style={{
                        backgroundColor: "var(--psc-primary-container)",
                        opacity: 0.1,
                      }}
                    >
                      <svg
                        className="w-4 h-4"
                        style={{ color: "var(--psc-primary-container)" }}
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                        strokeWidth="2"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          d="M9 5l7 7-7 7"
                        />
                      </svg>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Functions Section */}
      <section
        className="py-20 px-4 md:px-10 lg:px-40"
        style={{ backgroundColor: "var(--psc-surface-container-low)" }}
      >
        <div className="max-w-[1280px] mx-auto">
          <div className="text-center mb-12">
            <span
              className="text-sm font-bold tracking-[0.2em] uppercase"
              style={{ color: "var(--psc-primary)" }}
            >
              Our Mandate
            </span>
            <h2
              className="text-3xl md:text-4xl font-bold mt-2"
              style={{ color: "var(--psc-on-surface)" }}
            >
              Functions & Powers of the Commission
            </h2>
            <div className="flex justify-center mt-4">
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
          </div>

          <div
            className="rounded-2xl p-8 md:p-12"
            style={{
              backgroundColor: "var(--psc-surface-container)",
              border: "1px solid var(--psc-border)",
            }}
          >
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {functionsList.map(function (item, index) {
                return (
                  <div
                    key={index}
                    className="flex items-start gap-3 p-3 rounded-lg transition-all hover:shadow-sm"
                    style={{
                      transition: "all 0.3s ease",
                    }}
                  >
                    <div
                      className="w-5 h-5 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5"
                      style={{
                        backgroundColor: "var(--psc-primary-container)",
                        opacity: 0.15,
                      }}
                    >
                      <svg
                        className="w-3 h-3"
                        style={{ color: "var(--psc-primary-container)" }}
                        fill="currentColor"
                        viewBox="0 0 512 512"
                      >
                        <path d="M505 174.8l-39.6-39.6c-9.4-9.4-24.6-9.4-33.9 0L192 374.7 80.6 263.2c-9.4-9.4-24.6-9.4-33.9 0L7 302.9c-9.4 9.4-9.4 24.6 0 34L175 505c9.4 9.4 24.6 9.4 33.9 0l296-296.2c9.4-9.5 9.4-24.7.1-34z" />
                      </svg>
                    </div>
                    <span
                      className="text-sm"
                      style={{ color: "var(--psc-on-surface-variant)" }}
                    >
                      {item}
                    </span>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 px-4 md:px-10 lg:px-40">
        <div className="max-w-[1280px] mx-auto">
          <div
            className="rounded-2xl p-8 md:p-12 text-center"
            style={{ backgroundColor: "var(--psc-primary-container)" }}
          >
            <h2 className="text-2xl md:text-3xl font-bold text-white mb-4">
              Join Us in Shaping the Future of Public Service
            </h2>
            <p className="text-white/80 max-w-2xl mx-auto mb-6">
              Explore career opportunities, learn about our programs, or partner with us to drive
              excellence in public service.
            </p>
            <div className="flex flex-wrap gap-4 justify-center">
              <a
                href="/jobs"
                className="px-6 py-3 rounded-lg font-bold text-sm transition-all hover:scale-105"
                style={{
                  backgroundColor: "var(--psc-surface-container)",
                  color: "var(--psc-primary)",
                }}
              >
                View Job Opportunities
              </a>
              <a
                href="/contact"
                className="px-6 py-3 rounded-lg font-bold text-sm transition-all hover:scale-105"
                style={{
                  backgroundColor: "rgba(255,255,255,0.2)",
                  color: "#ffffff",
                  border: "1px solid rgba(255,255,255,0.3)",
                }}
              >
                Contact Us
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* Global CSS for animations */}
      <style>{`
        .about-page .animate-on-scroll.visible {
          opacity: 1 !important;
          transform: translateX(0) translateY(0) !important;
        }

        .about-page .animate-fade-in {
          animation: aboutFadeIn 0.5s ease-in-out;
        }

        @keyframes aboutFadeIn {
          0% {
            opacity: 0;
            transform: translateY(10px);
          }
          100% {
            opacity: 1;
            transform: translateY(0);
          }
        }

        .about-page .line-clamp-2 {
          display: -webkit-box;
          -webkit-line-clamp: 2;
          -webkit-box-orient: vertical;
          overflow: hidden;
        }

        .about-page .line-clamp-3 {
          display: -webkit-box;
          -webkit-line-clamp: 3;
          -webkit-box-orient: vertical;
          overflow: hidden;
        }

        /* Reduced motion support */
        @media (prefers-reduced-motion: reduce) {
          .about-page .animate-on-scroll {
            opacity: 1 !important;
            transform: none !important;
            transition: none !important;
          }
          .about-page .animate-fade-in {
            animation: none !important;
          }
        }

        /* Mobile responsive */
        @media (max-width: 768px) {
          .about-page h1 {
            font-size: 2rem !important;
          }
          .about-page .text-3xl {
            font-size: 1.5rem !important;
          }
          .about-page .text-4xl {
            font-size: 2rem !important;
          }
          .about-page .text-5xl {
            font-size: 2.5rem !important;
          }
          .about-page .text-6xl {
            font-size: 3rem !important;
          }
          .about-page .grid-cols-2 {
            grid-template-columns: 1fr !important;
          }
          .about-page .grid-cols-4 {
            grid-template-columns: 1fr 1fr !important;
          }
          .about-page .lg\\:grid-cols-2 {
            grid-template-columns: 1fr !important;
          }
        }

        @media (max-width: 480px) {
          .about-page .grid-cols-4 {
            grid-template-columns: 1fr !important;
          }
          .about-page .flex-wrap {
            gap: 0.75rem !important;
          }
        }
      `}</style>
    </div>
  );
};

export default AboutSection;