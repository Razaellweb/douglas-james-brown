import { useEffect, useState } from "react";
import { Maximize2, X } from "lucide-react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

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
import doug11 from "../assets/doug/doug11.jpg";
import doug12 from "../assets/doug/doug12.jpg";
import doug13 from "../assets/doug/doug13.jpg";
import doug14 from "../assets/doug/doug14.jpg";

const photos = [
  { src: doug1, alt: "Doug Brown Recent Photo 1" },
  { src: doug2, alt: "Doug Brown Recent Photo 2" },
  { src: doug3, alt: "Doug Brown Recent Photo 3" },
  { src: doug4, alt: "Doug Brown Photo 4" },
  { src: doug5, alt: "Doug Brown Photo 5" },
  { src: doug6, alt: "Doug Brown Photo 6" },
  { src: doug11, alt: "Doug Brown Photo 11" },
  { src: doug12, alt: "Doug Brown Photo 12" },
  { src: doug14, alt: "Doug Brown Photo 14" },
  { src: doug13, alt: "Doug Brown Photo 13" },
  { src: doug7, alt: "Doug Brown Photo 7" },
  { src: doug8, alt: "Doug Brown Photo 8" },
  { src: doug9, alt: "Doug Brown Photo 9" },
  { src: doug10, alt: "Doug Brown Earliest Photo" },
];

// Split into 3 columns for a true masonry layout
const splitIntoColumns = (items: typeof photos, colCount: number) => {
  const cols: (typeof photos)[] = Array.from({ length: colCount }, () => []);
  items.forEach((item, i) => cols[i % colCount].push(item));
  return cols;
};

const Gallery = () => {
  const [selectedImage, setSelectedImage] = useState<string | null>(null);
  const [columns, setColumns] = useState(3);

  useEffect(() => {
    window.scrollTo(0, 0);

    const updateColumns = () => {
      if (window.innerWidth < 640) setColumns(1);
      else if (window.innerWidth < 1024) setColumns(2);
      else setColumns(3);
    };

    updateColumns();
    window.addEventListener("resize", updateColumns);
    return () => window.removeEventListener("resize", updateColumns);
  }, []);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") setSelectedImage(null);
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, []);

  const cols = splitIntoColumns(photos, columns);

  return (
    <div className="min-h-screen bg-background relative overflow-hidden flex flex-col">
      <Navbar />

      {/* Background Ambience */}
      <div className="fixed inset-0 pointer-events-none">
        <div className="absolute top-0 right-0 w-[50vw] h-[50vh] bg-accent/5 rounded-full blur-[100px] opacity-50" />
        <div className="absolute bottom-0 left-0 w-[50vw] h-[50vh] bg-primary/5 rounded-full blur-[100px] opacity-50" />
        <div className="absolute inset-0 bg-noise opacity-[0.03]" />
      </div>

      <div className="container relative z-10 max-w-6xl mx-auto px-6 flex-1 pt-32 pb-20">
        {/* True masonry — CSS columns, images retain natural aspect ratio */}
        <div
          className="gap-4"
          style={{
            columnCount: columns,
            columnGap: "1rem",
          }}
        >
          {photos.map((photo, index) => (
            <div
              key={index}
              className="group relative rounded-xl overflow-hidden cursor-pointer mb-4 border border-border/50 bg-muted/20 break-inside-avoid animate-fade-in"
              style={{ animationDelay: `${index * 80}ms` }}
              onClick={() => setSelectedImage(photo.src)}
            >
              <div className="absolute inset-0 bg-primary/20 opacity-0 group-hover:opacity-100 transition-opacity duration-500 z-10 flex items-center justify-center backdrop-blur-[2px]">
                <Maximize2 className="text-primary-foreground w-8 h-8 drop-shadow-md" />
              </div>
              <img
                src={photo.src}
                alt={photo.alt}
                className="w-full h-auto block transition-transform duration-700 group-hover:scale-105"
                loading={index < 6 ? "eager" : "lazy"}
              />
            </div>
          ))}
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