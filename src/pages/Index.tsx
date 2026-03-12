import { useEffect } from "react";
import { useLocation } from "react-router-dom";
import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import BookShowcase from "@/components/BookShowcase";
import About from "@/components/About";
import FirstAppearances from "@/components/FirstAppearances";
import EditorialPraise from "@/components/EditorialPraise";
import LinerNotes from "@/components/LinerNotes";
import Footer from "@/components/Footer";

const Index = () => {
  const location = useLocation();

  useEffect(() => {
    if (location.hash) {
      const element = document.querySelector(location.hash);
      if (element) {
        setTimeout(() => {
          element.scrollIntoView({ behavior: "smooth" });
        }, 100);
      }
    }
  }, [location]);

  return (
    <main className="min-h-screen bg-background relative">
      <Navbar />
      {/* <Hero /> */}
      <BookShowcase />
      <FirstAppearances />
      <EditorialPraise />
      <LinerNotes />
      <About />
      <Footer />
    </main>
  );
};

export default Index;
