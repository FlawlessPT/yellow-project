import { TablesContext } from '@contexts';

import { PropsWithChildren } from 'react';

import { TableInfoType } from '@types';

type InitProvidersProps = {
  tables: TableInfoType[];
} & PropsWithChildren;

const InitProviders = ({ tables, children }: InitProvidersProps) => {
  return <TablesContext.Provider value={{ tables }}>{children}</TablesContext.Provider>;
};

export default InitProviders;
