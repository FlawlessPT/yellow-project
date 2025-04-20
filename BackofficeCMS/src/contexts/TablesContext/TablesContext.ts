import { createContext } from 'react';

import { TableInfoType } from '@types';

const TablesContext = createContext<{
  tables: TableInfoType[];
}>({ tables: [] });

export default TablesContext;
