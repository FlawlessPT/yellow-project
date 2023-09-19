import {
  CreateButton,
  Datagrid,
  List,
  TextField,
  TopToolbar,
} from "react-admin";
import { TableInfoType } from "../../types";
import { isFieldToRenderForGeneralOptions } from "../../configs";

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
  return (
    <List actions={<ListActions />}>
      <Datagrid rowClick="edit">
        {tableInfo.schema.map(({ columnName, columnType }) => {
          if (
            !isFieldToRenderForGeneralOptions({
              columnName,
              inputType: columnType,
            })
          ) {
            return null;
          }

          return <TextField source={columnName} key={columnName} />;
        })}
      </Datagrid>
    </List>
  );
}
