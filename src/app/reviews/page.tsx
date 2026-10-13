import { permanentRedirect } from "next/navigation";

/**
 * /reviews used to 404 (Google reported it in Search Console). There's no
 * standalone reviews page — reviews live in a section on the homepage — so
 * permanently redirect to home instead of serving a dead URL.
 */
export default function ReviewsPage() {
  permanentRedirect("/");
}
