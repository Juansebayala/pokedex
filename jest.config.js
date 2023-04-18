const config = {
  verbose: true,
  testEnvironment: 'jsdom',
  roots: ['<rootDir>/src/'],
  coverageDirectory: '<rootDir>/coverage/',
  testPathIgnorePatterns: ['/node_modules/', '.*fixture\\.js$'],
  coveragePathIgnorePatterns: ['/node_modules/', '.*fixture\\.js$'],
};

module.export = config;
