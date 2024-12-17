import daisyui from "daisyui";

/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      keyframes: {
        fadeIn: {
          "0%": { opacity: "0" },
          "100%": { opacity: "1" },
        },
        scrollDown: {
          "0%": { transform: "translateY(0)" },
          "75%": { transform: "translateY(6px)", opacity: "0" },
          "76%": { transform: "translateY(-6px)", opacity: "0" },
          "100%": { transform: "translateY(0)", opacity: "1" },
        },
        "slide-left": {
          "0%": { transform: "translateX(-10px)", opacity: "0" },
          "100%": { transform: "translateX(0)", opacity: "1" },
        },
        "slide-in-top": {
          "0%": { transform: "translateY(-30px)", opacity: "1" },
          "100%": { transform: "translateY(0) rotate(-90deg)", opacity: "1" },
        },
        "text-shimmer": {
          "0%": { backgroundPosition: "200% 50%" },
          "100%": { backgroundPosition: "-200% 50%" },
        },
      },
      animation: {
        "fade-in": "fadeIn 1s ease-out",
        "scroll-down": "scrollDown 2s infinite",
        "slide-left": "slide-left 1s cubic-bezier(0.25, 0.46, 0.45, 0.94) both",
        "slide-in-top":
          "slide-in-top 1.2s cubic-bezier(0.25, 0.46, 0.45, 0.94) both",
        "text-shimmer": "text-shimmer 2s linear infinite",
      },
    },
  },
  variants: {
    extend: {
      animation: ["group-hover"],
    },
  },
  plugins: [
    daisyui,
    function ({ addUtilities }) {
      const newUtilities = {
        ".bg-clip-text": {
          "background-clip": "text",
        },
        ".text-transparent": {
          color: "transparent",
        },
      };
      addUtilities(newUtilities);
    },
  ],
  daisyui: {
    themes: ["default", "light"],
  },
};
