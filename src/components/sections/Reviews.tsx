"use client";

import { useEffect, useState } from "react";
import { Star } from "lucide-react";
import { Container } from "@/components/ui/Container";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { Reveal } from "@/components/ui/Reveal";
import { Button } from "@/components/ui/Button";
import { defaultWaMessage, waLink } from "@/lib/site";
import type { ReviewsData } from "@/lib/reviews";

function Stars({ rating }: { rating: number }) {
  return (
    <div className="flex gap-0.5 text-fresh">
      {Array.from({ length: 5 }).map((_, i) => (
        <Star
          key={i}
          className={`h-4 w-4 ${i < Math.round(rating) ? "fill-current" : ""}`}
        />
      ))}
    </div>
  );
}

/**
 * Live Google reviews — fetched client-side from /api/reviews so the
 * homepage stays statically rendered for SEO. Falls back to an honest
 * placeholder until GOOGLE_PLACES_API_KEY + GOOGLE_PLACE_ID are set.
 */
export function Reviews() {
  const [data, setData] = useState<ReviewsData | null>(null);

  useEffect(() => {
    fetch("/api/reviews")
      .then((r) => r.json() as Promise<ReviewsData>)
      .then((d) => setData(d))
      .catch(() => setData(null));
  }, []);

  const hasReviews = !!data?.reviews && data.reviews.length > 0;

  return (
    <section className="bg-white py-20 md:py-28">
      <Container>
        <Reveal>
          <SectionHeading
            eyebrow="Reviews"
            title="Trusted by Homes & Businesses"
            subtitle={
              hasReviews && data
                ? `${data.rating ?? "—"}★ · ${data.reviewCount ?? ""} Google reviews`
                : "We feature genuine customer reviews. If we've worked together, we'd love your feedback."
            }
          />
        </Reveal>

        {hasReviews && data ? (
          <div className="mt-12 grid gap-6 md:grid-cols-3">
            {data.reviews.map((r, i) => (
              <div key={i} className="flex flex-col rounded-3xl border border-cool bg-ice p-6">
                <Stars rating={r.rating} />
                <p className="mt-4 flex-1 text-sm leading-relaxed text-ink">
                  &ldquo;{r.text}&rdquo;
                </p>
                <div className="mt-5 flex items-center justify-between">
                  <span className="text-sm font-semibold text-navy">{r.author}</span>
                  <span className="text-xs text-ink-muted">{r.time}</span>
                </div>
              </div>
            ))}
          </div>
        ) : data === null ? (
          // loading skeleton
          <div className="mt-12 grid gap-6 md:grid-cols-3" aria-hidden="true">
            {Array.from({ length: 3 }).map((_, i) => (
              <div key={i} className="h-44 animate-pulse rounded-3xl border border-cool bg-ice" />
            ))}
          </div>
        ) : (
          <Reveal className="mx-auto mt-10 max-w-2xl">
            <div className="rounded-3xl border border-cool bg-ice p-8 text-center">
              <div className="flex justify-center gap-1 text-fresh">
                {Array.from({ length: 5 }).map((_, i) => (
                  <Star key={i} className="h-5 w-5 fill-current" />
                ))}
              </div>
              <p className="mt-4 font-display text-lg font-bold text-navy">
                Your review could be here
              </p>
              <p className="mt-2 text-sm leading-relaxed text-ink-muted">
                Genuine Google reviews will appear here as customers share their
                experience. In the meantime, message us and we&apos;ll share examples of
                recent work.
              </p>
              <div className="mt-6 flex flex-col justify-center gap-3 sm:flex-row">
                <Button
                  href={waLink("Hi Clean UP, I'd like to see examples of your recent work.")}
                  external
                  variant="whatsapp"
                >
                  See Recent Work
                </Button>
                <Button href="/contact" variant="outline">
                  Contact Us
                </Button>
              </div>
            </div>
          </Reveal>
        )}
      </Container>
    </section>
  );
}
