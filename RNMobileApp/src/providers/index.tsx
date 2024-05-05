// React and React Native
import React from 'react';

// Theme
import { ThemeProvider } from './theme';

// Providers
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
        <ThemeProvider>
          <FeatureFlagsContextProvider>{children}</FeatureFlagsContextProvider>
        </ThemeProvider>
      </PaperProvider>
    </SafeAreaProvider>
  );
};

export default Providers;
