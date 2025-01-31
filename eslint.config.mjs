module.exports = {
  extends: ["next", "next/core-web-vitals"],
  "rules": {
    // Disable a specific ESLint rule
    "react/no-unescaped-entities": "off",
    "@next/next/no-page-custom-font": "off",
    "no-console": "off",  // For example, to allow console logs
    "react/jsx-no-undef": "off",  // Another example, to allow undefined variables in JSX
  }
}
