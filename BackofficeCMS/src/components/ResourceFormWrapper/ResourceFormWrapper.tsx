import { SimpleForm } from "react-admin";

export function ResourceFormWrapper({
  children,
}: {
  children?: React.ReactNode;
}) {
  return <SimpleForm style={{ maxWidth: "640px" }}>{children}</SimpleForm>;
}
