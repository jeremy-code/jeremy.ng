import nextJest from "next/jest.js";
import { pathsToModuleNameMapper, type JestConfigWithTsJest } from "ts-jest";

import { compilerOptions } from "./tsconfig.json";

const createJestConfig = nextJest({ dir: "./" });

const config: JestConfigWithTsJest = {
  preset: "ts-jest",
  coverageProvider: "v8",
  testEnvironment: "jsdom",
  setupFilesAfterEnv: ["<rootDir>/jest.setup.ts"],
  moduleNameMapper: pathsToModuleNameMapper(compilerOptions.paths),
};

export default createJestConfig(config);
