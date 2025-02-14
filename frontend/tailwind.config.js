/** @type {import('tailwindcss').Config} */
export default {
    content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"], // Đảm bảo Tailwind quét file đúng
    theme: {
      extend: {
        fontFamily: {
          sans: ["Poppins", "sans-serif"], // Font chính
          serif: ["Merriweather", "serif"], // Font phụ
        },
      },
    },
    plugins: [],
  };
  