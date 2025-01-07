/** @type {import("tailwindcss").Config} */
export default {
  content: ["./src/**/*.{html,js,jsx,ts,tsx}"],
  theme: {
    extend: {
        flex: {
            "2": "2 2 0%"
        },
        colors: {
            dark: {
                25: "rgba(0, 0, 0, 0.25)",
                50: "rgba(0, 0, 0, 0.5)",
                75: "rgba(0, 0, 0, 0.75)",
            },
            light: {
                25: "rgba(255, 255, 255, 0.25)",
                50: "rgba(255, 255, 255, 0.5)",
                75: "rgba(255, 255, 255, 0.75)",
            }
            
        },
        height: {
            10: "2.5rem"
        }
    },
  },
  plugins: [],
}

