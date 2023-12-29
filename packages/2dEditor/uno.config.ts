import { defineConfig } from "unocss";
export default defineConfig({
  rules: [
    // [
    //   /^border-(\\d+)-(\\e+)px$/,
    //   ([, d, e]) => ({ "border-left": `${e}px solid #e2e2e2` }),
    // ],
    [
      /^border-(\d+)-([a-z]+)px$/,
      ([, width, style]) => {
        return {
          "border-width": `${width}px`,
          "border-style": style,
        };
      },
    ],
    // {
    //   selector: /^border-(\d+)-([a-z]+)px$/,
    //   declarations: ([, width, style]) => ({
    //     "border-width": `${width}px`,
    //     "border-style": style,
    //   }),
    // },
  ],
});

