import { siteConfig } from "@/lib/site";
import ContactForm from "./ContactForm";

export default function Footer() {
  return (
    <footer id="footer">
      <section>
        <ContactForm />
      </section>
      <section className="split contact">
        <section>
          <h3>Email</h3>
          <p>
            <a href={`mailto:${siteConfig.email}`}>{siteConfig.email}</a>
          </p>
        </section>
        <section>
          <h3>Social</h3>
          <ul className="icons alt">
            {siteConfig.social.map((item) => (
              <li key={item.label}>
                <a
                  href={item.href}
                  target="_blank"
                  rel="noreferrer"
                  className={`icon brands alt ${item.icon}`}
                >
                  <span className="label">{item.label}</span>
                </a>
              </li>
            ))}
          </ul>
        </section>
      </section>
    </footer>
  );
}
