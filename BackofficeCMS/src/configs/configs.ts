import { AdminOverrides, ViewMode } from "../types";

const overrideConfigs: AdminOverrides = {
  general: {
    tablesToExclude: [],
  },
  resources: {
    profiles: {
      create: null,
    },
    custom_pages: {
      edit: {
        content: {
          type: "rich_text",
        },
        slug: {
          type: "none",
        },
      },
      create: {
        content: {
          type: "rich_text",
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
