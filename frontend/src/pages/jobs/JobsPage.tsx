// src/pages/jobs/JobsPage.tsx
import * as React from "react";
import { trackEvent } from "../../analytics";

interface JobItem {
  id: number;
  title: string;
  department: string;
  location: string;
  type: string;
  deadline: string;
  description: string;
  link: string;
}

const PSCIMS_URL = "https://pscims-demo-abdae3amewazb9ae.uaenorth-01.azurewebsites.net/jobs/Default.aspx";

// Helper for section headers to replace the vertical bars
const SectionHeader = ({ eyebrow, title }: { eyebrow: string; title: string }) => (
  <div className="mb-8">
    <span className="block text-xs font-bold tracking-[0.2em] uppercase mb-2" style={{ color: "var(--psc-primary)" }}>
      {eyebrow}
    </span>
    <h2 className="text-2xl md:text-3xl font-extrabold tracking-tight" style={{ color: "var(--psc-on-surface)" }}>
      {title}
    </h2>
  </div>
);

const JobsPage = () => {
  const [activeTab, setActiveTab] = React.useState<"jobs" | "shortlisted" | "appointments" | "instructions" | "archived">("jobs");

  const jobs: JobItem[] = [
    {
      id: 1,
      title: "RE-ADVERTISEMENT OF A VACANCY IN THE POSITION OF MEMBER OF THE NATIONAL GOVERNMENT CONSTITUENCY DEVELOPMENT FUND (NG-CDF) BOARD",
      department: "NG-CDF Board",
      location: "Nairobi",
      type: "Full-time",
      deadline: "2024-12-31",
      description: "The National Government Constituency Development Fund Board seeks qualified candidates for the position of Board Member.",
      link: "/jobs/1",
    },
    {
      id: 2,
      title: "CALL FOR APPLICATIONS FOR THE IMPENDING VACANCY IN THE POSITION OF DATA COMMISSIONER",
      department: "Data Protection",
      location: "Nairobi",
      type: "Full-time",
      deadline: "2024-12-20",
      description: "The Office of the Data Protection Commissioner invites applications for the position of Data Commissioner.",
      link: "/jobs/2",
    },
    {
      id: 3,
      title: "INTERNAL ADVERTISEMENT (DELEGATED) STATE DEPARTMENT FOR PUBLIC SERVICE AND CAPITAL DEVELOPMENT",
      department: "Public Service",
      location: "Nairobi",
      type: "Internal",
      deadline: "2024-11-30",
      description: "Internal advertisement for positions within the State Department for Public Service and Capital Development.",
      link: "/jobs/3",
    },
    {
      id: 4,
      title: "INTERNAL ADVERTISEMENT (DELEGATED) STATE DEPARTMENT FOR CORRECTIONAL SERVICES",
      department: "Correctional Services",
      location: "Nairobi",
      type: "Internal",
      deadline: "2024-11-25",
      description: "Internal advertisement for positions within the State Department for Correctional Services.",
      link: "/jobs/4",
    },
    {
      id: 5,
      title: "INTERNAL ADVERTISEMENT (DELEGATED) STATE DEPARTMENT FOR LIVESTOCK DEVELOPMENT",
      department: "Livestock Development",
      location: "Nairobi",
      type: "Internal",
      deadline: "2024-11-20",
      description: "Internal advertisement for positions within the State Department for Livestock Development.",
      link: "/jobs/5",
    },
    {
      id: 6,
      title: "VACANCY FOR THE POSITION OF VICE CHANCELLOR, KIBABII UNIVERSITY",
      department: "Education",
      location: "Kibabii",
      type: "Full-time",
      deadline: "2024-12-15",
      description: "Kibabii University invites applications for the position of Vice Chancellor.",
      link: "/jobs/6",
    },
  ];

  const scrollToSection = (sectionId: string) => {
    const section = document.getElementById(sectionId);
    if (section) {
      const navbarHeight = 80;
      const sectionPosition = section.getBoundingClientRect().top + window.pageYOffset - navbarHeight;
      window.scrollTo({ top: sectionPosition, behavior: "smooth" });
    }
  };

  const handleTabClick = (tab: "jobs" | "shortlisted" | "appointments" | "instructions" | "archived") => {
    setActiveTab(tab);
    trackEvent("jobs_tab_click", { tab });
    if (window.navigator && window.navigator.vibrate) {
      window.navigator.vibrate(50);
    }
    const sectionMap: { [key: string]: string } = {
      jobs: "adJobs",
      shortlisted: "shortCan",
      appointments: "appointments",
      instructions: "videoInter",
      archived: "archiveJobs",
    };
    scrollToSection(sectionMap[tab]);
  };

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

  const handleJobClick = (job: JobItem) => {
    trackEvent("job_click", { title: job.title });
    if (window.navigator && window.navigator.vibrate) {
      window.navigator.vibrate(50);
    }
  };

  return (
    <div className="jobs-page" style={{ backgroundColor: "var(--psc-surface)" }}>
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
            src="/assets/jobs-hero-bg.webp"
            alt=""
            aria-hidden="true"
            className="w-full h-full object-cover object-center opacity-40"
            loading="eager"
          />
        </div>
        <div
          className="absolute inset-0"
          style={{
            background:
              "linear-gradient(90deg, rgba(0,0,0,0.85) 0%, rgba(0,0,0,0.55) 35%, rgba(0,0,0,0.20) 65%, rgba(0,0,0,0) 100%)",
          }}
        ></div>
        <div className="relative z-10 w-full px-4 md:px-10 lg:px-16 xl:px-40 py-16">
          <div className="max-w-[1280px] mx-auto">
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-4 animate-on-scroll" style={{ opacity: 0, transform: "translateY(30px)" }}>
              Jobs
            </h1>
            <div className="flex h-[3px] w-[80px] md:w-[110px]">
              <span className="w-1/2" style={{ backgroundColor: "var(--psc-primary-container)" }}></span>
              <span className="w-1/2 bg-white"></span>
            </div>
            <p className="text-white/80 text-lg md:text-xl max-w-2xl mt-4 animate-on-scroll" style={{ opacity: 0, transform: "translateY(30px)" }}>
              Explore exciting career opportunities in public service
            </p>
          </div>
        </div>
      </section>

      {/* Navigation Tabs */}
      <section className="py-6 px-4 md:px-10 lg:px-16 xl:px-40" style={{ backgroundColor: "var(--psc-surface-container-low)" }}>
        <div className="max-w-[1280px] mx-auto">
          <div className="flex flex-wrap gap-2 md:gap-3 p-1 rounded-2xl" style={{ backgroundColor: "var(--psc-surface-container)", border: "1px solid var(--psc-border)" }}>
            {[
              { id: "jobs", label: "Advertised Jobs" },
              { id: "shortlisted", label: "Shortlisted" },
              { id: "appointments", label: "Appointments" },
              { id: "instructions", label: "Interview Guidelines" },
              { id: "archived", label: "Archived" },
            ].map(function (tab) {
              const isActive = activeTab === tab.id;
              return (
                <button
                  key={tab.id}
                  onClick={function () { handleTabClick(tab.id as any); }}
                  className="px-4 py-2.5 rounded-xl text-sm font-semibold transition-all duration-300 min-h-[44px] flex-1 sm:flex-none"
                  style={{
                    backgroundColor: isActive ? "var(--psc-surface)" : "transparent",
                    color: isActive ? "var(--psc-primary)" : "var(--psc-on-surface-variant)",
                    boxShadow: isActive ? "0 1px 3px rgba(0,0,0,0.1)" : "none",
                    border: isActive ? "1px solid var(--psc-border)" : "1px solid transparent",
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
      <section className="py-16 px-4 md:px-10 lg:px-16 xl:px-40">
        <div className="max-w-[1280px] mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {/* Card 1 */}
            <div
              className="rounded-2xl p-6 md:p-8 animate-on-scroll flex flex-col"
              style={{
                backgroundColor: "var(--psc-surface-container)",
                boxShadow: "0 4px 20px rgba(0,0,0,0.04)",
                opacity: 0,
                transform: "translateY(30px)",
                transition: "all 0.6s cubic-bezier(0.25, 0.46, 0.45, 0.94)",
              }}
            >
              <div className="flex items-center mb-4">
                
                <h3 className="text-lg font-bold leading-tight" style={{ color: "var(--psc-on-surface)" }}>
                  Apply Now Through Our Portal
                </h3>
              </div>
              <p className="text-sm mb-6 flex-1" style={{ color: "var(--psc-on-surface-variant)", lineHeight: 1.6 }}>
                Submit your application online through our secure portal. Ensure you have all your details ready.
              </p>
              <a
                href={PSCIMS_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center text-sm font-bold min-h-[44px] transition-opacity hover:opacity-80"
                style={{ color: "var(--psc-primary)" }}
              >
                Enter Portal <span className="material-symbols-outlined text-lg ml-1" aria-hidden="true">arrow_forward</span>
              </a>
            </div>

            {/* Card 2 */}
            <div
              className="rounded-2xl p-6 md:p-8 animate-on-scroll flex flex-col"
              style={{
                backgroundColor: "var(--psc-surface-container)",
                boxShadow: "0 4px 20px rgba(0,0,0,0.04)",
                opacity: 0,
                transform: "translateY(30px)",
                transition: "all 0.6s cubic-bezier(0.25, 0.46, 0.45, 0.94)",
                transitionDelay: "0.1s",
              }}
            >
              <div className="flex items-center mb-4">
                <h3 className="text-lg font-bold leading-tight" style={{ color: "var(--psc-on-surface)" }}>
                  Check Application Status
                </h3>
              </div>
              <p className="text-sm mb-6 flex-1" style={{ color: "var(--psc-on-surface-variant)", lineHeight: 1.6 }}>
                Track the progress of your application and see if you have been shortlisted.
              </p>
              <a
                href={PSCIMS_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center text-sm font-bold min-h-[44px] transition-opacity hover:opacity-80"
                style={{ color: "var(--psc-info)" }}
              >
                Check Status <span className="material-symbols-outlined text-lg ml-1" aria-hidden="true">arrow_forward</span>
              </a>
            </div>

            {/* Card 3 */}
            <div
              className="rounded-2xl p-6 md:p-8 animate-on-scroll flex flex-col"
              style={{
                backgroundColor: "var(--psc-surface-container)",
                boxShadow: "0 4px 20px rgba(0,0,0,0.04)",
                opacity: 0,
                transform: "translateY(30px)",
                transition: "all 0.6s cubic-bezier(0.25, 0.46, 0.45, 0.94)",
                transitionDelay: "0.2s",
              }}
            >
              <div className="flex items-center mb-4">
                <h3 className="text-lg font-bold leading-tight" style={{ color: "var(--psc-on-surface)" }}>
                  Advertised Jobs Status
                </h3>
              </div>
              <p className="text-sm mb-6 flex-1" style={{ color: "var(--psc-on-surface-variant)", lineHeight: 1.6 }}>
                View the status of current job advertisements across all ministries and departments.
              </p>
              <a
                href={PSCIMS_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center text-sm font-bold min-h-[44px] transition-opacity hover:opacity-80"
                style={{ color: "var(--psc-warning)" }}
              >
                View Jobs <span className="material-symbols-outlined text-lg ml-1" aria-hidden="true">arrow_forward</span>
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* Advertised Jobs Section */}
      <section id="adJobs" className="py-16 px-4 md:px-10 lg:px-16 xl:px-40" style={{ backgroundColor: "var(--psc-surface-container-low)" }}>
        <div className="max-w-[1280px] mx-auto">
          <SectionHeader eyebrow="Current Openings" title="Advertised Jobs" />

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {jobs.map(function (job, index) {
              return (
                <div
                  key={job.id}
                  className="animate-on-scroll rounded-2xl transition-all duration-300 hover:-translate-y-1 hover:shadow-xl flex flex-col"
                  style={{
                    backgroundColor: "var(--psc-surface-container)",
                    boxShadow: "0 2px 10px rgba(0,0,0,0.03)",
                    opacity: 0,
                    transform: "translateY(30px)",
                    transition: "all 0.5s cubic-bezier(0.25, 0.46, 0.45, 0.94)",
                    transitionDelay: index * 0.08 + "s",
                  }}
                >
                  <div className="p-6 flex flex-col flex-1">
                    <div className="flex items-start justify-between gap-3 mb-4">
                      <span
                        className="text-[11px] font-bold uppercase tracking-wider px-2.5 py-1 rounded-md flex-shrink-0"
                        style={{
                          backgroundColor: "rgba(230,140,0,0.1)",
                          color: "var(--psc-primary)",
                        }}
                      >
                        {job.type}
                      </span>
                      <span className="text-xs font-medium" style={{ color: "var(--psc-on-surface-light)" }}>
                        Closes: {job.deadline}
                      </span>
                    </div>
                    <h3 className="text-base font-bold mb-3 line-clamp-3 leading-snug" style={{ color: "var(--psc-on-surface)" }}>
                      <a
                        href={job.link}
                        onClick={function (e) {
                          e.preventDefault();
                          handleJobClick(job);
                        }}
                        className="hover:text-[var(--psc-primary)] transition-colors"
                        style={{ color: "inherit", textDecoration: "none" }}
                      >
                        {job.title}
                      </a>
                    </h3>
                    <p className="text-sm mb-4 line-clamp-2 flex-1" style={{ color: "var(--psc-on-surface-variant)", lineHeight: 1.6 }}>
                      {job.description}
                    </p>
                    <div
                      className="flex items-center justify-between mt-auto pt-4"
                      style={{ borderTop: "1px solid var(--psc-border-light)" }}
                    >
                      <span className="text-xs font-medium" style={{ color: "var(--psc-on-surface-light)" }}>
                        {job.department} &bull; {job.location}
                      </span>
                      <a
                        href={job.link}
                        onClick={function (e) {
                          e.preventDefault();
                          handleJobClick(job);
                        }}
                        className="inline-flex items-center text-sm font-bold min-h-[44px] transition-all hover:underline"
                        style={{ color: "var(--psc-primary-container)" }}
                      >
                        Details
                      </a>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>

          <div className="flex justify-center mt-10">
            <button
              className="px-8 py-3 rounded-full font-bold text-sm transition-all hover:scale-105 min-h-[44px] shadow-md"
              style={{
                backgroundColor: "var(--psc-primary-container)",
                color: "var(--psc-on-primary)",
              }}
            >
              Load More Jobs
            </button>
          </div>
        </div>
      </section>

      {/* Shortlisted Candidates Section */}
      <section id="shortCan" className="py-16 px-4 md:px-10 lg:px-16 xl:px-40" style={{ backgroundColor: "var(--psc-surface)" }}>
        <div className="max-w-[1280px] mx-auto">
          <SectionHeader eyebrow="Results" title="Shortlisted Candidates" />

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[
              {
                title: "SHORTLISTED CANDIDATES FOR THE POSITION OF DEPUTY VICE CHANCELLOR (RESEARCH, INNOVATION AND LINKAGES) MACHAKOS UNIVERSITY",
                date: "2024-11-15",
                downloads: 138,
              },
              {
                title: "SHORTLISTED CANDIDATES FOR THE POSITION OF DEPUTY VICE CHANCELLOR (ADMINISTRATION, FINANCE AND DEVELOPMENT) MASENO UNIVERSITY",
                date: "2024-11-10",
                downloads: 291,
              },
              {
                title: "SHORTLISTED CANDIDATES FOR THE POSITION OF DEPUTY VICE CHANCELLOR (ACADEMIC AND STUDENT AFFAIRS) MACHAKOS UNIVERSITY",
                date: "2024-11-05",
                downloads: 233,
              },
            ].map(function (item, index) {
              return (
                <div
                  key={index}
                  className="animate-on-scroll rounded-2xl p-6 transition-all duration-300 hover:shadow-md flex flex-col"
                  style={{
                    backgroundColor: "var(--psc-surface-container)",
                    boxShadow: "0 2px 10px rgba(0,0,0,0.03)",
                    opacity: 0,
                    transform: "translateX(-20px)",
                    transition: "all 0.4s cubic-bezier(0.25, 0.46, 0.45, 0.94)",
                    transitionDelay: index * 0.08 + "s",
                  }}
                >
                  <h3 className="text-sm font-bold mb-3 line-clamp-2 flex-1 leading-snug" style={{ color: "var(--psc-on-surface)" }}>
                    {item.title}
                  </h3>
                  <div className="flex flex-wrap items-center justify-between text-xs mb-5 font-medium" style={{ color: "var(--psc-on-surface-light)" }}>
                    <span className="mr-2 bg-[var(--psc-surface-variant)] px-2 py-1 rounded">Date: {item.date}</span>
                    <span>Downloads: {item.downloads}</span>
                  </div>
                  <div className="flex flex-col sm:flex-row mt-auto">
                    <button
                      className="px-5 py-2 rounded-lg text-xs font-bold transition-all min-h-[44px] sm:min-h-0 sm:mr-3 mb-2 sm:mb-0 hover:opacity-90"
                      style={{
                        backgroundColor: "var(--psc-primary-container)",
                        color: "var(--psc-on-primary)",
                      }}
                    >
                      View List
                    </button>
                    <button
                      className="px-5 py-2 rounded-lg text-xs font-bold transition-all min-h-[44px] sm:min-h-0 hover:bg-[rgba(0,0,0,0.05)]"
                      style={{
                        backgroundColor: "transparent",
                        color: "var(--psc-on-surface)",
                        border: "1px solid var(--psc-border)",
                      }}
                    >
                      Download PDF
                    </button>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Appointments Section */}
      <section id="appointments" className="py-16 px-4 md:px-10 lg:px-16 xl:px-40" style={{ backgroundColor: "var(--psc-surface-container-low)" }}>
        <div className="max-w-[1280px] mx-auto">
          <SectionHeader eyebrow="Placed Candidates" title="Appointments" />

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[
              {
                title: "LIST OF APPOINTED PUBLIC SERVICE INTERNSHIP PROGRAMME (PSIP) COHORT VII INTERNS 2024-2025",
                date: "2024-10-20",
                downloads: 28563,
              },
              {
                title: "APPOINTED CANDIDATES FOR ADVERTISED VACANCIES MINISTRY OF ICT, INNOVATION AND YOUTH AFFAIRS",
                date: "2024-09-15",
                downloads: 11258,
              },
            ].map(function (item, index) {
              return (
                <div
                  key={index}
                  className="animate-on-scroll rounded-2xl p-6 transition-all duration-300 hover:shadow-md flex flex-col"
                  style={{
                    backgroundColor: "var(--psc-surface-container)",
                    boxShadow: "0 2px 10px rgba(0,0,0,0.03)",
                    opacity: 0,
                    transform: "translateY(30px)",
                    transition: "all 0.5s cubic-bezier(0.25, 0.46, 0.45, 0.94)",
                    transitionDelay: index * 0.1 + "s",
                  }}
                >
                  <h3 className="text-sm font-bold mb-3 line-clamp-2 flex-1 leading-snug" style={{ color: "var(--psc-on-surface)" }}>
                    {item.title}
                  </h3>
                  <div className="flex flex-wrap items-center justify-between text-xs mb-5 font-medium" style={{ color: "var(--psc-on-surface-light)" }}>
                    <span className="mr-2 bg-[var(--psc-surface-variant)] px-2 py-1 rounded">Date: {item.date}</span>
                    <span>Downloads: {item.downloads.toLocaleString()}</span>
                  </div>
                  <div className="flex flex-col sm:flex-row mt-auto">
                    <button
                      className="px-5 py-2 rounded-lg text-xs font-bold transition-all min-h-[44px] sm:min-h-0 sm:mr-3 mb-2 sm:mb-0 hover:opacity-90"
                      style={{
                        backgroundColor: "var(--psc-primary-container)",
                        color: "var(--psc-on-primary)",
                      }}
                    >
                      View List
                    </button>
                    <button
                      className="px-5 py-2 rounded-lg text-xs font-bold transition-all min-h-[44px] sm:min-h-0 hover:bg-[rgba(0,0,0,0.05)]"
                      style={{
                        backgroundColor: "transparent",
                        color: "var(--psc-on-surface)",
                        border: "1px solid var(--psc-border)",
                      }}
                    >
                      Download PDF
                    </button>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Instructions Section */}
      <section id="videoInter" className="py-16 px-4 md:px-10 lg:px-16 xl:px-40" style={{ backgroundColor: "var(--psc-surface)" }}>
        <div className="max-w-[1280px] mx-auto">
          <SectionHeader eyebrow="Guidelines" title="Instructions for Online Video Interviews" />

          <div
            className="rounded-2xl p-6 md:p-10 animate-on-scroll"
            style={{
              backgroundColor: "var(--psc-surface-container)",
              boxShadow: "0 4px 20px rgba(0,0,0,0.04)",
              opacity: 0,
              transform: "translateY(30px)",
              transition: "all 0.6s cubic-bezier(0.25, 0.46, 0.45, 0.94)",
            }}
          >
            <div className="flex flex-col md:flex-row items-start">
              <div className="flex-1 min-w-0">
                <h3 className="text-xl font-bold mb-3" style={{ color: "var(--psc-on-surface)" }}>
                  Prepare for your interview
                </h3>
                <p className="text-sm mb-6" style={{ color: "var(--psc-on-surface-variant)", lineHeight: 1.7 }}>
                  Please read the following instructions carefully before your online video interview to ensure a smooth experience for both you and the panel.
                </p>
                <ul className="text-sm mb-8" style={{ color: "var(--psc-on-surface-variant)", listStyle: "disc", paddingLeft: "20px", margin: 0 }}>
                  <li className="mb-3 pl-2">Ensure you have a stable internet connection</li>
                  <li className="mb-3 pl-2">Use a device with a working camera and microphone</li>
                  <li className="mb-3 pl-2">Find a quiet, well-lit location for the interview</li>
                  <li className="mb-3 pl-2">Dress professionally as you would for an in-person interview</li>
                </ul>
                <button
                  className="px-8 py-3 rounded-full text-white font-bold text-sm transition-all hover:scale-105 min-h-[44px] shadow-md"
                  style={{ backgroundColor: "var(--psc-primary-container)" }}
                >
                  Download Full Instructions
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Archived Jobs Section */}
      <section id="archiveJobs" className="py-16 px-4 md:px-10 lg:px-16 xl:px-40" style={{ backgroundColor: "var(--psc-surface-container-low)" }}>
        <div className="max-w-[1280px] mx-auto">
          <SectionHeader eyebrow="History" title="Archived Jobs" />

          <div
            className="rounded-2xl p-10 md:p-16 text-center animate-on-scroll"
            style={{
              backgroundColor: "var(--psc-surface-container)",
              border: "1px dashed var(--psc-border)",
              opacity: 0,
              transform: "translateY(30px)",
              transition: "all 0.6s cubic-bezier(0.25, 0.46, 0.45, 0.94)",
            }}
          >
    
            <h3 className="text-xl font-bold mb-3" style={{ color: "var(--psc-on-surface)" }}>
              No Archived Jobs
            </h3>
            <p className="max-w-md mx-auto text-sm" style={{ color: "var(--psc-on-surface-variant)", lineHeight: 1.6 }}>
              Currently, there are no archived jobs. Please check back later for updates on past recruitment drives.
            </p>
          </div>
        </div>
      </section>

      <style>{`
        .jobs-page .animate-on-scroll.visible {
          opacity: 1 !important;
          transform: translateX(0) translateY(0) !important;
        }

        .jobs-page .line-clamp-2 {
          display: -webkit-box;
          -webkit-line-clamp: 2;
          -webkit-box-orient: vertical;
          overflow: hidden;
        }

        .jobs-page .line-clamp-3 {
          display: -webkit-box;
          -webkit-line-clamp: 3;
          -webkit-box-orient: vertical;
          overflow: hidden;
        }

        @media (prefers-reduced-motion: reduce) {
          .jobs-page .animate-on-scroll {
            opacity: 1 !important;
            transform: none !important;
            transition: none !important;
          }
        }

        @media (max-width: 768px) {
          .jobs-page .grid-cols-3 {
            grid-template-columns: 1fr 1fr !important;
          }
          .jobs-page .grid-cols-2 {
            grid-template-columns: 1fr !important;
          }
        }

        @media (max-width: 480px) {
          .jobs-page .grid-cols-3 {
            grid-template-columns: 1fr !important;
          }
        }
      `}</style>
    </div>
  );
};

export default JobsPage;