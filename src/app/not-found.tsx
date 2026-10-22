import { SiteLink } from "@/components/site-link";

export default function NotFound() {
  return (
    <div className="wrap not-found">
      <p className="kicker">404</p>
      <h1>That page is not here</h1>
      <p>The link might be out of date.</p>
      <SiteLink className="btn btn-lime" href="/">
        Back home
      </SiteLink>
    </div>
  );
}
