// Place any global data in this file.
// You can import this data from anywhere in your site by using the `import` keyword.

export const SITE_TITLE = "Dinesh Pandiyan";
export const SITE_DESCRIPTION =
  "Learn about modern web development and web performance. HTML, CSS, JavaScript, React, Astro, Next.js, Remix and more.";
export const TWITTER_HANDLE = "@flexdinesh";
export const MY_NAME = "Dinesh Pandiyan";

// setup in astro.config.mjs
const BASE_URL = new URL(import.meta.env.SITE);
export const SITE_URL = BASE_URL.origin;
