import { Create, DeleteButton, Edit, SaveButton, Toolbar } from "react-admin";
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

const EditToolbar = ({ isDeletable }: { isDeletable: boolean }) => (
  <Toolbar>
    <SaveButton />
    {isDeletable && <DeleteButton />}
  </Toolbar>
);

export function CustomResourceFormGuesser({
  tableInfo,
  viewMode,
}: {
  viewMode: ViewMode;
  tableInfo: TableInfoType;
}) {
  const ResourceComponent = ViewModeResourceMap[viewMode];

  if (!ResourceComponent) return null;

  // check if we want to show delete button on toolbar when in edit mode
  let toolbar: JSX.Element | undefined;
  if (viewMode === "edit") {
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

    toolbar = <EditToolbar isDeletable={isDeletable} />;
  }

  return (
    <ResourceComponent>
      <ResourceFormWrapper toolbar={viewMode === "edit" ? toolbar : undefined}>
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
