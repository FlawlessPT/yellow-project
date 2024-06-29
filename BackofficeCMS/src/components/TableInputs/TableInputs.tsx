import { InputForColumn } from '@components/InputForColumn';

import { ResourceOverrides, TableInfoType, ViewMode } from '@types';

export function TableInputs({
  tableInfo,
  overrides,
  viewMode,
}: {
  tableInfo: TableInfoType;
  overrides?: ResourceOverrides;
  viewMode: ViewMode;
}) {
  return tableInfo.schema.map(({ columnName, columnType, isRequired }) => {
    const resourceInfo = overrides?.columns && overrides.columns[columnName];
    const resourceType = resourceInfo?.type || columnType;

    return (
      <InputForColumn
        key={columnName}
        inputType={resourceType}
        columnName={columnName}
        isRequired={isRequired}
        options={resourceInfo?.options}
        referenceData={resourceInfo?.referenceData}
        viewMode={viewMode}
      />
    );
  });
}
