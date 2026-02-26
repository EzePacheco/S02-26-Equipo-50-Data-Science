export default {
  testEnvironment: 'node',
  testMatch: ['**/src/**/*.test.js'],
  transform: {},
  moduleFileExtensions: ['js', 'mjs'],
  verbose: true,
  setupFilesAfterEnv: ['./jest.setup.js'],
  collectCoverageFrom: [
    'src/domain/**/*.js',
    'src/application/**/*.js',
    '!src/**/*.test.js',
  ],
  coverageDirectory: 'coverage',
  coverageReporters: ['text', 'lcov', 'html'],
};
