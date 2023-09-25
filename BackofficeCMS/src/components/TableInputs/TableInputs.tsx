import { ResourceOverrides, TableInfoType } from "../../types";
import { InputForColumn } from "../InputForColumn";

export function TableInputs({
  tableInfo,
  overrides,
}: {
  tableInfo: TableInfoType;
  overrides?: ResourceOverrides;
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
      />
    );
  });
}
