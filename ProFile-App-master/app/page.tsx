import Banner from "./components/Banner";
import Faq from "./components/Faq";
import Features from "./components/Features";
import Footer from "./components/Footer";
import Logo from "./components/Logo";
import Navbar from "./components/Navbar"
import Pricing from "./components/Pricing";
import Testimonial from "./components/Testimonial";
export default function Home() {
  return (
    <div>
      <Navbar />
      <div className=" md:px[10%] py-2">
        <Banner />
        <Logo />
        <Features />
        <Testimonial/>
        <Pricing/>
        <Faq />
        <Footer />
      </div>
      
    </div>
  );
}
