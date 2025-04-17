import { TablesContext } from '@contexts';
import pluralize from 'pluralize';

import { useContext } from 'react';

import { recordRepresentationForResource } from '@configs';

import { InputType, SearchConfigsFilterType, ReferenceDataType } from '@types';

const useTablesContext = () => {
  const tablesInfo = useContext(TablesContext);

  const isReference = ({ inputType, columnName }: { inputType: InputType; columnName: string }) =>
    inputType === 'uuid' && columnName.endsWith('_id');

  const getReferenceDataFor = (filter: Omit<SearchConfigsFilterType, 'viewMode'>): ReferenceDataType | null => {
    if (!isReference(filter)) return null;

    const tableName = pluralize(filter.columnName.replace('_id', ''));
    const tableInfo = tablesInfo.tables.find((t) => t.name === tableName);

    return {
      sourceColumn: filter.columnName,
      tableName,
      recordRepresentationColumn:
        recordRepresentationForResource({
          tableName,
        }) || tableInfo?.schema.find((c) => ['text', 'character varying'].includes(c.columnType))?.columnName,
    };
  };

  return {
    tablesInfo,
    isReference,
    getReferenceDataFor,
  };
};

export default useTablesContext;
