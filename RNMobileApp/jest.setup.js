import { jest } from '@jest/globals';
import mockLocalize from 'react-native-localize/mock';

// Needed to solve issue with react-navigation
jest.useFakeTimers();

// Native modules need to be mocked: https://jest-bot.github.io/jest/docs/tutorial-react-native.html#mock-native-modules-using-jestmock

jest.mock('react-native-localize', () => mockLocalize);

// https://stackoverflow.com/a/70724310
jest.mock('react-native/Libraries/EventEmitter/NativeEventEmitter');
jest.mock('expo-secure-store', () => ({
  getItemAsync: jest.fn(),
  setItemAsync: jest.fn(),
  deleteItemAsync: jest.fn(),
}));
jest.mock('expo-web-browser', () => ({
  openBrowserAsync: jest.fn(),
  dismissBrowser: jest.fn(),
  openAuthSessionAsync: jest.fn(),
  dismissAuthSession: jest.fn(),
}));
jest.mock('react-native-onesignal', () => ({
  LogLevel: {
    None: 0,
    Fatal: 1,
    Error: 2,
    Warn: 3,
    Info: 4,
    Debug: 5,
    Verbose: 6,
  },
  OneSignal: {
    initialize: jest.fn(),
    Notifications: {
      requestPermission: jest.fn(),
      addEventListener: jest.fn(),
    },
    Debug: {
      setLogLevel: jest.fn(),
    },
  },
}));
