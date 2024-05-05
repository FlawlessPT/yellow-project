// React and React Native
import React from 'react';

type Loading = {
  isLoading: boolean;
  message?: string;
};

type LoadingContextContent = {
  loading: Loading;
  setLoading: (newState: Loading) => void;
};

type LoadingFeedbackProviderProps = {
  children: React.ReactNode;
};

const INITIAL_LOADING_CONTEXT_CONTENT: LoadingContextContent = {
  loading: { isLoading: false },
  setLoading: () => {
    return;
  },
};

export const LoadingContext = React.createContext(INITIAL_LOADING_CONTEXT_CONTENT);

const LoadingProvider = ({ children }: LoadingFeedbackProviderProps) => {
  const [loading, setLoading] = React.useState<Loading>({ isLoading: false, message: '' });

  return (
    <LoadingContext.Provider
      value={{
        loading,
        setLoading: (newState: Loading): void => {
          setLoading(newState);
        },
      }}
    >
      {children}
    </LoadingContext.Provider>
  );
};

export default LoadingProvider;
