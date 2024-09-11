import type {Config} from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      backgroundImage: {
        'bg-image' : "url('../../public/images/payrol.jpg')",
        'bg-logo' : "url('../../public/images/vuteq.png')",
        'bg-nova' : "url('../../public/images/nova-char.png')",
        'bg-ai' : "url('../../public/images/ai.jpg')"
      }
    },
  },
  plugins: [],
};
export default config;
