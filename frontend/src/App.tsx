// src/App.tsx
import * as React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { ThemeProvider } from "./components/theme-provider";
import { SettingsProvider } from "./stores/settings-store";
import { ContentProvider } from "./content/ContentProvider";
import { AuthProvider } from "./context/AuthContext";
import ThemeManager from "./components/ThemeManager";
import BackToTop from "./components/BackToTop";
import PublicLayout from "./Layout/PublicLayout";
import ScrollToTop from "./components/ScrollToTop";
import Navbar from "./components/Layout/Navbar";
import Sidebar from "./components/Sidebar/Sidebar";
import RouteProgressBar from "./components/RouteProgressBar";
import ClickFeedback from "./components/ClickFeedback";
import SocialFAB from "./components/SocialFAB";

const HomePage = React.lazy(() => import("./pages/home/HomePage"));
const AboutPage = React.lazy(() => import("./pages/AboutPage"));
const JobsPage = React.lazy(() => import("./pages/jobs/JobsPage"));
const InternshipPage = React.lazy(() => import("./pages/jobs/InternshipPage"));
const VacanciesPage = React.lazy(() => import("./pages/vacancies/VacanciesPage"));
const RecruitmentPortalPage = React.lazy(() => import("./pages/jobs/RecruitmentPortalPage"));
const PoliciesPage = React.lazy(() => import("./pages/policies/PoliciesPage"));
const NewsPage = React.lazy(() => import("./pages/news/NewsPage"));
const ContactPage = React.lazy(() => import("./pages/ContactPage"));
const PrivacyPolicy = React.lazy(() => import("./pages/PrivacyPolicy"));
const TermsOfUse = React.lazy(() => import("./pages/TermsOfUse"));
const Accessibility = React.lazy(() => import("./pages/Accessibility"));
const SearchPage = React.lazy(() => import("./pages/SearchPage"));
const NotFoundPage = React.lazy(() => import("./pages/NotFoundPage"));
const ResourcesPage = React.lazy(() => import("./pages/resources/ResourcesPage"));
const ReportsPage = React.lazy(() => import("./pages/resources/ReportsPage"));
const PublicationsPage = React.lazy(() => import("./pages/resources/PublicationsPage"));
const FormsPage = React.lazy(() => import("./pages/resources/FormsPage"));
const GuidelinesPage = React.lazy(() => import("./pages/resources/GuidelinesPage"));
const CircularsPage = React.lazy(() => import("./pages/resources/CircularsPage"));
const DownloadsPage = React.lazy(() => import("./pages/resources/DownloadsPage"));
const FAQsPage = React.lazy(() => import("./pages/resources/FAQsPage"));
const MediaPage = React.lazy(() => import("./pages/media/MediaPage"));
const EventsPage = React.lazy(() => import("./pages/media/EventsPage"));
const AnnouncementsPage = React.lazy(() => import("./pages/media/AnnouncementsPage"));
const GalleryPage = React.lazy(() => import("./pages/media/GalleryPage"));
const VideosPage = React.lazy(() => import("./pages/media/VideosPage"));
const PressReleasesPage = React.lazy(() => import("./pages/media/PressReleasesPage"));
const TendersPage = React.lazy(() => import("./pages/tenders/TendersPage"));
const FAQPage = React.lazy(() => import("./pages/faq/FAQPage"));

function AppContent() {
  const [isSidebarOpen, setIsSidebarOpen] = React.useState(false);

  return (
    <React.Suspense fallback={
      <div className="flex min-h-screen items-center justify-center bg-[#f9f9f9] dark:bg-[#2f3131]">
        <div className="flex gap-2">
          {[...Array(5)].map((_, i) => (
            <div key={i} className="h-3 w-3 animate-bounce rounded-full bg-[#e68c00]" style={{ animationDelay: `${i * 0.15}s` }} />
          ))}
        </div>
      </div>
    }>
      <div className="relative min-h-screen">
        <RouteProgressBar />
        <ScrollToTop />
        <Navbar isSidebarOpen={isSidebarOpen} setIsSidebarOpen={setIsSidebarOpen} />
        <Sidebar isOpen={isSidebarOpen} toggleSidebar={() => setIsSidebarOpen(!isSidebarOpen)} />
        <main id="main-content" tabIndex={-1}>
          <Routes>
            <Route element={<PublicLayout />}>
              <Route path="/" element={<HomePage />} />
              <Route path="/about" element={<AboutPage />} />
              <Route path="/jobs" element={<JobsPage />} />
              <Route path="/jobs/vacancies" element={<VacanciesPage />} />
              <Route path="/jobs/recruitment" element={<RecruitmentPortalPage />} />
              <Route path="/internship" element={<InternshipPage />} />
              <Route path="/vacancies" element={<VacanciesPage />} />
              <Route path="/resources" element={<ResourcesPage />} />
              <Route path="/resources/policies" element={<PoliciesPage />} />
              <Route path="/resources/reports" element={<ReportsPage />} />
              <Route path="/resources/publications" element={<PublicationsPage />} />
              <Route path="/resources/forms" element={<FormsPage />} />
              <Route path="/resources/guidelines" element={<GuidelinesPage />} />
              <Route path="/resources/circulars" element={<CircularsPage />} />
              <Route path="/resources/downloads" element={<DownloadsPage />} />
              <Route path="/resources/faqs" element={<FAQsPage />} />
              <Route path="/policies" element={<PoliciesPage />} />
              <Route path="/media" element={<MediaPage />} />
              <Route path="/media/news" element={<NewsPage />} />
              <Route path="/media/events" element={<EventsPage />} />
              <Route path="/media/announcements" element={<AnnouncementsPage />} />
              <Route path="/media/gallery" element={<GalleryPage />} />
              <Route path="/media/videos" element={<VideosPage />} />
              <Route path="/media/press-releases" element={<PressReleasesPage />} />
              <Route path="/news" element={<NewsPage />} />
              <Route path="/tenders" element={<TendersPage />} />
              <Route path="/faqs" element={<FAQPage />} />
              <Route path="/search" element={<SearchPage />} />
              <Route path="/contact" element={<ContactPage />} />
              <Route path="/privacy" element={<PrivacyPolicy />} />
              <Route path="/terms" element={<TermsOfUse />} />
              <Route path="/accessibility" element={<Accessibility />} />
              <Route path="*" element={<NotFoundPage />} />
            </Route>
          </Routes>
        </main>
        <SocialFAB />
        <BackToTop />
        <ClickFeedback />
      </div>
    </React.Suspense>
  );
}

export default function App() {
  return (
    <ThemeProvider defaultTheme="system">
      <BrowserRouter future={{ v7_startTransition: true, v7_relativeSplatPath: true }}>
        <AuthProvider>
          <SettingsProvider>
            <ContentProvider>
              <ThemeManager>
                <AppContent />
              </ThemeManager>
            </ContentProvider>
          </SettingsProvider>
        </AuthProvider>
      </BrowserRouter>
    </ThemeProvider>
  );
}



