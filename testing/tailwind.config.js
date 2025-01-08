/** @type {import('tailwindcss').Config} */
export default {
    content: [],
    theme: {
        extend: {
            colors: {
                light: {
                    25: "rgba(255, 255, 255, 0.25)",
                    50: "rgba(255, 255, 255, 0.50)",
                    75: "rgba(255, 255, 255, 0.75)",
                },
                dark: {
                    25: "rgba(0, 0, 0, 0.25)",
                    50: "rgba(0, 0, 0, 0.50)",
                    75: "rgba(0, 0, 0, 0.75)",
                }
            },
            flex: {
                2: "2 2 0%",
                3: "3 3 0%",
                4: "4 4 0%",
            }
        },
    },
    plugins: [],
}

