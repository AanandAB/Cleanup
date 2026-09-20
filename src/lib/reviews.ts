export interface GoogleReview {
  author: string;
  rating: number;
  text: string;
  time: string;
}

export interface ReviewsData {
  reviews: GoogleReview[];
  rating: number | null;
  reviewCount: number | null;
  /** false until GOOGLE_PLACES_API_KEY + GOOGLE_PLACE_ID are configured. */
  configured: boolean;
}
