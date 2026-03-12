import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { ArrowLeft, Maximize2, X } from "lucide-react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

// Import all 10 images directly
import doug1 from "../assets/doug/doug1.jpg";
import doug2 from "../assets/doug/doug2.jpg";
import doug3 from "../assets/doug/doug3.jpg";
import doug4 from "../assets/doug/doug4.jpg";
import doug5 from "../assets/doug/doug5.jpg";
import doug6 from "../assets/doug/doug6.jpg";
import doug7 from "../assets/doug/doug7.jpg";
import doug8 from "../assets/doug/doug8.jpg";
import doug9 from "../assets/doug/doug9.jpg";
import doug10 from "../assets/doug/doug10.jpg";

const photos = [
  { src: doug1, alt: "Doug Brown Recent Photo 1" },
  { src: doug2, alt: "Doug Brown Recent Photo 2" },
  { src: doug3, alt: "Doug Brown Recent Photo 3" },
  { src: doug4, alt: "Doug Brown Photo 4" },
  { src: doug5, alt: "Doug Brown Photo 5" },
  { src: doug6, alt: "Doug Brown Photo 6" },
  { src: doug7, alt: "Doug Brown Photo 7" },
  { src: doug8, alt: "Doug Brown Photo 8" },
  { src: doug9, alt: "Doug Brown Photo 9" },
  { src: doug10, alt: "Doug Brown Earliest Photo" },
];

const Gallery = () => {
  const [selectedImage, setSelectedImage] = useState<string | null>(null);

  useEffect(() => {
    // Scroll to top when page mounts
    window.scrollTo(0, 0);
  }, []);

  // Handle keyboard events for modal
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape" && selectedImage) {
        setSelectedImage(null);
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [selectedImage]);

  return (
    <div className="min-h-screen bg-background relative overflow-hidden flex flex-col pt-0 pb-0">
      <Navbar />
      {/* Background Ambience */}
      <div className="fixed inset-0 pointer-events-none">
        <div className="absolute top-0 right-0 w-[50vw] h-[50vh] bg-accent/5 rounded-full blur-[100px] opacity-50" />
        <div className="absolute bottom-0 left-0 w-[50vw] h-[50vh] bg-primary/5 rounded-full blur-[100px] opacity-50" />
        <div className="absolute inset-0 bg-noise opacity-[0.03]" />
      </div>

      <div className="container relative z-10 max-w-7xl mx-auto px-6 flex-1 pt-32 pb-20">
        {/* Gallery Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 md:gap-6 auto-rows-auto">
          {photos.map((photo, index) => {
            // Determine sizing for masonry-like effect
            const isLarge = index === 0;
            const isWide = index === 3 || index === 7;
            const isTall = index === 5 || index === 8;

            return (
              <div 
                key={index}
                className={`
                  group relative rounded-xl overflow-hidden cursor-pointer bg-muted/20 border border-border/50
                  animate-fade-in
                  ${isLarge ? 'md:col-span-2 md:row-span-2' : ''}
                  ${isWide ? 'md:col-span-2' : ''}
                  ${isTall ? 'md:row-span-2' : ''}
                `}
                style={{ animationDelay: `${index * 100}ms` }}
                onClick={() => setSelectedImage(photo.src)}
              >
                <div className="absolute inset-0 bg-primary/20 opacity-0 group-hover:opacity-100 transition-opacity duration-500 z-10 flex items-center justify-center backdrop-blur-[2px]">
                  <Maximize2 className="text-primary-foreground w-8 h-8 drop-shadow-md" />
                </div>
                <img 
                  src={photo.src} 
                  alt={photo.alt}
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                  loading={index < 4 ? "eager" : "lazy"}
                />
              </div>
            );
          })}
        </div>
      </div>

      {/* Lightbox Modal */}
      {selectedImage && (
        <div 
          className="fixed inset-0 z-50 flex items-center justify-center bg-background/95 backdrop-blur-md p-4 animate-fade-in"
          onClick={() => setSelectedImage(null)}
        >
          <div className="absolute top-6 right-6 z-50">
            <button 
              className="p-2 rounded-full bg-accent/20 text-accent hover:bg-accent/40 transition-colors"
              onClick={() => setSelectedImage(null)}
            >
              <X className="w-6 h-6" />
            </button>
          </div>
          
          <div 
            className="relative max-w-5xl max-h-[90vh] w-full h-full flex items-center justify-center p-4 animate-scale-in"
            onClick={(e) => e.stopPropagation()}
          >
            <img 
              src={selectedImage} 
              alt="Expanded author photo"
              className="max-w-full max-h-full object-contain rounded-lg shadow-2xl ring-1 ring-border/50"
            />
          </div>
        </div>
      )}
      
      <Footer />
    </div>
  );
};

export default Gallery;
