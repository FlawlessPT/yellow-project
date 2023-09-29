export type ColumnType =
  | 'bigint'
  | 'smallint'
  | 'integer'
  | 'real'
  | 'double precision'
  | 'numberic'
  | 'character varying'
  | 'json'
  | 'text'
  | 'uuid'
  | 'boolean'
  | 'timestamp with time zone'
  | 'timestamp without time zone'
  | 'time without time zone'
  | 'jsonb'
  | 'ARRAY';

export type TableInfoType = {
  name: string;
  schema: {columnName: string; columnType: ColumnType; isRequired: boolean}[];
};

export type ReferenceDataType = {
  sourceColumn: string;
  tableName: string;
  recordRepresentationColumn?: string;
};
