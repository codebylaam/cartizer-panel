import path from "node:path"
import { fileURLToPath } from "node:url"

import { defineConfig } from "vite"
import stylex from '@stylexjs/unplugin';
import babel from "@rolldown/plugin-babel"
import { tanstackRouter } from "@tanstack/router-plugin/vite"
import react, { reactCompilerPreset } from "@vitejs/plugin-react"

const __dirname = path.dirname(fileURLToPath(import.meta.url))

// Required: tells the StyleX plugin's internal lightning css transform
// not to lower light-dark() into broken polyfill variables.
// Astryx tokens use light-dark() which is baseline 2024.
const lightningcssTargets = {
  chrome: 123 << 16,
  firefox: 120 << 16,
  safari: (17 << 16) | (5 << 8),
}

// https://vite.dev/config/
export default defineConfig({
  server: {
    host: true,
    port: 3010,
    allowedHosts: true,
  },
  plugins: [
    // Declare CSS layer order so theme overrides beat component base styles.
    {
      name: "astryx-css-layer-order",
      transformIndexHtml() {
        return [
          {
            tag: "style",
            children:
              "@layer reset, priority1, priority2, priority3, priority4, priority5, priority6, priority7, priority8, priority9, astryx-theme;",
            injectTo: "head-prepend",
          },
        ]
      },
    },
    stylex.vite({
      dev: process.env.NODE_ENV === "development",
      runtimeInjection: false,
      treeshakeCompensation: true,
      useCSSLayers: true,
      unstable_moduleResolution: {
        type: "commonJS",
        rootDir: __dirname,
      },
      // The StyleX unplugin runs its own internal lightningcss with
      // default targets of browserslist('>= 1%'). Override explicitly
      // so light-dark() is preserved as native CSS.
      lightningcssOptions: {
        targets: lightningcssTargets,
      },
    }),
    // Please make sure that '@tanstack/router-plugin' is passed before '@vitejs/plugin-react'
    tanstackRouter({
      target: "react",
      autoCodeSplitting: true,
    }),
    react(),
    babel({ presets: [reactCompilerPreset()] }),
  ],
  resolve: {
    alias: {
      "@astryxdesign/core/theme/tokens.stylex": path.resolve(
        __dirname,
        "node_modules/@astryxdesign/core/src/theme/tokens.stylex.ts",
      ),
      "@astryxdesign/core": path.resolve(
        __dirname,
        "node_modules/@astryxdesign/core/src",
      ),
      "@": path.resolve(__dirname, "./src"),
    },
  },
  // Prevent Vite from pre-bundling Astryx with esbuild. Astryx ships as source
  // that must be compiled by the StyleX plugin — pre-bundling strips the
  // stylex.create/defineVars calls and causes a runtime error.
  optimizeDeps: {
    exclude: ["@astryxdesign/core", "@astryxdesign/theme-neutral"],
  },
})
