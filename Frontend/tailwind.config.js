/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],

  theme: {
    extend: {
      colors: {
        /* ---- NISRAYA brand palette ---- */
        espresso: {
          DEFAULT: "#2E1B12",
          50: "#F6F1EC",
          100: "#E7D9CC",
          200: "#C9A98C",
          300: "#A9756C",
          400: "#7A4E2E",
          500: "#5A3620",
          600: "#4A2A19",
          700: "#2E1B12",
          800: "#24150F",
          900: "#160D08",
        },

        /* Deep brown — the darker editorial ground */
        brown: "#24150F",
        cocoa: "#5C3A28",

        ivory: "#FBF6EF",
        cream: "#F5EEE4",
        sand: "#E8DCC8",
        taupe: "#B7A99A",

        /* Near-black, used for type and deep overlays */
        ink: "#15110E",

        champagne: {
          DEFAULT: "#C7A254",
          light: "#E4CE9C",
          dark: "#9C7C39",
        },

        wine: "#5E2530",
      },

      fontFamily: {
        /* Editorial high-contrast serif — headlines only */
        display: ["'Cormorant Garamond'", "Georgia", "serif"],
        /* Geometric grotesque — nav, labels, prices, body, forms */
        sans: ["Jost", "'Helvetica Neue'", "Arial", "sans-serif"],
      },

      fontSize: {
        "2xs": ["0.625rem", { lineHeight: "1rem" }],
        /* Fluid editorial display scale */
        "display-sm": ["clamp(1.75rem, 1.2rem + 2.2vw, 2.75rem)", { lineHeight: "1.1" }],
        "display-md": ["clamp(2.25rem, 1.4rem + 3.4vw, 4rem)", { lineHeight: "1.06" }],
        "display-lg": ["clamp(2.75rem, 1.5rem + 5vw, 5.5rem)", { lineHeight: "1.02" }],
        "display-xl": ["clamp(3.25rem, 1.6rem + 6.6vw, 7rem)", { lineHeight: "0.98" }],
      },

      letterSpacing: {
        widest: "0.28em",
        label: "0.22em",
        nav: "0.16em",
        wordmark: "0.34em",
      },

      transitionDuration: {
        400: "400ms",
        600: "600ms",
        800: "800ms",
        1200: "1200ms",
        1600: "1600ms",
      },

      transitionTimingFunction: {
        editorial: "cubic-bezier(0.16, 0.84, 0.24, 1)",
        silk: "cubic-bezier(0.4, 0, 0.2, 1)",
      },

      maxWidth: {
        "8xl": "1400px",
        prose: "62ch",
      },

      spacing: {
        gutter: "clamp(1.25rem, 5vw, 5rem)",
        section: "clamp(4.5rem, 10vw, 10rem)",
        "section-lg": "clamp(6rem, 14vw, 14rem)",
        /* Navbar height lives in one place (--nav-h in index.css) so h-nav,
           pt-nav and top-nav all stay in step with it. */
        nav: "var(--nav-h)",
      },

      aspectRatio: {
        portrait: "3 / 4",
        editorial: "4 / 5",
        campaign: "16 / 9",
        tall: "2 / 3",
      },

      keyframes: {
        fadeUp: {
          "0%": { opacity: "0", transform: "translateY(18px)" },
          "100%": { opacity: "1", transform: "translateY(0)" },
        },
        fadeIn: {
          "0%": { opacity: "0" },
          "100%": { opacity: "1" },
        },
        reveal: {
          "0%": { transform: "scaleX(0)" },
          "100%": { transform: "scaleX(1)" },
        },
        /* Hero: image settles in with a very slow drift */
        kenburns: {
          "0%": { transform: "scale(1.08)" },
          "100%": { transform: "scale(1)" },
        },
        lineUp: {
          "0%": { opacity: "0", transform: "translateY(100%)" },
          "100%": { opacity: "1", transform: "translateY(0)" },
        },
        scrollCue: {
          "0%": { transform: "scaleY(0)", transformOrigin: "top" },
          "45%": { transform: "scaleY(1)", transformOrigin: "top" },
          "55%": { transform: "scaleY(1)", transformOrigin: "bottom" },
          "100%": { transform: "scaleY(0)", transformOrigin: "bottom" },
        },
        spinSlow: {
          "0%": { transform: "rotate(0deg)" },
          "100%": { transform: "rotate(360deg)" },
        },
      },

      animation: {
        "fade-up": "fadeUp 800ms cubic-bezier(0.16,0.84,0.24,1) both",
        "fade-in": "fadeIn 800ms ease-out both",
        reveal: "reveal 800ms cubic-bezier(0.16,0.84,0.24,1) both",
        kenburns: "kenburns 12000ms cubic-bezier(0.16,0.84,0.24,1) both",
        "line-up": "lineUp 1000ms cubic-bezier(0.16,0.84,0.24,1) both",
        "scroll-cue": "scrollCue 2600ms ease-in-out infinite",
        "spin-slow": "spinSlow 900ms linear infinite",
      },
    },
  },

  plugins: [],
};
