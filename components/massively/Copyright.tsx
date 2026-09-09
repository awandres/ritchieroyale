import { siteConfig } from "@/lib/site";

export default function Copyright() {
  return (
    <div id="copyright">
      <ul>
        <li>
          &copy; {new Date().getFullYear()} {siteConfig.name}
        </li>
        <li>Design by Alex Wandres</li>
      </ul>
    </div>
  );
}
