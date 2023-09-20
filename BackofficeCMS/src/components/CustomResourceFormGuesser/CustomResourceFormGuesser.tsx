import { Create, Edit } from "react-admin";
import { overridesForResource } from "../../configs";
import { TableInfoType, ViewMode } from "../../types";
import { ResourceFormWrapper } from "../ResourceFormWrapper";
import { TableInputs } from "../TableInputs";

const ViewModeResourceMap: {
  [viewMode in ViewMode]?: (props: {
    children: React.ReactNode;
  }) => JSX.Element;
} = {
  create: Create,
  edit: ({ children }: { children?: React.ReactNode }) => (
    <Edit mutationMode="pessimistic">{children}</Edit>
  ),
};

export function CustomResourceFormGuesser({
  tableInfo,
  viewMode,
}: {
  viewMode: ViewMode;
  tableInfo: TableInfoType;
}) {
  const ResourceComponent = ViewModeResourceMap[viewMode];

  if (!ResourceComponent) return null;

  return (
    <ResourceComponent>
      <ResourceFormWrapper>
        <TableInputs
          overrides={overridesForResource({
            viewMode,
            tableName: tableInfo.name,
          })}
          tableInfo={tableInfo}
        />
      </ResourceFormWrapper>
    </ResourceComponent>
  );
}
