import nextJest from "next/jest.js";
import { Config } from "jest";
import { pathsToModuleNameMapper } from "ts-jest";

import { compilerOptions } from "./tsconfig.json";

const withNextJest = nextJest({ dir: "./" });

const config = {
  coverageProvider: "v8",
  testEnvironment: "jsdom",
  setupFilesAfterEnv: ["<rootDir>/jest.setup.ts"],
  // "\@/lib/styled/*" needs to be first in compilerOptions.paths; otherwise,
  // Jest will attempt to import the file from "./src/lib/styled/*" instead of
  // "./styled-system/*"
  moduleNameMapper: pathsToModuleNameMapper(compilerOptions.paths),
} satisfies Config;

export default withNextJest(config);
