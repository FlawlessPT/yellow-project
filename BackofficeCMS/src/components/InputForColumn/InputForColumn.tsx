import {
  TextInput,
  DateInput,
  DateTimeInput,
  BooleanInput,
  NumberInput,
  required,
  InputProps,
  SelectArrayInput,
} from "react-admin";
import { RichTextInput } from "ra-input-rich-text";
import { InputType } from "../../types";
import { isFieldToRenderForGeneralOptions } from "../../configs";
import { JsonInput } from "react-admin-json-view";

export function InputForColumn({
  columnName,
  inputType,
  isRequired,
  options,
}: {
  inputType: InputType;
  columnName: string;
  isRequired: boolean;
  options?: { id: string; name: string }[];
}) {
  if (!isFieldToRenderForGeneralOptions({ columnName, inputType })) {
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

  if (
    ["timestamp with time zone", "timestamp without time zone"].includes(
      inputType
    )
  ) {
    return <DateTimeInput {...inputProps} />;
  }

  if (["date"].includes(inputType)) {
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
  if ("boolean" === inputType) {
    return <BooleanInput {...inputProps} />;
  }

  if (
    [
      "bigint",
      "smallint",
      "integer",
      "real",
      "double precision",
      "numberic",
    ].includes(inputType)
  ) {
    return <NumberInput {...inputProps} />;
  }

  if (["character varying", "text"].includes(inputType)) {
    return <TextInput {...inputProps} multiline />;
  }

  if (["json"].includes(inputType)) {
    return (
      <JsonInput
        key={inputProps.key}
        source={inputProps.source}
        validate={inputProps.validate}
        reactJsonOptions={{
          name: null,
          collapsed: false,
          enableClipboard: true,
          displayDataTypes: false,
          defaultValue: "",
        }}
      />
    );
  }

  if (["rich_text"].includes(inputType)) {
    return <RichTextInput {...inputProps} />;
  }

  if (inputType === "select" && options) {
    return <SelectArrayInput {...inputProps} choices={options} />;
  }

  return null;
}
