export default {
  "{app,lib}/**/*.{ts,tsx}": ["prettier --write", "eslint --fix"],
  "*.config.ts": ["prettier --write", "eslint --fix"],
  "*.{mjs,cjs}": ["prettier --write"],
  "env.d.ts": ["prettier --write"],
  "scripts/**/*.ts": ["prettier --write"],
  "*.{json,md,mdx,css,html,yml,yaml}": ["prettier --write"],
};
