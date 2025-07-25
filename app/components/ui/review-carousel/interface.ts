export interface Testimonial {
  quote: string;
  author: string;
  location: string;
  rating?: number;
}

export interface ReviewCarouselProps {
  className?: string;
  testimonials: Testimonial[];
}
