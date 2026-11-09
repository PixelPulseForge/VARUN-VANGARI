import type { Config } from "tailwindcss";

const config: Config = {
  content: ["./src/**/*.{ts,tsx}"],
  theme: {
    extend: {
      colors: {
        bg: "var(--bg)",
        line: "var(--line)",
        chip: "var(--chip)",
        muted: "var(--muted)",
        faint: "var(--faint)",
        body: "var(--body)",
        verified: "#1d9bf0",
      },
      fontFamily: {
        mono: ["'IBM Plex Mono'", "ui-monospace", "SFMono-Regular", "Menlo", "monospace"],
      },
      maxWidth: { column: "705px" },
    },
  },
  plugins: [],
};
export default config;
