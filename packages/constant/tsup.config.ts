import { defineConfig } from "tsup";

export default defineConfig(options => {
    console.log(options)
    return {
        entry: ["src/**/*.ts"],
        format: ["esm", "cjs"],
        dts: true,
        splitting: false,
        clean: true,
        sourcemap: true,
        outDir: 'build',
        // legacyOutput: true,
        publicDir: true
    }
})