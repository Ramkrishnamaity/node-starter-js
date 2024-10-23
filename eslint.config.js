import globals from "globals";
import pluginJs from "@eslint/js";

export default [
  { languageOptions: { globals: globals.node } },
  pluginJs.configs.recommended,
  {
    rules: {
      "no-unused-vars": "warn",
      "no-undef": "error",
      "no-console": "warn",
      "no-multiple-empty-lines": ["error", { max: 1 }],
      "semi": ["warn", "always"],
      "quotes": ["warn", "double"],
      "@typescript-eslint/no-explicit-any": "off"
    }
  }
];