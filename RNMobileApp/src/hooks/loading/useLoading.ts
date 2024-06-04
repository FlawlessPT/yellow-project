import { useContext } from 'react';

import { LoadingContext } from '@providers/loading';

const useLoading = () => useContext(LoadingContext);

export default useLoading;
