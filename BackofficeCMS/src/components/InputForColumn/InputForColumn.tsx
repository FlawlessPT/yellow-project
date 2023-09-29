import {
  TextInput,
  DateInput,
  DateTimeInput,
  BooleanInput,
  NumberInput,
  required,
  InputProps,
  SelectArrayInput,
  ReferenceInput,
} from 'react-admin';
import {RichTextInput} from 'ra-input-rich-text';
import {InputType, ReferenceDataType, ViewMode} from '@types';
import {isFieldToRenderForGeneralOptions} from '@configs';
import {JsonInput} from 'react-admin-json-view';
import {useTablesContext} from '@utils/contexts/tables';

export function InputForColumn({
  columnName,
  inputType,
  isRequired,
  options,
  referenceData,
  viewMode,
}: {
  inputType: InputType;
  columnName: string;
  isRequired: boolean;
  viewMode: ViewMode;
  options?: {id: string; name: string}[];
  referenceData?: Pick<ReferenceDataType, 'tableName'>;
}) {
  const {isReference, getReferenceDataFor} = useTablesContext();

  if (!isFieldToRenderForGeneralOptions({columnName, inputType, viewMode})) {
    return null;
  }

  const inputProps: InputProps & {
    key: string;
    fullWidth?: boolean;
  } = {
    key: columnName,
    source: columnName,
    validate: isRequired ? [required()] : undefined,
    fullWidth: true,
  };

  if (inputType === 'reference' && referenceData?.tableName) {
    return (
      <ReferenceInput
        key={inputProps.key}
        source={columnName}
        reference={referenceData.tableName}
        validate={inputProps.validate}
      />
    );
  } else {
    // trying to discover reference
    const referenceSearchFilter = {inputType, columnName};
    const discoveredReferenceData =
      isReference(referenceSearchFilter) &&
      getReferenceDataFor(referenceSearchFilter);

    if (
      discoveredReferenceData &&
      discoveredReferenceData.recordRepresentationColumn
    ) {
      return (
        <ReferenceInput
          key={inputProps.key}
          source={discoveredReferenceData.sourceColumn}
          reference={discoveredReferenceData.tableName}
          validate={inputProps.validate}
        />
      );
    }
  }

  if (
    ['timestamp with time zone', 'timestamp without time zone'].includes(
      inputType,
    )
  ) {
    return <DateTimeInput {...inputProps} />;
  }

  if (['date'].includes(inputType)) {
    return <DateInput {...inputProps} />;
  }

  /* TODO: needs to review because it is returning date as well
    if (["time without time zone"].includes(columnType)) {
      return (
        <TimeInput
          {...inputProps}
          validate={isRequired ? [required()] : undefined}
        />
      );
    }
    */

  if ('boolean' === inputType) {
    return <BooleanInput {...inputProps} />;
  }

  if (
    [
      'bigint',
      'smallint',
      'integer',
      'real',
      'double precision',
      'numberic',
    ].includes(inputType)
  ) {
    return <NumberInput {...inputProps} />;
  }

  if (['character varying', 'text', 'uuid'].includes(inputType)) {
    return <TextInput {...inputProps} multiline />;
  }

  if (['json'].includes(inputType)) {
    return (
      <JsonInput
        key={inputProps.key}
        source={inputProps.source}
        validate={inputProps.validate}
        reactJsonOptions={{
          name: null,
          collapsed: false,
          enableClipboard: false,
          displayDataTypes: false,
          sortKeys: true,
          defaultValue: '',
        }}
      />
    );
  }

  if (['rich_text'].includes(inputType)) {
    return <RichTextInput {...inputProps} />;
  }

  if (inputType === 'select' && options) {
    return <SelectArrayInput {...inputProps} choices={options} />;
  }

  return null;
}
