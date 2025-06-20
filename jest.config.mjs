import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

export default {
  preset: 'ts-jest/presets/default-esm',
  testEnvironment: 'jsdom',
  rootDir: __dirname,
  testMatch: ['<rootDir>/tests/unit/**/*.{ts,tsx}'],
  transform: {
    '^.+\\.(ts|tsx)$': [
      'ts-jest',
      { useESM: true, tsconfig: 'tsconfig.jest.json' },
    ],
  },

  modulePathIgnorePatterns: ['<rootDir>/dist/', '<rootDir>/build/'],
  moduleNameMapper: {
    '^~/app/(.*)$': '<rootDir>/src/app/$1',
    '^~/pages/(.*)$': '<rootDir>/src/pages/$1',
    '^~/widgets/(.*)$': '<rootDir>/src/widgets/$1',
    '^~/features/(.*)$': '<rootDir>/src/features/$1',
    '^~/entities/(.*)$': '<rootDir>/src/entities/$1',
    '^~/shared/(.*)$': '<rootDir>/src/shared/$1',
    '^~/styles/(.*)$': '<rootDir>/src/styles/$1',
    '^~/schemas/(.*)$': '<rootDir>/src/schemas/$1',
    '^~/store/(.*)$': '<rootDir>/src/store/$1',
    '^~/hooks/(.*)$': '<rootDir>/src/hooks/$1',
    '^~/constants/(.*)$': '<rootDir>/src/constants/$1',
    '^~/lib/(.*)$': '<rootDir>/src/lib/$1',
    '^~/utils/(.*)$': '<rootDir>/src/utils/$1',
    '^~tests/(.*)$': '<rootDir>/tests/$1',
  },
  coverageDirectory: 'coverage',
  collectCoverageFrom: [
    'src/**/*.{ts,tsx}',
    '!src/**/*.d.ts',
    '!src/**/index.{ts,tsx}',
  ],
  extensionsToTreatAsEsm: ['.ts', '.tsx'],
};
