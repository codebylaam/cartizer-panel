import { defineTheme } from "@astryxdesign/core"
import { neutralTheme } from "@astryxdesign/theme-neutral"

export const cartizerTheme = defineTheme({
  name: "cartizer",
  typography: {
    body: {
      family: "Figtree",
      fallbacks: "Noto Sans Bengali",
    },
    heading: {
      family: "Alice",
      fallbacks: "Noto Serif Bengali",
    },
  },
  extends: neutralTheme,
})
