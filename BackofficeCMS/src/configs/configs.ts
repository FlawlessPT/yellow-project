import {
  AdminOverrides,
  DatabaseUserRoles,
  SearchConfigsFilterType,
  ViewMode,
} from '@types';

/* To be customizable for each project: by default only ADMIN role exist and no roles using empty array: [], the default for new users */
export const rolesOptions = [
  {id: 'SUPER_ADMIN', name: 'Super Admin'},
  {id: 'ADMIN', name: 'Admin'},
];

const superAdminOptions = [rolesOptions[0]];
// TODO: uncomment when needed
// const adminOptions = [rolesOptions[1]];

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
      rolesAllowedToView: superAdminOptions,
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
      rolesAllowedToView: superAdminOptions,
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
      rolesAllowedToView: superAdminOptions,
      edit: {
        columns: {
          users_ids: {
            type: 'reference_array',
            referenceData: {
              tableName: 'profiles',
            },
          },
          roles: {
            type: 'select',
            options: superAdminOptions,
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
          roles: {
            type: 'select',
            options: superAdminOptions,
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

export const isResourceVisibleForRoles = ({
  tableName,
  roles,
}: {
  tableName: string;
  roles: DatabaseUserRoles;
}) => {
  const resourceOverrides = overrideConfigs.resources?.[tableName];

  if (!resourceOverrides) {
    return true;
  }

  const rolesAllowedToView = resourceOverrides.rolesAllowedToView;

  if (!rolesAllowedToView) {
    return true;
  }

  console.log(
    rolesAllowedToView.every(item => roles.includes(item.id)),
    tableName,
    rolesAllowedToView,
    roles,
  );

  return rolesAllowedToView.every(item => roles.includes(item.id));
};

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
