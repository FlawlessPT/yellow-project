import React from 'react';

import { Provider as PaperProvider } from 'react-native-paper';
import { SafeAreaProvider } from 'react-native-safe-area-context';

import { FeatureFlagsContextProvider } from './feature-flags';
import LoadingProvider from './loading';
import { ThemeProvider } from './theme';

interface ProvidersProps {
  children: React.ReactNode;
}

const Providers = ({ children }: ProvidersProps) => {
  return (
    <SafeAreaProvider>
      <PaperProvider>
        <LoadingProvider>
          <ThemeProvider>
            <FeatureFlagsContextProvider>{children}</FeatureFlagsContextProvider>
          </ThemeProvider>
        </LoadingProvider>
      </PaperProvider>
    </SafeAreaProvider>
  );
};

export default Providers;
