import TopNav from "..//components/layout/TopNav";
import MainNav from "../components/layout/MainNav";
import NoticeBar from "../components/layout/NoticeBar";
import Carousel from "../components/home/Carousel";
import WelcomeSection from "../components/home/WelcomeSection";
import AboutSection from "../components/home/AboutSection";
import MembershipBenefitsSection from "../components/home/MembershipBenefitsSection";
import RecentBlogSection from "../components/home/RecentBlogSection";
import EventsSection from "../components/home/EventsSection";
import RecentNewsSection from "../components/home/RecentNewsSection";
import PresidentMessageSection from "../components/home/PresidentMessageSection";
import Footer from "../components/layout/Footer";

export default function HomePage() {
  return (
    <div>
      <TopNav />
      <MainNav />
      <NoticeBar />
      <Carousel />
      <WelcomeSection />
      <AboutSection />
      <MembershipBenefitsSection />
      <RecentBlogSection />
      <EventsSection />
      <RecentNewsSection />
      <PresidentMessageSection />
      <Footer />
    </div>
  );
}
