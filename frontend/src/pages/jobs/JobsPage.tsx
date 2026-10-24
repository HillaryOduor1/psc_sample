// src/pages/jobs/JobsPage.tsx
import * as React from "react";
import { Link } from "react-router-dom";
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

const JobsPage = () => {
  const [activeTab, setActiveTab] = React.useState<"jobs" | "shortlisted" | "appointments" | "instructions" | "archived">("jobs");
  const sectionRefs = React.useRef<{ [key: string]: HTMLElement | null }>({});

  // Sample job data
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

  // Get job type color
  const getJobTypeColor = (type: string) => {
    switch (type.toLowerCase()) {
      case "full-time": return "var(--psc-success)";
      case "internal": return "var(--psc-info)";
      case "contract": return "var(--psc-warning)";
      default: return "var(--psc-secondary)";
    }
  };

  // Handle job click
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
            alt="Jobs at PSC"
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
              Jobs
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
              Explore exciting career opportunities in public service
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
              { id: "jobs", label: "Advertised Jobs" },
              { id: "shortlisted", label: "Shortlisted Candidates" },
              { id: "appointments", label: "Appointments" },
              { id: "instructions", label: "Video Interview Instructions" },
              { id: "archived", label: "Archived Jobs" },
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
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div
              className="rounded-xl p-8 text-center animate-on-scroll"
              style={{
                backgroundColor: "var(--psc-surface-container)",
                border: "1px solid var(--psc-border)",
                opacity: 0,
                transform: "translateY(30px)",
                transition: "all 0.6s cubic-bezier(0.25, 0.46, 0.45, 0.94)",
              }}
            >
              <div
                className="w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4"
                style={{ backgroundColor: "var(--psc-primary-container)", opacity: 0.1 }}
              >
                <span className="material-symbols-outlined text-3xl" style={{ color: "var(--psc-primary-container)" }}>
                  work
                </span>
              </div>
              <h3
                className="text-xl font-bold mb-2"
                style={{ color: "var(--psc-on-surface)" }}
              >
                Apply Now Through Our Portal
              </h3>
              <p
                className="text-sm mb-4"
                style={{ color: "var(--psc-on-surface-variant)" }}
              >
                Submit your application online through our secure portal
              </p>
              <a
                href="https://pscims.publicservice.go.ke/jobs/"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-6 py-2.5 rounded-full text-white font-bold text-sm transition-all hover:scale-105"
                style={{ backgroundColor: "var(--psc-primary-container)" }}
              >
                APPLY ONLINE
                <span className="material-symbols-outlined text-sm">arrow_forward</span>
              </a>
            </div>

            <div
              className="rounded-xl p-8 text-center animate-on-scroll"
              style={{
                backgroundColor: "var(--psc-surface-container)",
                border: "1px solid var(--psc-border)",
                opacity: 0,
                transform: "translateY(30px)",
                transition: "all 0.6s cubic-bezier(0.25, 0.46, 0.45, 0.94)",
                transitionDelay: "0.15s",
              }}
            >
              <div
                className="w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4"
                style={{ backgroundColor: "var(--psc-info)", opacity: 0.1 }}
              >
                <span className="material-symbols-outlined text-3xl" style={{ color: "var(--psc-info)" }}>
                  assignment
                </span>
              </div>
              <h3
                className="text-xl font-bold mb-2"
                style={{ color: "var(--psc-on-surface)" }}
              >
                Check Application Status
              </h3>
              <p
                className="text-sm mb-4"
                style={{ color: "var(--psc-on-surface-variant)" }}
              >
                Track the progress of your application
              </p>
              <a
                href="https://pscims.publicservice.go.ke/jobs/loginPage.aspx"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-6 py-2.5 rounded-full text-white font-bold text-sm transition-all hover:scale-105"
                style={{ backgroundColor: "var(--psc-primary-container)" }}
              >
                TAKE ME THERE
                <span className="material-symbols-outlined text-sm">arrow_forward</span>
              </a>
            </div>

            <div
              className="rounded-xl p-8 text-center animate-on-scroll"
              style={{
                backgroundColor: "var(--psc-surface-container)",
                border: "1px solid var(--psc-border)",
                opacity: 0,
                transform: "translateY(30px)",
                transition: "all 0.6s cubic-bezier(0.25, 0.46, 0.45, 0.94)",
                transitionDelay: "0.3s",
              }}
            >
              <div
                className="w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4"
                style={{ backgroundColor: "var(--psc-warning)", opacity: 0.1 }}
              >
                <span className="material-symbols-outlined text-3xl" style={{ color: "var(--psc-warning)" }}>
                  list_alt
                </span>
              </div>
              <h3
                className="text-xl font-bold mb-2"
                style={{ color: "var(--psc-on-surface)" }}
              >
                Check Advertised Jobs Status
              </h3>
              <p
                className="text-sm mb-4"
                style={{ color: "var(--psc-on-surface-variant)" }}
              >
                View the status of current job advertisements
              </p>
              <a
                href="https://pscims.publicservice.go.ke/jobs/ActiveJobsAdverts.aspx"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-6 py-2.5 rounded-full text-white font-bold text-sm transition-all hover:scale-105"
                style={{ backgroundColor: "var(--psc-primary-container)" }}
              >
                TAKE ME THERE
                <span className="material-symbols-outlined text-sm">arrow_forward</span>
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* Advertised Jobs Section */}
      <section
        id="adJobs"
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
              Advertised Jobs
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {jobs.map(function(job, index) {
              return (
                <div
                  key={job.id}
                  className="animate-on-scroll rounded-xl overflow-hidden transition-all duration-300 hover:-translate-y-2 hover:shadow-xl"
                  style={{
                    backgroundColor: "var(--psc-surface-container)",
                    border: "1px solid var(--psc-border)",
                    opacity: 0,
                    transform: "translateY(30px)",
                    transition: "all 0.5s cubic-bezier(0.25, 0.46, 0.45, 0.94)",
                    transitionDelay: (index * 0.08) + "s",
                  }}
                >
                  <div className="p-6">
                    <div className="flex items-start justify-between gap-4 mb-3">
                      <span
                        className="text-xs font-semibold px-2.5 py-1 rounded-full"
                        style={{
                          backgroundColor: getJobTypeColor(job.type),
                          color: "#ffffff",
                          opacity: 0.8,
                        }}
                      >
                        {job.type}
                      </span>
                      <span
                        className="text-xs"
                        style={{ color: "var(--psc-on-surface-light)" }}
                      >
                        Deadline: {job.deadline}
                      </span>
                    </div>
                    <h3
                      className="text-base font-bold mb-2 line-clamp-3"
                      style={{ color: "var(--psc-on-surface)" }}
                    >
                      <a
                        href={job.link}
                        onClick={function(e) {
                          e.preventDefault();
                          handleJobClick(job);
                        }}
                        className="hover:underline"
                        style={{ color: "var(--psc-on-surface)" }}
                      >
                        {job.title}
                      </a>
                    </h3>
                    <p
                      className="text-sm mb-3 line-clamp-2"
                      style={{ color: "var(--psc-on-surface-variant)" }}
                    >
                      {job.description}
                    </p>
                    <div className="flex items-center justify-between mt-4 pt-4 border-t" style={{ borderColor: "var(--psc-border)" }}>
                      <span
                        className="text-xs"
                        style={{ color: "var(--psc-on-surface-light)" }}
                      >
                        {job.department} • {job.location}
                      </span>
                      <a
                        href={job.link}
                        onClick={function(e) {
                          e.preventDefault();
                          handleJobClick(job);
                        }}
                        className="inline-flex items-center gap-1 text-sm font-semibold transition-all hover:gap-2"
                        style={{ color: "var(--psc-primary-container)" }}
                      >
                        View More
                        <span className="material-symbols-outlined text-sm">arrow_forward</span>
                      </a>
                    </div>
                  </div>
                  <div
                    className="h-1"
                    style={{ backgroundColor: "var(--psc-primary-container)", opacity: 0.3 }}
                  ></div>
                </div>
              );
            })}
          </div>

          <div className="flex justify-center mt-8">
            <button
              className="px-6 py-2.5 rounded-full font-bold text-sm transition-all hover:scale-105"
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
      <section
        id="shortCan"
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
              Shortlisted Candidates
            </h2>
          </div>

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
            ].map(function(item, index) {
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
                    <span>📥 {item.downloads} downloads</span>
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

      {/* Appointments Section */}
      <section
        id="appointments"
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
              Appointments
            </h2>
          </div>

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
            ].map(function(item, index) {
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

      {/* Instructions Section */}
      <section
        id="videoInter"
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
              Instructions for Online Video Interviews
            </h2>
          </div>

          <div
            className="rounded-xl p-8 animate-on-scroll"
            style={{
              backgroundColor: "var(--psc-surface-container)",
              border: "1px solid var(--psc-border)",
              opacity: 0,
              transform: "translateY(30px)",
              transition: "all 0.6s cubic-bezier(0.25, 0.46, 0.45, 0.94)",
            }}
          >
            <div className="flex items-start gap-4">
              <div
                className="w-12 h-12 rounded-full flex items-center justify-center flex-shrink-0"
                style={{ backgroundColor: "var(--psc-primary-container)", opacity: 0.1 }}
              >
                <span className="material-symbols-outlined text-2xl" style={{ color: "var(--psc-primary-container)" }}>
                  video_camera_front
                </span>
              </div>
              <div>
                <h3
                  className="text-lg font-bold mb-2"
                  style={{ color: "var(--psc-on-surface)" }}
                >
                  Instructions for Online Video Interviews
                </h3>
                <p
                  className="text-sm mb-4"
                  style={{ color: "var(--psc-on-surface-variant)" }}
                >
                  Please read the following instructions carefully before your online video interview.
                </p>
                <ul className="space-y-2 text-sm" style={{ color: "var(--psc-on-surface-variant)" }}>
                  <li className="flex items-start gap-2">
                    <span style={{ color: "var(--psc-primary-container)" }}>•</span>
                    Ensure you have a stable internet connection
                  </li>
                  <li className="flex items-start gap-2">
                    <span style={{ color: "var(--psc-primary-container)" }}>•</span>
                    Use a device with a working camera and microphone
                  </li>
                  <li className="flex items-start gap-2">
                    <span style={{ color: "var(--psc-primary-container)" }}>•</span>
                    Find a quiet, well-lit location for the interview
                  </li>
                  <li className="flex items-start gap-2">
                    <span style={{ color: "var(--psc-primary-container)" }}>•</span>
                    Dress professionally as you would for an in-person interview
                  </li>
                </ul>
                <button
                  className="mt-4 px-6 py-2.5 rounded-full text-white font-bold text-sm transition-all hover:scale-105"
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
      <section
        id="archiveJobs"
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
              Archived Jobs
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
              No Archived Jobs
            </h3>
            <p
              className="max-w-md mx-auto"
              style={{ color: "var(--psc-on-surface-variant)" }}
            >
              Currently, there are no archived jobs. Please check back later for updates.
            </p>
          </div>
        </div>
      </section>

      {/* CSS for animations */}
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
          .jobs-page .flex-wrap {
            gap: 0.5rem !important;
          }
          .jobs-page .px-6 {
            padding-left: 1rem !important;
            padding-right: 1rem !important;
          }
        }
      `}</style>
    </div>
  );
};

export default JobsPage;