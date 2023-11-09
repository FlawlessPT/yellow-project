/**
 * @format
 */

import 'react-native';
import React from 'react';
import App from '../App';

// Note: import explicitly to use the types shiped with jest.
import {it, jest} from '@jest/globals';

// Note: test renderer must be required after react-native.
import renderer from 'react-test-renderer';

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
