/**
 * @format
 */

import 'react-native';
import React from 'react';

// Note: import explicitly to use the types shipped with jest.
import { it, jest } from '@jest/globals';
import renderer from 'react-test-renderer';

import App from '../App';

// needs to mock supabase to not use real client/api
jest.mock('@supabase/supabase-js', () => ({
  createClient: () => ({
    auth: {
      getSession: () => null,
    },
    onAuthStateChange: (callback: () => void) => callback(),
  }),
}));

it('renders correctly', () => {
  renderer.create(<App />);
});
