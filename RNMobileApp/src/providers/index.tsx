// React and React Native
import React from 'react';

// Hooks
import useTheme from '@hooks/theme/useTheme';

// Styled Components
import { ThemeProvider } from 'styled-components/native';

// Providers
import { FeatureFlagsContextProvider } from './feature-flags';

// External Libs
import { Provider as PaperProvider } from 'react-native-paper';

interface ProvidersProps {
  children: React.ReactNode;
}

const Providers = ({ children }: ProvidersProps) => {
  const { theme } = useTheme();
  return (
    <PaperProvider>
      <ThemeProvider theme={theme}>
        <FeatureFlagsContextProvider>{children}</FeatureFlagsContextProvider>
      </ThemeProvider>
    </PaperProvider>
  );
};

export default Providers;
