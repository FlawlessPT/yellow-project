import { AdminOverrides, InputType, ViewMode } from "@types";

/* To be customizable for each project: by default only ADMIN role exist and no roles using empty array: [], the default for new users */
export const rolesOptions = [{ id: "ADMIN", name: "Admin" }];

const overrideConfigs: AdminOverrides = {
  general: {
    tablesToExclude: [],
    columnsToExclude: ["id", "created_at", "updated_at"],
    inputTypesToExclude: ["jsonb", "none"],
  },
  resources: {
    profiles: {
      create: null,
      edit: {
        isDeletable: false,
        columns: {
          roles: {
            type: "select",
            options: rolesOptions,
          },
        },
      },
    },
    custom_pages: {
      edit: {
        isDeletable: false,
        columns: {
          content: {
            type: "rich_text",
          },
          slug: {
            type: "none",
          },
        },
      },
      create: {
        columns: {
          content: {
            type: "rich_text",
          },
        },
      },
    },
  },
};

type OverridesForResourceSearchType = {
  viewMode: ViewMode;
  tableName: string;
};

export function overridesForResource({
  tableName,
  viewMode,
}: OverridesForResourceSearchType) {
  const tableOverrides =
    overrideConfigs.resources && overrideConfigs.resources[tableName];
  const tableOverridesForMode = tableOverrides && tableOverrides[viewMode];

  return tableOverridesForMode;
}
export function isViewModeEnabledForResource(
  filter: OverridesForResourceSearchType
) {
  return overridesForResource(filter) !== null;
}

export function getGeneralOverrides() {
  return overrideConfigs.general;
}

export function isFieldToRenderForGeneralOptions({
  columnName,
  inputType,
}: {
  columnName: string;
  inputType: InputType;
}) {
  const generalOverrides = getGeneralOverrides();

  if (
    (generalOverrides?.columnsToExclude || []).includes(columnName) ||
    (generalOverrides?.inputTypesToExclude || []).includes(inputType)
  ) {
    return false;
  }

  return true;
}
