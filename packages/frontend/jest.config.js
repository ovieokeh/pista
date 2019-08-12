module.exports = {
  automock: false,
  collectCoverage: true,
  collectCoverageFrom: [
    'src/**/*.ts',
    'src/**/*.tsx',
    '!src/**/declarations.d.ts',
    '!src/components/Navbar/useToggleDropdown.ts',
    '!src/**/index.ts',
    '!src/requests/*.ts',
    '!src/routes/*.**',
    '!src/utils/persistData.ts',
  ],
  globals: {
    'ts-jest': {
      babelConfig: true,
    },
  },
  moduleFileExtensions: ['ts', 'tsx', 'js'],
  moduleNameMapper: {
    '\\.(css|scss|svg|png)$': '<rootDir>/__mocks__/styleMock.js',
    '^assets(.*)$': '<rootDir>/assets$1',
    '^~(.*)$': '<rootDir>/src/$1',
  },
  transform: {
    '\\.(ts|tsx)$': 'ts-jest',
  },
  testRegex: '(roots/.*|(\\.|/)(test))\\.(ts|tsx)?$',
  setupFilesAfterEnv: ['<rootDir>src/setupTests.ts'],
  snapshotSerializers: ['enzyme-to-json'],
};
