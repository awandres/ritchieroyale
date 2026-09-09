import { siteConfig } from "@/lib/site";
import ScrollyLink from "./ScrollyLink";

/**
 * Full-height splash on the overview page. Must be the immediate previous
 * sibling of #header — main.css uses `#intro + #header` to hand the logo
 * reveal over as the intro fades.
 */
export default function Intro() {
  return (
    <div id="intro">
      <h1>{siteConfig.name}</h1>
      <p>{siteConfig.tagline}</p>
      <ul className="actions">
        <li>
          <ScrollyLink
            href="#header"
            className="button icon solid solo fa-arrow-down"
          >
            Continue
          </ScrollyLink>
        </li>
      </ul>
    </div>
  );
}
