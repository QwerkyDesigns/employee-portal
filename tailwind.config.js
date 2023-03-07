/** @type {import('tailwindcss').Config} */
module.exports = {
    darkMode: "class",
    content: ["./src/**/*.{js,ts,jsx,tsx}"],
    theme: {
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
        },
        fontSize: {
            xs: ["0.75rem", { lineHeight: "1rem" }],
            sm: ["0.875rem", { lineHeight: "1.5rem" }],
            base: ["1rem", { lineHeight: "1.75rem" }],
            lg: ["1.125rem", { lineHeight: "2rem" }],
            xl: ["1.25rem", { lineHeight: "2rem" }],
            "2xl": ["1.5rem", { lineHeight: "2rem" }],
            "3xl": ["2rem", { lineHeight: "2.5rem" }],
            "4xl": ["2.5rem", { lineHeight: "3.5rem" }],
            "5xl": ["3rem", { lineHeight: "3.5rem" }],
            "6xl": ["3.75rem", { lineHeight: "1" }],
            "7xl": ["4.5rem", { lineHeight: "1.1" }],
            "8xl": ["6rem", { lineHeight: "1" }],
            "9xl": ["8rem", { lineHeight: "1" }],
        },
        extend: {
            borderRadius: {
                "4xl": "2rem",
            },
            fontFamily: {
                sans: ["Inter", ...defaultTheme.fontFamily.sans],
                display: ["Lexend", ...defaultTheme.fontFamily.sans],
            },
            maxWidth: {
                "2xl": "40rem",
            },
        },
    },
    plugins: [require("@tailwindcss/forms")],

    // plugins: [require("@tailwindcss/typography")],
};
