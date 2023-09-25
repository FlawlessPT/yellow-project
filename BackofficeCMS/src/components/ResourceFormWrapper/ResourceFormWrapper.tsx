import { SimpleForm, SimpleFormProps } from "react-admin";

export function ResourceFormWrapper(props: SimpleFormProps) {
  return <SimpleForm {...props} style={{ maxWidth: "640px" }} />;
}
