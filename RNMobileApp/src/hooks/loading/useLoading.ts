// React and React Native
import { useContext } from 'react';

// Providers
import { LoadingContext } from '../../providers/loading';

const useLoading = () => useContext(LoadingContext);

export default useLoading;
