import { CreateButton, Datagrid, List, ReferenceField, TextField, TopToolbar } from 'react-admin';

import { isFieldToRenderForGeneralOptions, overridesForResource, recordRepresentationForResource } from '@configs';

import { TableInfoType } from '../../types';

import { useTablesContext } from '@utils/contexts/tables';

const ListActions = () => (
  <TopToolbar>
    <CreateButton />
  </TopToolbar>
);

export function CustomResourceListGuesser({ tableInfo }: { tableInfo: TableInfoType }) {
  let isDeletable = true;
  const resourceEditOverrides = overridesForResource({
    tableName: tableInfo.name,
    viewMode: 'edit',
  });

  if (typeof resourceEditOverrides?.isDeletable === 'boolean' && !resourceEditOverrides?.isDeletable) {
    isDeletable = false;
  }

  const { isReference, getReferenceDataFor } = useTablesContext();

  return (
    <List actions={<ListActions />}>
      <Datagrid rowClick="edit" bulkActionButtons={isDeletable ? undefined : false}>
        {tableInfo.schema.map(({ columnName, columnType }) => {
          if (
            !isFieldToRenderForGeneralOptions({
              columnName,
              inputType: columnType,
              viewMode: 'list',
            })
          ) {
            return null;
          }

          if (columnType === 'json') {
            return null;
          }

          const dataOverridesForColumn = resourceEditOverrides?.columns[columnName];
          if (dataOverridesForColumn?.type === 'reference' && dataOverridesForColumn.referenceData?.tableName) {
            return (
              <ReferenceField
                source={columnName}
                reference={dataOverridesForColumn.referenceData.tableName}
                key={columnName}
              >
                <TextField
                  source={recordRepresentationForResource({
                    tableName: dataOverridesForColumn.referenceData.tableName,
                  })}
                />
              </ReferenceField>
            );
          } else {
            // trying to discover reference
            const referenceSearchFilter = { inputType: columnType, columnName };
            const referenceData = isReference(referenceSearchFilter) && getReferenceDataFor(referenceSearchFilter);

            if (referenceData && referenceData.recordRepresentationColumn) {
              return (
                <ReferenceField
                  source={referenceData.sourceColumn}
                  reference={referenceData.tableName}
                  key={columnName}
                >
                  <TextField source={referenceData.recordRepresentationColumn} />
                </ReferenceField>
              );
            }
          }

          return <TextField source={columnName} key={columnName} />;
        })}
      </Datagrid>
    </List>
  );
}
