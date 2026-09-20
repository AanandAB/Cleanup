import { getSecret } from "@/lib/env";
import type { GoogleReview, ReviewsData } from "@/lib/reviews";

export const dynamic = "force-dynamic";

const TTL_MS = 60 * 60 * 1000; // cache for 1 hour (Places API is metered)

let cache: { data: ReviewsData; at: number } | null = null;

/**
 * Live Google Business reviews via the Places API (New) Place Details.
 * Requires GOOGLE_PLACES_API_KEY + GOOGLE_PLACE_ID. Returns an empty,
 * `configured:false` payload until those are set, so the UI can fall back
 * gracefully instead of erroring.
 */
export async function GET() {
  if (cache && Date.now() - cache.at < TTL_MS) {
    return Response.json(cache.data);
  }

  const key = getSecret("GOOGLE_PLACES_API_KEY");
  const placeId = getSecret("GOOGLE_PLACE_ID");

  if (!key || !placeId) {
    const data: ReviewsData = {
      reviews: [],
      rating: null,
      reviewCount: null,
      configured: false,
    };
    return Response.json(data);
  }

  try {
    const url = `https://places.googleapis.com/v1/places/${placeId}?key=${key}`;
    const res = await fetch(url, {
      headers: {
        "X-Goog-FieldMask": "displayName,rating,userRatingCount,reviews",
        "X-Goog-Api-Key": key,
      },
    });

    if (!res.ok) {
      return Response.json(
        { reviews: [], rating: null, reviewCount: null, configured: true },
        { status: 502 },
      );
    }

    const json = (await res.json()) as {
      rating?: number;
      userRatingCount?: number;
      reviews?: Array<{
        rating?: number;
        text?: { text?: string };
        relativePublishTimeDescription?: string;
        authorAttribution?: { displayName?: string };
      }>;
    };

    const reviews: GoogleReview[] = (json.reviews ?? [])
      .filter((r) => r.text?.text)
      .map((r) => ({
        author: r.authorAttribution?.displayName ?? "Google user",
        rating: r.rating ?? 5,
        text: r.text!.text!,
        time: r.relativePublishTimeDescription ?? "",
      }));

    const data: ReviewsData = {
      reviews,
      rating: json.rating ?? null,
      reviewCount: json.userRatingCount ?? null,
      configured: true,
    };
    cache = { data, at: Date.now() };
    return Response.json(data);
  } catch {
    return Response.json(
      { reviews: [], rating: null, reviewCount: null, configured: true },
      { status: 502 },
    );
  }
}
