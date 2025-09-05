/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      backgroundImage: {
        "bg-gradient": "linear-gradient(135deg, #fbeae3, #f8d7cc)",
        "auth-background": "url('./src/assets/backgrounds/authbg.png')",
      },
    },
  },
  plugins: [],
};
