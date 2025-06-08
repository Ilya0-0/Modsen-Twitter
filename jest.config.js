import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

export default {
  preset: 'ts-jest/presets/default-esm',
  testEnvironment: 'jest-fixed-jsdom',
  rootDir: __dirname,
  testMatch: ['<rootDir>/tests/unit/**/*.{test,spec}.{ts,tsx}'],
  transform: {
    '^.+\\.(ts|tsx|js|jsx)$': ['ts-jest', { useESM: true }],
  },
  modulePathIgnorePatterns: ['<rootDir>/dist/', '<rootDir>/build/'],
  moduleNameMapper: {
    '^~assets/.*\\.svg\\?react$': '<rootDir>/__mocks__/svgMock.js',
    '^~assets/.*\\.(jpg|jpeg|png|gif|svg)$': '<rootDir>/__mocks__/fileMock.js',
    '^~/app/(.*)$': '<rootDir>/src/app/$1',
    '^~/pages/(.*)$': '<rootDir>/src/pages/$1',
    '^~/widgets/(.*)$': '<rootDir>/src/widgets/$1',
    '^~/features/(.*)$': '<rootDir>/src/features/$1',
    '^~/entities/(.*)$': '<rootDir>/src/entities/$1',
    '^~/shared/(.*)$': '<rootDir>/src/shared/$1',
    '^~/styles/(.*)$': '<rootDir>/src/styles/$1',
    '^~/constants/(.*)$': '<rootDir>/src/constants/$1',
    '^~tests/(.*)$': '<rootDir>/tests/$1',
  },
  coverageDirectory: 'coverage',
  collectCoverageFrom: [
    'src/**/*.{ts,tsx}',
    '!src/**/*.d.ts',
    '!src/**/index.{ts,tsx}',
  ],
  setupFilesAfterEnv: ['@testing-library/jest-dom'],
  extensionsToTreatAsEsm: ['.ts', '.tsx'],
};
