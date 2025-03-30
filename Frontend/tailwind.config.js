/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      screens: {
        xxs: '360px', // Add the xxs breakpoint
        xs: '480px',  // Optional: Keep xs for extra small devices
      },
    },
  },
  plugins: [],
}
