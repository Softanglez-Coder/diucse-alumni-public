import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import HomePage from "./pages/HomePage";
import AboutPage from "./pages/AboutPage";
import AllEventsPage from "./pages/AllEventsPage";
import EventDetailsPage from "./pages/EventDetailsPage";
import PrivacyPolicyPage from "./pages/PrivacyPolicyPage";
import TermsOfServicePage from "./pages/TermsOfServicePage";
import NewsPage from "./pages/NewsPage";
import BlogPage from "./pages/BlogPage";
import GalleryPage from "./pages/GalleryPage";
import AlumniPage from "./pages/AlumniPage";
import ContactPage from "./pages/ContactPage";
import NewsDetailPage from "./pages/NewsDetailPage";
import BlogDetailPage from "./pages/BlogDetailPage";
import RegistrationPage from "./pages/RegistrationPage";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/about" element={<AboutPage />} />
        <Route path="/events" element={<AllEventsPage />} />
        <Route path="/news" element={<NewsPage />} />
        <Route path="/blog" element={<BlogPage />} />
        <Route path="/gallery" element={<GalleryPage />} />
        <Route path="/alumni" element={<AlumniPage />} />
        <Route path="/membership" element={<RegistrationPage/>} />
        <Route path="/Contact" element={<ContactPage/>} />
        
        <Route path="/event/:id" element={<EventDetailsPage />} />
        <Route path="/news/:id" element={<NewsDetailPage />} />
        <Route path="/blog/:id" element={<BlogDetailPage />} />
        <Route path="/privacy" element={<PrivacyPolicyPage />} />
        <Route path="/terms" element={<TermsOfServicePage />} />
        {/* Add more routes as needed */}
      </Routes>
    </Router>
  );
}

export default App;
