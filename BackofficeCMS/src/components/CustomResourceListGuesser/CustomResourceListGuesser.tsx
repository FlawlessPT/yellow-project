import {
  CreateButton,
  Datagrid,
  List,
  TextField,
  TopToolbar,
} from "react-admin";
import { TableInfoType } from "../../types";
import {
  isFieldToRenderForGeneralOptions,
  overridesForResource,
} from "../../configs";

const ListActions = () => (
  <TopToolbar>
    <CreateButton />
  </TopToolbar>
);

export function CustomResourceListGuesser({
  tableInfo,
}: {
  tableInfo: TableInfoType;
}) {
  let isDeletable = true;
  const resourceEditOverrides = overridesForResource({
    tableName: tableInfo.name,
    viewMode: "edit",
  });

  if (
    typeof resourceEditOverrides?.isDeletable === "boolean" &&
    !resourceEditOverrides?.isDeletable
  ) {
    isDeletable = false;
  }

  return (
    <List actions={<ListActions />}>
      <Datagrid
        rowClick="edit"
        bulkActionButtons={isDeletable ? undefined : false}
      >
        {tableInfo.schema.map(({ columnName, columnType }) => {
          if (
            !isFieldToRenderForGeneralOptions({
              columnName,
              inputType: columnType,
            })
          ) {
            return null;
          }

          if (columnType === "json") {
            return null;
          }

          return <TextField source={columnName} key={columnName} />;
        })}
      </Datagrid>
    </List>
  );
}
