import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import BookShowcase from "@/components/BookShowcase";
import EditorialPraise from "@/components/EditorialPraise";
import About from "@/components/About";
import Footer from "@/components/Footer";

const Index = () => {
  return (
    <main className="min-h-screen bg-background">
      <Navbar />
      <Hero />
      <BookShowcase />
      <About />
      <EditorialPraise />
      <Footer />
    </main>
  );
};

export default Index;
