module.exports = {
    purge: ["./pages/**/*.{js,ts,jsx,tsx}", "./components/**/*.{js,ts,jsx,tsx}"],
    darkMode: false, // or 'media' or 'class'
    theme: {
        extend: {
            fontFamily: {
                roboto: "Roboto",
            },
            colors: {
                main: "#181818",
                "side-main": "#212121",
                ele: "#3d3d3d",
                "light-ele": "#aaaaaa",
                "hover-ele": "rgba(255, 255, 255, 0.1)",
            },
            width: {
                "1/10": "5.5%",
                "9/10": "93.5%",
            },
            borderWidth: {
                1: "1px",
            },
        },
    },
    variants: {
        extend: {
            borderColor: ["active"],
        },
        scrollbar: ["rounded"],
    },
    plugins: [require("@tailwindcss/line-clamp"), require("tailwind-scrollbar")],
};