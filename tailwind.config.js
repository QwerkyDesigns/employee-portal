/** @type {import('tailwindcss').Config} */
module.exports = {
    darkMode: "class",
    content: ["./src/**/*.{js,ts,jsx,tsx}"],
    theme: {
        extend: {
            colors: {
                primary: "#059DC0",
                secondary: "#6AF2F0",
                background: "#04ECF0",
                success: "#04ECF0",
                text: "black",
                "primary-dark": "#DE639A",
                "secondary-dark": "#7F2982",
                "background-dark": "#F7B2B7",
                "success-dark": "#F7717D",
                "text-dark": "white",
            }
        }
    },
    plugins: [],
    // plugins: [require("@tailwindcss/typography")],
};
