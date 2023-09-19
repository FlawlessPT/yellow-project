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
    label: (columnName.charAt(0).toUpperCase() + columnName.slice(1)).replace(
      "_",
      " "
    ),
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

  if (["character varying", "json", "text"].includes(inputType)) {
    return <TextInput {...inputProps} multiline />;
  }

  if (["rich_text"].includes(inputType)) {
    return <RichTextInput {...inputProps} />;
  }

  if (inputType === "select" && options) {
    return <SelectArrayInput {...inputProps} choices={options} />;
  }

  return null;
}
