import {AdminOverrides, SearchConfigsFilterType, ViewMode} from '@types';

/* To be customizable for each project: by default only ADMIN role exist and no roles using empty array: [], the default for new users */
export const rolesOptions = [{id: 'ADMIN', name: 'Admin'}];

const overrideConfigs: AdminOverrides = {
  general: {
    tablesToExclude: [],
    columnsToExclude: {
      create: ['id', 'created_at', 'updated_at'],
      edit: ['id', 'created_at', 'updated_at'],
      list: ['created_at', 'updated_at'],
    },
    inputTypesToExclude: {
      create: ['jsonb', 'none'],
      edit: ['jsonb', 'none'],
      list: ['jsonb', 'none'],
    },
  },
  resources: {
    profiles: {
      recordRepresentationColumn: 'username',
      create: null,
      edit: {
        isDeletable: false,
        columns: {
          roles: {
            type: 'select',
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
            type: 'rich_text',
          },
          slug: {
            type: 'none',
          },
        },
      },
      create: {
        columns: {
          content: {
            type: 'rich_text',
          },
        },
      },
    },
    feature_flags: {
      edit: {
        columns: {
          users_ids: {
            type: 'reference_array',
            referenceData: {
              tableName: 'profiles',
            },
          },
        },
      },
      create: {
        columns: {
          users_ids: {
            type: 'reference_array',
            referenceData: {
              tableName: 'profiles',
            },
          },
        },
      },
    },
    /* TODO: remove -- reference example configuration todos table connected to profiles through profile_id column
        When not configured the system tries to discover it when *_id column is found
    todos: {
      edit: {
        columns: {
          profile_id: {
            type: "reference",
            referenceData: {
              tableName: "profiles",
            },
          },
        },
      },
      create: {
        columns: {
          profile_id: {
            type: "reference",
            referenceData: {
              tableName: "profiles",
            },
          },
        },
      },
    },
    */
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

export function recordRepresentationForResource({
  tableName,
}: Pick<OverridesForResourceSearchType, 'tableName'>) {
  const tableOverrides =
    overrideConfigs.resources && overrideConfigs.resources[tableName];

  return tableOverrides?.recordRepresentationColumn;
}

export function isViewModeEnabledForResource(
  filter: OverridesForResourceSearchType,
) {
  return overridesForResource(filter) !== null;
}

export function getGeneralOverrides() {
  return overrideConfigs.general;
}

export function isFieldToRenderForGeneralOptions({
  columnName,
  inputType,
  viewMode,
}: SearchConfigsFilterType) {
  const generalOverrides = getGeneralOverrides();
  const columnsToExcludeForViewMode = (generalOverrides?.columnsToExclude ||
    {})[viewMode];
  const inputTypesToExcludeForViewMode =
    (generalOverrides?.inputTypesToExclude || {})[viewMode];

  if (
    (columnsToExcludeForViewMode || []).includes(columnName) ||
    (inputTypesToExcludeForViewMode || []).includes(inputType)
  ) {
    return false;
  }

  return true;
}
