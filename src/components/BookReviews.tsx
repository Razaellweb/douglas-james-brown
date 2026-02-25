import { Star, Quote, ThumbsUp, Calendar, Verified, ChevronDown, ChevronUp } from "lucide-react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { useState } from "react";

interface Review {
  id: string;
  author: string;
  rating: number;
  date: string;
  title: string;
  content: string;
  helpful: number;
  verified: boolean;
  avatar?: string;
}

interface Testimonial {
  id: string;
  author: string;
  title: string;
  quote: string;
  image?: string;
  source?: string;
}

interface BookReviewsProps {
  bookTitle: string;
  reviews?: Review[];
  testimonials?: Testimonial[];
}

// Demo data for reviews
const demoReviews: Review[] = [
  {
    id: "1",
    author: "Alexandra Mitchell",
    rating: 5,
    date: "December 15, 2025",
    title: "A masterpiece of African mythology",
    content: "Mary Lou Wells has crafted something truly extraordinary. The weaving of ancient African mythology with contemporary storytelling is seamless and captivating. I couldn't put it down. The characters are rich, the world-building is immersive, and the prose is absolutely beautiful. This is the kind of book that stays with you long after you've finished reading.",
    helpful: 127,
    verified: true,
  },
  {
    id: "2",
    author: "Marcus Thompson",
    rating: 5,
    date: "November 28, 2025",
    title: "Finally, representation done right",
    content: "As someone who grew up hearing stories from my grandmother about African deities and legends, this book felt like coming home. Wells has done her research and it shows. The respect for the source material combined with creative storytelling makes this an absolute gem.",
    helpful: 89,
    verified: true,
  },
  {
    id: "3",
    author: "Sarah Chen",
    rating: 5,
    date: "October 30, 2025",
    title: "Beautifully written and deeply moving",
    content: "The prose in this book is poetry. Every sentence is crafted with such care and intention. The story of Adaeze and her journey through the spirit world had me in tears multiple times. A must-read for anyone who loves fantasy with heart.",
    helpful: 64,
    verified: true,
  },
  {
    id: "4",
    author: "James Okonkwo",
    rating: 4,
    date: "September 15, 2025",
    title: "Epic in every sense",
    content: "A sweeping epic that spans generations and worlds. While the pacing slows in the middle, the payoff is absolutely worth it. Wells has created a universe I want to explore for years to come.",
    helpful: 42,
    verified: true,
  },
];

// Demo data for influencer testimonials
const demoTestimonials: Testimonial[] = [
  {
    id: "1",
    author: "Dr. Chimamanda Adichie",
    title: "Award-Winning Author",
    quote: "A breathtaking journey into the heart of African mythology. Wells has created a world that feels both ancient and urgently contemporary. This is storytelling at its finest.",
    image: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=100&h=100&fit=crop&crop=face",
  },
  {
    id: "2",
    author: "Oprah Winfrey",
    title: "Media Executive & Philanthropist",
    quote: "I was completely transported. This book reminds us of the power of our ancestors' stories and why they must be told. An absolute masterpiece.",
    image: "https://images.unsplash.com/photo-1580489944761-15a19d654956?w=100&h=100&fit=crop&crop=face",
  },
  {
    id: "3",
    author: "Neil Gaiman",
    title: "Bestselling Fantasy Author",
    quote: "Mary Lou Wells writes with the confidence of a master storyteller. The mythology is rich, the characters unforgettable, and the prose magnificent.",
    image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&h=100&fit=crop&crop=face",
  },
];

const StarRating = ({ rating }: { rating: number }) => {
  return (
    <div className="flex items-center gap-1">
      {[...Array(5)].map((_, i) => (
        <Star
          key={i}
          className={`w-4 h-4 ${
            i < rating
              ? "text-amber-400 fill-amber-400"
              : "text-muted-foreground"
          }`}
        />
      ))}
    </div>
  );
};

