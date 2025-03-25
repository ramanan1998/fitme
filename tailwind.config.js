/** @type {import('tailwindcss').Config} */
module.exports = {
  // NOTE: Update this to include the paths to all of your component files.
  content: ["./app/**/*.{js,jsx,ts,tsx}"],
  presets: [require("nativewind/preset")],
  theme: {
    extend: {
      fontFamily: {
        'byte': ['byte'], // Match the key used in `useFonts`
        'albert-sans': ['albert-sans']
      },
      colors: {
			  "primary": "#000033",
			  "secondary": "#2A6EFD",
			  "background": "#F6F9FC",
			  "brown": "#3E3535"
			}
    },
  },
  plugins: [],
}

