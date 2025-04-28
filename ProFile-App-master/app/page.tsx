import Banner from "./components/home_components/Banner";
import Faq from "./components/home_components/Faq";
import Features from "./components/home_components/Features";
import Footer from "./components/home_components/Footer";
import Logo from "./components/home_components/Logo";
import Navbar from "./components/Navbar"
import Pricing from "./components/home_components/Pricing";
import Testimonial from "./components/home_components/Testimonial";
export default function Home() {
  
  return (
    <div>
      <Navbar />
      <div className=" md:px[10%] py-2">
        <Banner />
        <Logo />
        <Features />
        <Testimonial />
        <Pricing />
        <Faq />
        <Footer />
      </div>

    </div>
  );
}
