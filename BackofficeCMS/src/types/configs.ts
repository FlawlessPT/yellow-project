import { ColumnType } from "./database";

export type InputType = ColumnType | "rich_text" | "none";
export type ResourceOverrides = {
  [columnName: string]: { type: InputType } | undefined;
} | null;

export type ViewMode = "edit" | "create";
export type AdminOverrides = {
  general?: {
    tablesToExclude?: string[];
  };
  resources?: {
    [resourceName: string]:
      | {
          [viewMode in ViewMode]?: ResourceOverrides;
        }
      | undefined;
  };
};
