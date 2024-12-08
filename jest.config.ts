module.exports = {
  preset: "ts-jest", // Use ts-jest for TypeScript
  testEnvironment: "jsdom", // Ensure jsdom is the test environment
  setupFilesAfterEnv: ["@testing-library/jest-dom"], // Include Testing Library matchers
  transform: {
    "^.+\\.(ts|tsx)$": "ts-jest", // Transform .ts/.tsx files with ts-jest
  },
  transformIgnorePatterns: ["/node_modules/"], // Ignore node_modules
  moduleFileExtensions: ["ts", "tsx", "js", "jsx", "json", "node"], // Recognize these extensions
};
