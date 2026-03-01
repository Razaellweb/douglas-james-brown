import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import BookShowcase from "@/components/BookShowcase";
import About from "@/components/About";
import FirstAppearances from "@/components/FirstAppearances";
import EditorialPraise from "@/components/EditorialPraise";
import LinerNotes from "@/components/LinerNotes";
import Footer from "@/components/Footer";
import FloatingBlurbs from "@/components/FloatingBlurbs";

const Index = () => {
  return (
    <main className="min-h-screen bg-background relative">
      <FloatingBlurbs />
      <Navbar />
      <Hero />
      <About />
      <BookShowcase />
      <FirstAppearances />
      <EditorialPraise />
      <LinerNotes />
      <Footer />
    </main>
  );
};

export default Index;
