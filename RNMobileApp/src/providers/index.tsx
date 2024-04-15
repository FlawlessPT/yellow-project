// React and React Native
import React from 'react';

// Theme
import { ThemeProvider } from './theme';

// Providers
import { FeatureFlagsContextProvider } from './feature-flags';

// External Libs
import { Provider as PaperProvider } from 'react-native-paper';

interface ProvidersProps {
  children: React.ReactNode;
}

const Providers = ({ children }: ProvidersProps) => {
  return (
    <PaperProvider>
      <ThemeProvider>
        <FeatureFlagsContextProvider>{children}</FeatureFlagsContextProvider>
      </ThemeProvider>
    </PaperProvider>
  );
};

export default Providers;
