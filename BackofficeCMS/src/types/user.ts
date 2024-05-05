import {Session, User} from '@supabase/supabase-js';

export type UserRole = {
  id: string;
  name: string;
};

export type DatabaseUserRole = string;
export type DatabaseUserRoles = DatabaseUserRole[];

export type UserSession = {
  user: User & {
    profileRoles: DatabaseUserRole[];
  };
} & Session;