const BookReviews = ({ bookTitle, reviews = demoReviews, testimonials = demoTestimonials }: BookReviewsProps) => {
  const [showAllReviews, setShowAllReviews] = useState(false);
  const displayedReviews = showAllReviews ? reviews : reviews.slice(0, 3);

  const averageRating = reviews.reduce((acc, r) => acc + r.rating, 0) / reviews.length;
  const ratingDistribution = [5, 4, 3, 2, 1].map(star => ({
    star,
    count: reviews.filter(r => r.rating === star).length,
    percentage: (reviews.filter(r => r.rating === star).length / reviews.length) * 100,
  }));

  return (
    <section className="py-16 md:py-24 px-4 sm:px-6 bg-gradient-to-b from-background via-muted/5 to-background">
      <div className="container mx-auto max-w-6xl">
        {/* Section Header */}
        <div className="text-center mb-16 space-y-4">
          <div className="flex items-center justify-center gap-4">
            <div className="h-px w-16 bg-gradient-to-r from-transparent to-accent" />
            <Quote className="w-8 h-8 text-accent" />
            <div className="h-px w-16 bg-gradient-to-r from-accent to-transparent" />
          </div>
          <h2 className="font-cinzel text-4xl md:text-5xl font-bold text-foreground">
            What Readers Are Saying
          </h2>
          <p className="font-cormorant text-xl text-muted-foreground italic max-w-2xl mx-auto">
            Join thousands of readers who have been captivated by {bookTitle}
          </p>
        </div>

        {/* Influencer Testimonials */}
        <div className="mb-20">
          <h3 className="font-cinzel text-2xl font-bold text-center text-foreground mb-8">
            Featured Reviews
          </h3>
          <div className="grid md:grid-cols-3 gap-6">
            {testimonials.map((testimonial, index) => (
              <Card 
                key={testimonial.id}
                className="relative p-8 bg-gradient-to-br from-card via-card to-secondary/10 border-accent/20 shadow-deep group hover:shadow-glow transition-all duration-500"
                style={{ animationDelay: `${index * 150}ms` }}
              >
                {/* Decorative quote mark */}
                <div className="absolute top-4 right-4 text-accent/20">
                  <Quote className="w-12 h-12" />
                </div>
                
                <div className="relative z-10 space-y-6">
                  <p className="font-cormorant text-lg text-foreground/90 leading-relaxed italic">
                    "{testimonial.quote}"
                  </p>
                  
                  <div className="flex items-center gap-4">
                    {testimonial.image && (
                      <div className="relative">
                        <div className="absolute -inset-1 bg-gradient-peacock rounded-full blur-sm opacity-60" />
                        <img 
                          src={testimonial.image} 
                          alt={testimonial.author}
                          className="relative w-12 h-12 rounded-full object-cover border-2 border-accent/50"
                        />
                      </div>
                    )}
                    <div>
                      <p className="font-cinzel font-bold text-foreground">
                        {testimonial.author}
                      </p>
                      <p className="font-cormorant text-sm text-accent">
                        {testimonial.title}
                      </p>
                    </div>
                  </div>
                </div>

                {/* Decorative corner */}
                <div className="absolute bottom-0 left-0 w-16 h-16 border-l-2 border-b-2 border-accent/20 rounded-bl-xl" />
              </Card>
            ))}
          </div>
        </div>

        <Separator className="bg-border/30 mb-16" />

        {/* Rating Overview */}
        <div className="grid md:grid-cols-3 gap-8 mb-12">
          {/* Overall Rating */}
          <Card className="p-8 bg-card/50 border-border/30 text-center">
            <div className="space-y-4">
              <p className="font-cinzel text-6xl font-bold text-accent">
                {averageRating.toFixed(1)}
              </p>
              <StarRating rating={Math.round(averageRating)} />
              <p className="font-cormorant text-muted-foreground">
                Based on {reviews.length} reviews
              </p>
            </div>
          </Card>

          {/* Rating Distribution */}
          <Card className="p-8 bg-card/50 border-border/30 md:col-span-2">
            <div className="space-y-3">
              {ratingDistribution.map(({ star, count, percentage }) => (
                <div key={star} className="flex items-center gap-3">
                  <span className="font-cormorant text-sm text-muted-foreground w-8">
                    {star} ★
                  </span>
                  <div className="flex-1 h-3 bg-muted/30 rounded-full overflow-hidden">
                    <div 
                      className="h-full bg-gradient-peacock rounded-full transition-all duration-500"
                      style={{ width: `${percentage}%` }}
                    />
                  </div>
                  <span className="font-cormorant text-sm text-muted-foreground w-12 text-right">
                    {count}
                  </span>
                </div>
              ))}
            </div>
          </Card>
        </div>

        {/* Reader Reviews */}
        <div className="space-y-6">
          <h3 className="font-cinzel text-2xl font-bold text-foreground">
            Reader Reviews
          </h3>
          
          {displayedReviews.map((review, index) => (
            <Card 
              key={review.id}
              className="p-6 md:p-8 bg-card/30 border-border/30 hover:border-accent/30 transition-colors"
            >
              <div className="space-y-4">
                {/* Review Header */}
                <div className="flex flex-wrap items-start justify-between gap-4">
                  <div className="flex items-center gap-4">
                    <div className="w-12 h-12 rounded-full bg-gradient-peacock flex items-center justify-center">
                      <span className="font-cinzel text-lg font-bold text-primary-foreground">
                        {review.author.charAt(0)}
                      </span>
                    </div>
                    <div>
                      <div className="flex items-center gap-2">
                        <p className="font-cinzel font-bold text-foreground">
                          {review.author}
                        </p>
                        {review.verified && (
                          <span className="flex items-center gap-1 px-2 py-0.5 rounded-full bg-primary/20 text-primary text-xs font-cormorant">
                            <Verified className="w-3 h-3" />
                            Verified
                          </span>
                        )}
                      </div>
                      <div className="flex items-center gap-2 text-muted-foreground">
                        <StarRating rating={review.rating} />
                        <span className="text-border">•</span>
                        <span className="font-cormorant text-sm flex items-center gap-1">
                          <Calendar className="w-3 h-3" />
                          {review.date}
                        </span>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Review Content */}
                <div>
                  <h4 className="font-cinzel font-bold text-lg text-foreground mb-2">
                    {review.title}
                  </h4>
                  <p className="font-cormorant text-foreground/80 leading-relaxed">
                    {review.content}
                  </p>
                </div>

                {/* Review Footer */}
                <div className="flex items-center gap-4 pt-4 border-t border-border/30">
                  <Button variant="ghost" size="sm" className="text-muted-foreground hover:text-primary font-cormorant">
                    <ThumbsUp className="w-4 h-4 mr-2" />
                    Helpful ({review.helpful})
                  </Button>
                </div>
              </div>
            </Card>
          ))}

          {/* Show More Button */}
          {reviews.length > 3 && (
            <div className="text-center pt-6">
              <Button
                variant="outline"
                onClick={() => setShowAllReviews(!showAllReviews)}
                className="font-cinzel border-accent/30 hover:bg-accent/10 hover:border-accent"
              >
                {showAllReviews ? (
                  <>
                    <ChevronUp className="w-4 h-4 mr-2" />
                    Show Less
                  </>
                ) : (
                  <>
                    <ChevronDown className="w-4 h-4 mr-2" />
                    Show All Reviews ({reviews.length})
                  </>
                )}
              </Button>
            </div>
          )}
        </div>
      </div>
    </section>
  );
};

export default BookReviews;
