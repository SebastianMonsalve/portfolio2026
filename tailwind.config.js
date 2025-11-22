export default {
  content: ["./index.html", "./src/**/*.{js,jsx,ts,tsx}"],

  presets: [
    {
      theme: {
        extend: {
          fontFamily: {
            sora: ["Sora", ...defaultTheme.fontFamily.sans],
            space: ["Space Grotesk", ...defaultTheme.fontFamily.sans],
          },
        },
      },
    },
  ],
};
