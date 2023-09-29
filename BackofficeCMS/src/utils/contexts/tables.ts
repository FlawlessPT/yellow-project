import {createContext, useContext} from 'react';
import {
  InputType,
  ReferenceDataType,
  SearchConfigsFilterType,
  TableInfoType,
} from '@types';
import pluralize from 'pluralize';
import {recordRepresentationForResource} from '@configs';

export const TablesContext = createContext<{
  tables: TableInfoType[];
}>({tables: []});

export const useTablesContext = () => {
  const tablesInfo = useContext(TablesContext);

  const isReference = ({
    inputType,
    columnName,
  }: {
    inputType: InputType;
    columnName: string;
  }) => inputType === 'uuid' && columnName.endsWith('_id');

  const getReferenceDataFor = (
    filter: Omit<SearchConfigsFilterType, 'viewMode'>,
  ): ReferenceDataType | null => {
    if (!isReference(filter)) return null;

    const tableName = pluralize(filter.columnName.replace('_id', ''));
    const tableInfo = tablesInfo.tables.find(t => t.name === tableName);

    return {
      sourceColumn: filter.columnName,
      tableName,
      recordRepresentationColumn:
        recordRepresentationForResource({
          tableName,
        }) ||
        tableInfo?.schema.find(c =>
          ['text', 'character varying'].includes(c.columnType),
        )?.columnName,
    };
  };

  return {
    tablesInfo,
    isReference,
    getReferenceDataFor,
  };
};
