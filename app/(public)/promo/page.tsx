import type { Metadata } from "next";

import PromoIntakeForm from "@/components/massively/PromoIntakeForm";
import YouTubeEmbed from "@/components/massively/YouTubeEmbed";
import { siteConfig } from "@/lib/site";

const { promoVideo } = siteConfig;

/** Shared by link only, so it is kept out of the nav and out of search. */
export const metadata: Metadata = {
  title: `${siteConfig.name} - ${promoVideo.title}`,
  robots: { index: false, follow: false },
};

export default function PromoPage() {
  return (
    <article className="post featured text-center">
      <header className="major">
        <h1>{promoVideo.title}</h1>
        <p>The next single from {siteConfig.name}. Coming soon.</p>
      </header>

      <div className="rr-promo-video">
        <YouTubeEmbed videoId={promoVideo.id} vertical={promoVideo.vertical} />
      </div>

      <hr className="break" />

      <h2>Get {promoVideo.title} First</h2>
      <p>
        Leave your details and we&apos;ll let you know the moment it drops, plus
        when the Revue is headed to your town.
      </p>
      <PromoIntakeForm songTitle={promoVideo.title} />
    </article>
  );
}
