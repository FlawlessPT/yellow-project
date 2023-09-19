import { ColumnType } from "./database";

export type InputType = ColumnType | "rich_text" | "select" | "none";
export type ResourceOverrides = {
  [columnName: string]:
    | { type: InputType; options?: { id: string; name: string }[] }
    | undefined;
} | null;

export type ViewMode = "edit" | "create";
export type AdminOverrides = {
  general?: {
    tablesToExclude?: string[];
    columnsToExclude?: string[];
    inputTypesToExclude?: InputType[];
  };
  resources?: {
    [resourceName: string]:
      | {
          [viewMode in ViewMode]?: ResourceOverrides;
        }
      | undefined;
  };
};
