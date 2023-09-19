export type ColumnType =
  | "bigint"
  | "smallint"
  | "integer"
  | "real"
  | "double precision"
  | "numberic"
  | "character varying"
  | "json"
  | "text"
  | "boolean"
  | "timestamp with time zone"
  | "timestamp without time zone"
  | "time without time zone"
  | "jsonb"
  | "ARRAY";
export type InputType = ColumnType | "rich_text" | "none";

export type TableInfoType = {
  name: string;
  schema: { columnName: string; columnType: ColumnType; isRequired: boolean }[];
};

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
