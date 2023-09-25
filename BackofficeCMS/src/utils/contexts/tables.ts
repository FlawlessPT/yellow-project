import { createContext, useContext } from "react";
import { TableInfoType } from "@types";

export const TablesContext = createContext<{
  tables: TableInfoType[];
}>({ tables: [] });

export const useTablesContext = () => {
  const tablesInfo = useContext(TablesContext);

  return tablesInfo;
};
