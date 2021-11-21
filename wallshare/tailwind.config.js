module.exports = {
  purge: [
    "./src/**/*.vue"
  ],
  darkMode: false, // or 'media' or 'class'
  mode: "jit",
  theme: {
    extend: {
      minHeight: {
        "screen-7": "7vh",
        "screen-90": "90vh"
      }
    },
  },
  variants: {
    extend: {},
  },
  plugins: [],
}
