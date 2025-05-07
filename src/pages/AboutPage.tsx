import AboutBenefits from "../components/about/AboutBenefits";
import AboutHero from "../components/about/AboutHero";
import FAQSection from "../components/about/FAQSection";
import Footer from "../components/layout/Footer";
import MainNav from "../components/layout/MainNav";


export default function AboutPage() {
  return (
    <>
        <MainNav />
        <AboutHero />
        <AboutBenefits />
        <FAQSection />
        <Footer />
    </>
  )
}
