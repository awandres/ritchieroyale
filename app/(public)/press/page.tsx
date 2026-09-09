import type { Metadata } from "next";

import { siteConfig } from "@/lib/site";

export const metadata: Metadata = {
  title: `${siteConfig.name} - Press`,
};

export default function PressPage() {
  return (
    <article className="post featured bio">
      <h1>About the Band</h1>

      <ul className="epk-social icons">
        {siteConfig.social.map((item) => (
          <li key={item.label}>
            <a
              href={item.href}
              target="_blank"
              rel="noreferrer"
              className={`icon brands ${item.icon}`}
            >
              <span className="label">{item.label}</span>
            </a>
          </li>
        ))}
      </ul>

      <div className="row gtr-50">
        {siteConfig.pressPhoto && (
          <div className="col-5 col-12-medium">
            <span className="image fit">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src={siteConfig.pressPhoto} alt={`${siteConfig.name} band photo`} />
            </span>
          </div>
        )}
        <div
          className={siteConfig.pressPhoto ? "col-7 col-12-medium" : "col-12"}
          style={{ textAlign: "left" }}
        >
          {siteConfig.bio.map((paragraph) => (
            <p key={paragraph}>{paragraph}</p>
          ))}
        </div>
      </div>

      <hr className="break" />

      <h2>Press Inquiries</h2>
      <p>
        For press inquiries, interviews, or booking information, contact{" "}
        <a href={`mailto:${siteConfig.email}`}>{siteConfig.email}</a>.
      </p>

      <h2>Assets</h2>
      <p>High-resolution photos, logos, and press materials coming soon.</p>
    </article>
  );
}
