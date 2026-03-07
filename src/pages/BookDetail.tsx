import { useParams, Link } from "react-router-dom";
import { useEffect } from "react";
import { getBookBySlug, books } from "@/data/books";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { ArrowLeft, BookOpen, ExternalLink, ChevronLeft, ChevronRight, FileText, User, Star, Quote } from "lucide-react";

const BookDetail = () => {
  const { slug } = useParams<{ slug: string }>();
  const book = getBookBySlug(slug || "");

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [slug]);

  if (!book) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="text-center space-y-4">
          <h1 className="font-cormorant text-4xl text-foreground">Book Not Found</h1>
          <Link to="/#bookstore">
            <Button variant="outline" className="font-cormorant">
              <ArrowLeft className="w-4 h-4 mr-2" />
              Back to Bookshelf
            </Button>
          </Link>
        </div>
      </div>
    );
  }

  const currentIndex = books.findIndex(b => b.slug === slug);
  const prevBook = currentIndex > 0 ? books[currentIndex - 1] : null;
  const nextBook = currentIndex < books.length - 1 ? books[currentIndex + 1] : null;

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      
      {/* Hero Section */}
      <section className="relative pt-32 pb-20 px-4 sm:px-6 overflow-hidden">
        {/* Background */}
        <div className="absolute inset-0 bg-gradient-to-b from-secondary/15 via-background to-background" />
        <div className="absolute top-0 left-1/4 w-96 h-96 bg-primary/8 rounded-full blur-3xl" />
        <div className="absolute bottom-0 right-1/4 w-80 h-80 bg-accent/8 rounded-full blur-3xl" />
        
        <div className="container relative z-10 mx-auto max-w-6xl">
          {/* Back link */}
          <Link 
            to="/#bookstore" 
            className="inline-flex items-center gap-2 text-muted-foreground hover:text-primary transition-colors mb-10 font-cormorant text-lg"
          >
            <ArrowLeft className="w-4 h-4" />
            Back to Bookshelf
          </Link>

          <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-start">
            {/* Book Cover */}
            <div className="relative group mx-auto lg:mx-0 max-w-md w-full">
              <div className="absolute -inset-4 bg-gradient-to-r from-primary/15 via-accent/15 to-secondary/15 rounded-2xl blur-xl opacity-50 group-hover:opacity-80 transition-opacity duration-700" />
              <div className="relative bg-card/30 backdrop-blur-sm rounded-xl p-6 border border-border/30">
                <img 
                  src={book.image} 
                  alt={`${book.title} book cover`}
                  className="w-full h-auto max-h-[600px] object-contain rounded-lg"
                />
              </div>
            </div>

            {/* Book Details */}
            <div className="space-y-8">
              <div className="space-y-4">
                <h1 className="font-cormorant text-4xl sm:text-5xl md:text-6xl font-bold text-primary leading-tight">
                  {book.title}
                </h1>
                <p className="font-cormorant text-2xl md:text-3xl italic text-foreground/70">
                  {book.subtitle}
                </p>
              </div>

              {/* Meta Info */}
              <div className="flex flex-wrap items-center gap-4 font-cormorant text-lg">
                <div className="flex items-center gap-2">
                  <User className="w-4 h-4 text-accent" />
                  <span className="text-foreground">{book.author}</span>
                </div>
                <span className="text-border">•</span>
                <div className="flex items-center gap-2">
                  <FileText className="w-4 h-4 text-accent" />
                  <span className="text-foreground/70">{book.pageCount} pages</span>
                </div>
                {book.rating > 0 && (
                  <>
                    <span className="text-border">•</span>
                    <div className="flex items-center gap-1">
                      <Star className="w-4 h-4 text-amber-400 fill-amber-400" />
                      <span className="text-foreground">{book.rating}</span>
                      <span className="text-foreground/60">({book.reviewCount} reviews)</span>
                    </div>
                  </>
                )}
              </div>
              
              {/* Genre Tags */}
              <div className="flex flex-wrap gap-2">
                {book.category.split(' • ').map((cat, index) => (
                  <span key={index} className="px-4 py-1.5 rounded-full bg-primary/10 border border-primary/20 text-primary font-cormorant text-sm">
                    {cat}
                  </span>
                ))}
              </div>

              <Separator className="bg-border/30" />

              {/* Description */}
              <div className="space-y-5">
                {book.fullDescription.split('\n\n').map((paragraph, index) => (
                  <p key={index} className="font-cormorant text-lg md:text-xl text-foreground/85 leading-relaxed">
                    {paragraph}
                  </p>
                ))}
              </div>

              {/* Formats & Pricing */}
              {/* <div className="space-y-4 pt-2">
                <h3 className="font-cormorant text-xl font-semibold text-foreground">Available Formats</h3>
                <div className="grid grid-cols-2 gap-4">
                  <div className="p-4 rounded-xl bg-muted/20 border border-border/30 text-center">
                    <p className="font-cormorant text-sm text-foreground/60 mb-1">Kindle</p>
                    <p className="font-cormorant text-2xl font-bold text-accent">${book.formats.kindle.toFixed(2)}</p>
                  </div>
                  <div className="p-4 rounded-xl bg-muted/20 border border-border/30 text-center">
                    <p className="font-cormorant text-sm text-foreground/60 mb-1">Paperback</p>
                    <p className="font-cormorant text-2xl font-bold text-accent">${book.formats.paperback.toFixed(2)}</p>
                  </div>
                </div>
              </div> */}

              {/* Buy on Amazon Button */}
              <a 
                href={book.purchaseLinks.amazon} 
                target="_blank" 
                rel="noopener noreferrer"
                className="block"
              >
                <Button 
                  size="lg" 
                  className="w-full bg-primary hover:bg-accent text-primary-foreground font-cormorant text-xl py-7 transition-all duration-300 group shadow-lg hover:shadow-xl"
                >
                  <BookOpen className="w-5 h-5 mr-3" />
                  Get the Book on Amazon
                  <ExternalLink className="w-4 h-4 ml-3 opacity-70 group-hover:opacity-100 transition-opacity" />
                </Button>
              </a>
            </div>
          </div>
        </div>
      </section>




      {/* Editorial Praise Section */}
      {book.editorialReviews && book.editorialReviews.length > 0 && (
        <section className="py-20 px-4 sm:px-6">
          <div className="container mx-auto max-w-4xl">
            <div className="text-center mb-14 space-y-4">
              <div className="flex items-center justify-center gap-4">
                <div className="h-px w-16 bg-gradient-to-r from-transparent to-accent/40" />
                <Star className="w-6 h-6 text-accent" />
                <div className="h-px w-16 bg-gradient-to-r from-accent/40 to-transparent" />
              </div>
              <h2 className="font-cormorant text-3xl md:text-4xl font-bold text-primary">
                What People Are Saying
              </h2>
            </div>

            <div className="space-y-10">
              {book.editorialReviews.map((review, index) => (
                <div
                  key={index}
                  className="relative px-2 md:px-6"
                >
                  <p className="font-cormorant text-lg md:text-xl text-foreground/85 leading-relaxed italic mb-4">
                    "{review.quote}"
                  </p>
                  <p className="font-cormorant text-base text-foreground/70 text-right">
                    — {review.author}{review.role && <>, {review.role}</>}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* Navigation to Other Books */}
      <section className="py-12 md:py-16 px-4 sm:px-6">
        <div className="container mx-auto max-w-4xl">
          <div className="flex justify-between items-center gap-4">
            {prevBook ? (
              <Link to={`/book/${prevBook.slug}`} className="group flex-1">
                <div className="flex items-center gap-3 p-4 rounded-xl hover:bg-muted/15 transition-colors">
                  <ChevronLeft className="w-5 h-5 text-muted-foreground group-hover:text-primary transition-colors flex-shrink-0" />
                  <div className="text-left min-w-0">
                    <p className="text-sm text-muted-foreground font-cormorant">Previous</p>
                    <p className="font-cormorant text-lg text-foreground group-hover:text-primary transition-colors truncate">
                      {prevBook.title}
                    </p>
                  </div>
                </div>
              </Link>
            ) : (
              <div className="flex-1" />
            )}

            {nextBook ? (
              <Link to={`/book/${nextBook.slug}`} className="group flex-1">
                <div className="flex items-center gap-3 p-4 rounded-xl hover:bg-muted/15 transition-colors justify-end">
                  <div className="text-right min-w-0">
                    <p className="text-sm text-muted-foreground font-cormorant">Next</p>
                    <p className="font-cormorant text-lg text-foreground group-hover:text-primary transition-colors truncate">
                      {nextBook.title}
                    </p>
                  </div>
                  <ChevronRight className="w-5 h-5 text-muted-foreground group-hover:text-primary transition-colors flex-shrink-0" />
                </div>
              </Link>
            ) : (
              <div className="flex-1" />
            )}
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default BookDetail;
