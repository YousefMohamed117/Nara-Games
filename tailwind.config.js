module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  darkMode: "class",
  theme: {
    fontFamily: {
      display: ["Montserrat Alternates", "sans-serif"],
      body: ["Montserrat Alternates", "sans-serif"],
    },
    extend: {
      fontSize: {
        14: "14px",
      },
      backgroundColor: {
        'pink': "#f2809a",
        "light-blue": "#f3f6ff",
        "cyan": "#e7eced",
        "blue": "#62c3e7",
        "main-dark-bg": "#20232A",
        "secondary-dark-bg": "#33373E",
        'gray': "#f3eff0",
        "half-transparent": "rgba(0, 0, 0, 0.5)",
      },
      colors: {
        'pink': "#f2809a",
        'dark-gray': "#606060",
        "light-blue": "#f3f6ff",
        "blue": "#62c3e7",
        "main-dark-bg": "#20232A",
        "secondary-dark-bg": "#33373E",
        'gray': "#f3eff0",
        "half-transparent": "rgba(0, 0, 0, 0.5)",
      },
      screens: {
        'custom-xl': '1500px', // Define custom breakpoint at 1500px
      },
    },
  },
  plugins: [],
};
