// React and React Native
import React from 'react';

// Theme
import { ThemeProvider } from './theme';

// Providers
import LoadingProvider from './loading';
import { FeatureFlagsContextProvider } from './feature-flags';

// External Libs
import { Provider as PaperProvider } from 'react-native-paper';
import { SafeAreaProvider } from 'react-native-safe-area-context';

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
