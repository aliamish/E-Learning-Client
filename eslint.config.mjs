// eslint.config.js
import { dirname } from "path";
import { fileURLToPath } from "url";
import { FlatCompat } from "@eslint/eslintrc";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const compat = new FlatCompat({
  baseDirectory: __dirname,
});

/** @type {import("eslint").Linter.FlatConfig[]} */
const eslintConfig = [
  // Extend Next.js and TypeScript base configs
  ...compat.extends("next/core-web-vitals", "next/typescript"),

  // Custom configuration
  {
    ignores: [
      "node_modules/**",
      ".next/**",
      "out/**",
      "build/**",
      "next-env.d.ts",
    ],

    rules: {
      // Disable ALL possible common warnings and errors
      "@typescript-eslint/no-explicit-any": "off",
      "@typescript-eslint/no-unused-vars": "off",
      "@typescript-eslint/ban-ts-comment": "off",
      "@typescript-eslint/no-non-null-assertion": "off",
      "@typescript-eslint/explicit-module-boundary-types": "off",
      "no-console": "off",
      "react/react-in-jsx-scope": "off",
      "react/prop-types": "off",
      "react/display-name": "off",
      "no-unused-vars": "off",
      "no-undef": "off",
      "no-empty": "off",
      "no-unreachable": "off",
      "no-debugger": "off",
      "no-constant-condition": "off",
      // Allow empty object types (`{}`) used throughout the codebase for now.
      "@typescript-eslint/no-empty-object-type": "off",
      // Allow expression statements that are used intentionally (suppress unused-expressions warnings).
      "@typescript-eslint/no-unused-expressions": "off",
    },
  },
];

export default eslintConfig;
