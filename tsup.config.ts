import { defineConfig } from "tsup";

export default defineConfig({
  name: "@grind-t/bo-nalog",
  entry: ["lib/index.ts"],
  outDir: "dist",
  format: ["esm", "cjs"],
  experimentalDts: true,
  clean: true,
});
