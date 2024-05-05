import {UserRole} from './user';
import {ColumnType, ReferenceDataType} from './database';

export type InputType =
  | ColumnType
  | 'rich_text'
  | 'select'
  | 'reference'
  | 'reference_array'
  | 'none';
export type ResourceOverrides = {
  isDeletable?: boolean;
  columns: {
    [columnName: string]:
      | {
          type: InputType;
          options?: UserRole[];
          referenceData?: Pick<ReferenceDataType, 'tableName'>;
        }
      | undefined;
  };
} | null;

export type ViewMode = 'edit' | 'create' | 'list';
export type AdminOverrides = {
  general?: {
    tablesToExclude?: string[];
    columnsToExclude?: {[view in ViewMode]?: string[]};
    inputTypesToExclude?: {[view in ViewMode]?: InputType[]};
  };
  resources?: {
    [resourceName: string]:
      | ({
          [viewMode in ViewMode]?: ResourceOverrides;
        } & {
          recordRepresentationColumn?: string;
          rolesAllowedToView?: UserRole[];
        })
      | undefined;
  };
};

export type SearchConfigsFilterType = {
  columnName: string;
  inputType: InputType;
  viewMode: ViewMode;
};
