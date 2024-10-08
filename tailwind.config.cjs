const fontFallbacks = ["ui-sans-serif", "system-ui", "-apple-system", "BlinkMacSystemFont", "Segoe UI", "Roboto", "Helvetica Neue", "Arial", "Noto Sans", "sans-serif", "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol", "Noto Color Emoji"]

/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.astro"],
  darkMode: "class",
  theme: {
    extend: {
      fontFamily: {
        body: ["Inter", ...fontFallbacks],
        heading: ["Inter", ...fontFallbacks],
      },
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
              "text-decoration": "underline",
              // "border-bottom": "1.75px solid rgb(var(--color-text-link))",
              // color: "rgb(var(--color-text-bold))",
              color: "rgb(var(--color-text-link))",
              "&:hover": {
                "text-decoration": "none",
                color: "rgb(var(--color-text-link))",
              },
            },
            "h1, h2, h3, h4, h5": {
              color: "rgb(var(--color-text-heading))",
            },
            "h1, h2": {
              "font-weight": "800",
            },
            "h3, h4, h5": {
              "font-weight": "700",
            },
            "code::before": {
              content: "none",
            },
            "code::after": {
              content: "none",
            },
            blockquote: {
              border: "none",
              position: "relative",
              width: "96%",
              margin: "0 auto",
              color: "rgb(var(--color-text-muted))",
              "font-size": "1.125em",
              "padding-top": "1.5rem",
              "padding-bottom": "0.5rem",
              "padding-left": "1.5rem",
              "padding-right": "1.5rem",
            },
            "blockquote::before": {
              "font-family": "Arial",
              content: "'“'",
              "font-size": "4em",
              color: "rgb(var(--color-text-primary))",
              position: "absolute",
              left: "-10px",
              top: "-10px",
            },
            "blockquote::after": {
              content: "",
            },
            "blockquote p:first-of-type::before": {
              content: "",
            },
            "blockquote p:last-of-type::after": {
              content: "",
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
            "--tw-prose-counters": "rgb(var(--color-primary-muted))",
            "--tw-prose-bullets": "rgb(var(--color-primary-muted))",
            "--tw-prose-hr": "rgb(var(--color-primary-muted))",
            "--tw-prose-quotes": "rgb(var(--color-text-muted))",
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
