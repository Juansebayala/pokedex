const config = {
  verbose: true,
  testEnvironment: 'jsdom',
  coverageDirectory: '<rootDir>/coverage/',
  testPathIgnorePatterns: ['/node_modules/', '.*fixture.js'],
  coveragePathIgnorePatterns: ['/node_modules/', '.*fixture.js'],
};

module.exports = config;
