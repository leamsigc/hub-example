// @ts-check
import withNuxt from "./.nuxt/eslint.config.mjs";

export default withNuxt().overrideRules({
  "@stylistic/semi": 2,
  "@stylistic/quotes": 2,
});
// Your custom configs here
