import { PostgrestSingleResponse } from '@supabase/supabase-js';

import { useCallback, useEffect, useState } from 'react';

import { getGeneralOverrides } from '@configs';

import supabaseClient from '@utils/database';

import { ColumnType, TableInfoType } from '@types';

interface UseCustomResourcesResult {
  tables: TableInfoType[];
  tablesToExclude: string[];
  isLoading: boolean;
}

const useCustomResources = (): UseCustomResourcesResult => {
  const [isLoading, setLoading] = useState<boolean>(false);
  const [tables, setTables] = useState<TableInfoType[]>([]);

  const fetchTableNames = useCallback(async () => {
    setLoading(true);

    const { data: tablesInfo = [] } = await supabaseClient.rpc('get_all_table_name');
    const backOfficeTablesScheme: typeof tables = (tablesInfo as Array<{ table_name: string }>).map(
      (t: { table_name: string }) => ({
        name: t.table_name,
        schema: [],
      })
    );

    const allTablePromises = backOfficeTablesScheme.map(({ name }) => supabaseClient.rpc('get_types', { tname: name }));
    const allTableInfoResults = await Promise.all(allTablePromises);
    allTableInfoResults.forEach(
      // eslint-disable-next-line @typescript-eslint/ban-ts-comment
      // @ts-ignore
      (
        response: PostgrestSingleResponse<
          {
            column_name: string;
            data_type: ColumnType;
            is_nullable: string;
            default_value: string | null;
          }[]
        >,
        i
      ) => {
        backOfficeTablesScheme[i].schema =
          response.data?.map((c) => ({
            columnName: c.column_name,
            columnType: c.data_type,
            isRequired: c.is_nullable === 'NO' && c.default_value === null,
          })) || [];
      }
    );

    setTables(backOfficeTablesScheme);
    setLoading(false);
  }, []);

  useEffect(() => {
    fetchTableNames();
  }, [fetchTableNames]);

  const generalOverrides = getGeneralOverrides();
  const tablesToExclude = generalOverrides?.tablesToExclude || [];

  return { tables, tablesToExclude, isLoading };
};

export default useCustomResources;
