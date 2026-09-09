import type { Metadata } from "next";

import PhotoGrid from "@/components/massively/PhotoGrid";
import { getPhotos, PHOTOS_PUBLIC_PATH } from "@/lib/photos";
import { siteConfig } from "@/lib/site";

export const metadata: Metadata = {
  title: `${siteConfig.name} - Photos`,
};

export default function PhotosPage() {
  const photos = getPhotos(siteConfig.name);

  return (
    <section className="post photos">
      <h1>Photos</h1>

      {photos.length === 0 ? (
        <p>
          Photos coming soon. To add them, drop image files into{" "}
          <code>public{PHOTOS_PUBLIC_PATH}</code> and they will appear here
          automatically.
        </p>
      ) : (
        <PhotoGrid photos={photos} />
      )}
    </section>
  );
}
