/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.astro"],
  darkMode: "class",
  theme: {
    extend: {
      colors: {
        transparent: "transparent",
        current: "currentColor",
        primary: {
          main: "rgb(var(--color-primary-main) / <alpha-value>)",
        },
        label: {
          blue: "rgb(var(--color-label-blue) / <alpha-value>)",
          gray: "rgb(var(--color-label-gray) / <alpha-value>)",
          yellow: "rgb(var(--color-label-yellow) / <alpha-value>)",
          orange: "rgb(var(--color-label-orange) / <alpha-value>)",
          red: "rgb(var(--color-label-red) / <alpha-value>)",
        },
        text: {
          body: "rgb(var(--color-text-body) / <alpha-value>)",
          bold: "rgb(var(--color-text-bold) / <alpha-value>)",
          heading: "rgb(var(--color-text-heading) / <alpha-value>)",
          muted: "rgb(var(--color-text-muted) / <alpha-value>)",
          code: "rgb(var(--color-text-code) / <alpha-value>)",
          link: "rgb(var(--color-text-link) / <alpha-value>)",
          selection: "rgb(var(--color-text-selection) / <alpha-value>)",
        },
        bg: {
          body: "rgb(var(--color-bg-body) / <alpha-value>)",
          code: "rgb(var(--color-bg-code) / <alpha-value>)",
          selection: "rgb(var(--color-bg-selection) / <alpha-value>)",
        },
        border: {
          code: "rgb(var(--color-border-code) / <alpha-value>)",
        },
      },
      typography: (theme) => ({
        DEFAULT: {
          css: {
            a: {
              "text-decoration": "none",
              "border-bottom": "1.25px solid rgb(var(--color-text-link))",
              color: "rgb(var(--color-text-bold))",
              "&:hover": {
                color: "rgb(var(--color-text-link))",
              },
            },
            ul: {
              "padding-left": 0,
              "list-style": "none",
            },
            "ul > li": {
              position: "relative",
              "padding-left": "1.375rem",
            },
            "ul > li::before": {
              position: "absolute",
              left: 0,
              content: '"»"',
              color: "rgb(var(--color-primary-main))",
            },
            ol: {
              "padding-left": "1.125rem",
            },
            "ol > li::marker": {
              color: "rgb(var(--color-primary-main))",
            },
            "h1, h2, h3, h4, h5": {
              color: "rgb(var(--color-text-heading))",
            },
            "code::before": {
              content: "none",
            },
            "code::after": {
              content: "none",
            },
          },
        },
        sleek: {
          css: {
            "--tw-prose-body": "rgb(var(--color-text-body))",
            "--tw-prose-headings": "rgb(var(--color-text-heading))",
            "--tw-prose-lead": "rgb(var(--color-text-body))",
            "--tw-prose-links": "rgb(var(--color-text-body))",
            "--tw-prose-bold": "rgb(var(--color-text-bold))",
            "--tw-prose-counters": "rgb(var(--color-primary-main))",
            "--tw-prose-bullets": "rgb(var(--color-primary-main))",
            "--tw-prose-hr": "rgb(var(--color-primary-main))",
            "--tw-prose-quotes": "rgb(var(--color-text-body))",
            "--tw-prose-quote-borders": "rgb(var(--color-primary-main))",
            "--tw-prose-captions": "rgb(var(--color-primary-heading))",
            "--tw-prose-quote-captions": "rgb(var(--color-primary-heading))",
            "--tw-prose-code": "rgb(var(--color-text-code))",
            "--tw-prose-pre-code": "rgb(var(--color-text-code))",
            "--tw-prose-pre-bg": "rgb(var(--color-bg-code))",
            "--tw-prose-th-borders": "rgb(var(--color-text-muted))",
            "--tw-prose-td-borders": "rgb(var(--color-text-muted))",
          },
        },
      }),
    },
  },
  plugins: [require("@tailwindcss/typography")],
};
