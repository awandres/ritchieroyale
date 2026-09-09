/**
 * Content for the public site. Editing this file is enough to change the nav,
 * social links, contact details and show listings without touching markup.
 */

export type SocialLink = {
  label: string;
  href: string;
  /** Font Awesome brand class, e.g. "fa-instagram". */
  icon: string;
};

export type Show = {
  /** Free-form so "6/29 - Saturday" style entries work. */
  date: string;
  venue: string;
  location: string;
  /** Support acts, one line each. */
  support?: string[];
  ticketUrl?: string;
};

export const siteConfig = {
  name: "Ritchie Royale",
  tagline: "Rock N' Roll Revue",
  description:
    "Ritchie Royale's Rock N' Roll Revue - coming soon to a town near you.",
  email: "alex.r.wandres@gmail.com",

  /** Site logo, shown in the header. Square crop of the double-R pin. */
  logo: {
    src: "/images/logo-double-r.jpg",
    width: 900,
    height: 900,
  },

  /** Debut single artwork and its streaming link. */
  single: {
    title: "Don't Wait",
    artwork: "/images/debut-single.jpg",
    artworkWidth: 1080,
    artworkHeight: 1080,
    /** Spotify track ID for the embedded player. */
    spotifyTrackId: "2nkoYA4paGa0P3nWHfNd14",
  },

  /** Press-kit biography, one entry per paragraph. */
  bio: [
    "Ritchie Royale's Rock N' Roll Revue - coming soon to a town near you.",
  ],

  /** Portrait shown beside the bio on the press page. */
  pressPhoto: "",

  nav: [
    { href: "/", label: "Overview" },
    { href: "/music", label: "Music" },
    { href: "/shows", label: "Shows" },
    { href: "/photos", label: "Photos" },
    { href: "/press", label: "Press" },
    { href: "/shop", label: "Shop" },
  ],

  social: [
    {
      label: "Spotify",
      href: "https://open.spotify.com/artist/63vAEGHUxuAZyBsSWvpSHq",
      icon: "fa-spotify",
    },
    {
      label: "Apple Music",
      href: "https://music.apple.com/us/artist/ritchie-royale/6808670519",
      icon: "fa-itunes-note",
    },
    {
      label: "Instagram",
      href: "https://www.instagram.com/ritchieroyale/",
      icon: "fa-instagram",
    },
  ] satisfies SocialLink[],

  /**
   * Spotify artist ID for the embedded player. Leave empty to hide the embed.
   * Found in the artist URL: open.spotify.com/artist/<id>
   */
  spotifyArtistId: "",

  /** YouTube video ID for the featured video. Leave empty to hide it. */
  featuredVideoId: "",
  featuredVideoTitle: "",

  /**
   * Web3Forms access key, same service the Milestones site used for its
   * contact form. Set NEXT_PUBLIC_WEB3FORMS_KEY to enable submissions.
   */
  contactFormKey: process.env.NEXT_PUBLIC_WEB3FORMS_KEY ?? "",

  upcomingShows: [] satisfies Show[],
};

export type Album = {
  title: string;
  subtitle: string;
  /** Path under public/, e.g. "/images/album-art.jpg". */
  art: string;
  /** Spotify album ID for the embed. */
  spotifyAlbumId?: string;
};

export const albums: Album[] = [];
