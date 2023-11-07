module.exports = {
  preset: 'react-native',
  // https://jestjs.io/docs/tutorial-react-native#transformignorepatterns-customization
  transformIgnorePatterns: [
    'node_modules/(?!(jest-)?react-native|@react-native|react-clone-referenced-element|@react-native-community|expo(nent)?|@expo(nent)?/.*|react-navigation|@react-navigation/.*|@unimodules/.*|unimodules|sentry-expo|react-native-onesignal|native-base|@sentry/.*)',
  ],
  // setting up needed mocks and other stuff
  setupFiles: ['<rootDir>/jest.setup.js'],
};
