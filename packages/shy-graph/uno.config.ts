import { defineConfig, presetIcons, presetUno, presetAttributify } from "unocss";
export default defineConfig({
  presets: [presetAttributify(), presetUno(), presetIcons()],
});

