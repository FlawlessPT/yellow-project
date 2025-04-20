export type Json = string | number | boolean | null | { [key: string]: Json | undefined } | Json[];

export type Database = {
  public: {
    Tables: {
      consumables: {
        Row: {
          carbs: number;
          created_at: string | null;
          fat: number;
          id: number;
          kcal: number;
          name: string;
          protein: number;
          type: Database['public']['Enums']['consumable_type_enum'];
          updated_at: string | null;
        };
        Insert: {
          carbs: number;
          created_at?: string | null;
          fat: number;
          id?: number;
          kcal: number;
          name: string;
          protein: number;
          type: Database['public']['Enums']['consumable_type_enum'];
          updated_at?: string | null;
        };
        Update: {
          carbs?: number;
          created_at?: string | null;
          fat?: number;
          id?: number;
          kcal?: number;
          name?: string;
          protein?: number;
          type?: Database['public']['Enums']['consumable_type_enum'];
          updated_at?: string | null;
        };
        Relationships: [];
      };
      consumables_meals: {
        Row: {
          consumable_id: number;
          created_at: string | null;
          id: number;
          meal_id: number;
          notes: string | null;
          quantity: number;
          unit: Database['public']['Enums']['unit_enum'];
          updated_at: string | null;
        };
        Insert: {
          consumable_id: number;
          created_at?: string | null;
          id?: number;
          meal_id: number;
          notes?: string | null;
          quantity: number;
          unit: Database['public']['Enums']['unit_enum'];
          updated_at?: string | null;
        };
        Update: {
          consumable_id?: number;
          created_at?: string | null;
          id?: number;
          meal_id?: number;
          notes?: string | null;
          quantity?: number;
          unit?: Database['public']['Enums']['unit_enum'];
          updated_at?: string | null;
        };
        Relationships: [
          {
            foreignKeyName: 'fk_consumable';
            columns: ['consumable_id'];
            isOneToOne: false;
            referencedRelation: 'consumables';
            referencedColumns: ['id'];
          },
          {
            foreignKeyName: 'fk_meal';
            columns: ['meal_id'];
            isOneToOne: false;
            referencedRelation: 'meals';
            referencedColumns: ['id'];
          }
        ];
      };
      custom_pages: {
        Row: {
          content: string;
          created_at: string;
          id: string;
          slug: string;
          title: string | null;
          updated_at: string | null;
        };
        Insert: {
          content: string;
          created_at?: string;
          id?: string;
          slug: string;
          title?: string | null;
          updated_at?: string | null;
        };
        Update: {
          content?: string;
          created_at?: string;
          id?: string;
          slug?: string;
          title?: string | null;
          updated_at?: string | null;
        };
        Relationships: [];
      };
      daily_updates: {
        Row: {
          created_at: string | null;
          digestion: number | null;
          energy: number | null;
          id: number;
          notes: string | null;
          recovery_level: number | null;
          sleep_hours: string | null;
          steps: number | null;
          training_area: string | null;
          training_performance: number | null;
          updated_at: string | null;
          user_id: string;
          weight: number | null;
        };
        Insert: {
          created_at?: string | null;
          digestion?: number | null;
          energy?: number | null;
          id?: number;
          notes?: string | null;
          recovery_level?: number | null;
          sleep_hours?: string | null;
          steps?: number | null;
          training_area?: string | null;
          training_performance?: number | null;
          updated_at?: string | null;
          user_id: string;
          weight?: number | null;
        };
        Update: {
          created_at?: string | null;
          digestion?: number | null;
          energy?: number | null;
          id?: number;
          notes?: string | null;
          recovery_level?: number | null;
          sleep_hours?: string | null;
          steps?: number | null;
          training_area?: string | null;
          training_performance?: number | null;
          updated_at?: string | null;
          user_id?: string;
          weight?: number | null;
        };
        Relationships: [];
      };
      exercises: {
        Row: {
          created_at: string | null;
          id: number;
          name: string;
          updated_at: string | null;
          video_url: string | null;
        };
        Insert: {
          created_at?: string | null;
          id?: number;
          name: string;
          updated_at?: string | null;
          video_url?: string | null;
        };
        Update: {
          created_at?: string | null;
          id?: number;
          name?: string;
          updated_at?: string | null;
          video_url?: string | null;
        };
        Relationships: [];
      };
      exercises_trainings: {
        Row: {
          created_at: string | null;
          exercise_id: number;
          id: number;
          is_active: boolean;
          notes: string | null;
          reps: string;
          series: number;
          training_id: number;
          updated_at: string | null;
        };
        Insert: {
          created_at?: string | null;
          exercise_id: number;
          id?: number;
          is_active: boolean;
          notes?: string | null;
          reps: string;
          series: number;
          training_id: number;
          updated_at?: string | null;
        };
        Update: {
          created_at?: string | null;
          exercise_id?: number;
          id?: number;
          is_active?: boolean;
          notes?: string | null;
          reps?: string;
          series?: number;
          training_id?: number;
          updated_at?: string | null;
        };
        Relationships: [
          {
            foreignKeyName: 'fk_exercise';
            columns: ['exercise_id'];
            isOneToOne: false;
            referencedRelation: 'exercises';
            referencedColumns: ['id'];
          },
          {
            foreignKeyName: 'fk_training';
            columns: ['training_id'];
            isOneToOne: false;
            referencedRelation: 'trainings';
            referencedColumns: ['id'];
          }
        ];
      };
      feature_flags: {
        Row: {
          active: boolean;
          created_at: string;
          description: string | null;
          id: string;
          key: string;
          roles: string[] | null;
          updated_at: string | null;
          users_ids: string[] | null;
        };
        Insert: {
          active?: boolean;
          created_at?: string;
          description?: string | null;
          id?: string;
          key: string;
          roles?: string[] | null;
          updated_at?: string | null;
          users_ids?: string[] | null;
        };
        Update: {
          active?: boolean;
          created_at?: string;
          description?: string | null;
          id?: string;
          key?: string;
          roles?: string[] | null;
          updated_at?: string | null;
          users_ids?: string[] | null;
        };
        Relationships: [];
      };
      food_plans: {
        Row: {
          carbs_goal: number | null;
          created_at: string | null;
          fat_goal: number | null;
          id: number;
          kcal_goal: number | null;
          notes: string | null;
          protein_goal: number | null;
          status: Database['public']['Enums']['plan_status_enum'];
          updated_at: string | null;
          user_id: string;
          water_goal: string | null;
        };
        Insert: {
          carbs_goal?: number | null;
          created_at?: string | null;
          fat_goal?: number | null;
          id?: number;
          kcal_goal?: number | null;
          notes?: string | null;
          protein_goal?: number | null;
          status: Database['public']['Enums']['plan_status_enum'];
          updated_at?: string | null;
          user_id: string;
          water_goal?: string | null;
        };
        Update: {
          carbs_goal?: number | null;
          created_at?: string | null;
          fat_goal?: number | null;
          id?: number;
          kcal_goal?: number | null;
          notes?: string | null;
          protein_goal?: number | null;
          status?: Database['public']['Enums']['plan_status_enum'];
          updated_at?: string | null;
          user_id?: string;
          water_goal?: string | null;
        };
        Relationships: [];
      };
      meals: {
        Row: {
          created_at: string | null;
          food_plan_id: number;
          id: number;
          updated_at: string | null;
        };
        Insert: {
          created_at?: string | null;
          food_plan_id: number;
          id?: number;
          updated_at?: string | null;
        };
        Update: {
          created_at?: string | null;
          food_plan_id?: number;
          id?: number;
          updated_at?: string | null;
        };
        Relationships: [
          {
            foreignKeyName: 'fk_food_plan';
            columns: ['food_plan_id'];
            isOneToOne: false;
            referencedRelation: 'food_plans';
            referencedColumns: ['id'];
          }
        ];
      };
      mobile_international_messages: {
        Row: {
          created_at: string;
          id: string;
          lng: string;
          messages: Json;
          ns: string;
          updated_at: string | null;
        };
        Insert: {
          created_at?: string;
          id?: string;
          lng: string;
          messages: Json;
          ns?: string;
          updated_at?: string | null;
        };
        Update: {
          created_at?: string;
          id?: string;
          lng?: string;
          messages?: Json;
          ns?: string;
          updated_at?: string | null;
        };
        Relationships: [];
      };
      profiles: {
        Row: {
          avatar_url: string | null;
          back_photo_url: string | null;
          created_at: string | null;
          diet_notes: string | null;
          diet_type: Database['public']['Enums']['diet_type_enum'] | null;
          first_name: string | null;
          front_photo_url: string | null;
          gender: Database['public']['Enums']['gender_enum'] | null;
          height: number | null;
          id: string;
          last_name: string | null;
          phone_number: string | null;
          roles: string[];
          side_photo_url: string | null;
          updated_at: string | null;
          weight: number | null;
          workout_routine_notes: string | null;
          workout_routine_type: Database['public']['Enums']['workout_routine_type_enum'] | null;
        };
        Insert: {
          avatar_url?: string | null;
          back_photo_url?: string | null;
          created_at?: string | null;
          diet_notes?: string | null;
          diet_type?: Database['public']['Enums']['diet_type_enum'] | null;
          first_name?: string | null;
          front_photo_url?: string | null;
          gender?: Database['public']['Enums']['gender_enum'] | null;
          height?: number | null;
          id: string;
          last_name?: string | null;
          phone_number?: string | null;
          roles?: string[];
          side_photo_url?: string | null;
          updated_at?: string | null;
          weight?: number | null;
          workout_routine_notes?: string | null;
          workout_routine_type?: Database['public']['Enums']['workout_routine_type_enum'] | null;
        };
        Update: {
          avatar_url?: string | null;
          back_photo_url?: string | null;
          created_at?: string | null;
          diet_notes?: string | null;
          diet_type?: Database['public']['Enums']['diet_type_enum'] | null;
          first_name?: string | null;
          front_photo_url?: string | null;
          gender?: Database['public']['Enums']['gender_enum'] | null;
          height?: number | null;
          id?: string;
          last_name?: string | null;
          phone_number?: string | null;
          roles?: string[];
          side_photo_url?: string | null;
          updated_at?: string | null;
          weight?: number | null;
          workout_routine_notes?: string | null;
          workout_routine_type?: Database['public']['Enums']['workout_routine_type_enum'] | null;
        };
        Relationships: [];
      };
      subscription_benefits: {
        Row: {
          created_at: string | null;
          id: number;
          is_active: boolean;
          name: string;
          updated_at: string | null;
        };
        Insert: {
          created_at?: string | null;
          id?: number;
          is_active: boolean;
          name: string;
          updated_at?: string | null;
        };
        Update: {
          created_at?: string | null;
          id?: number;
          is_active?: boolean;
          name?: string;
          updated_at?: string | null;
        };
        Relationships: [];
      };
      subscription_types: {
        Row: {
          created_at: string | null;
          duration: number;
          id: number;
          is_active: boolean;
          name: string;
          price: number;
          updated_at: string | null;
        };
        Insert: {
          created_at?: string | null;
          duration: number;
          id?: number;
          is_active: boolean;
          name: string;
          price: number;
          updated_at?: string | null;
        };
        Update: {
          created_at?: string | null;
          duration?: number;
          id?: number;
          is_active?: boolean;
          name?: string;
          price?: number;
          updated_at?: string | null;
        };
        Relationships: [];
      };
      subscription_types_benefits: {
        Row: {
          created_at: string | null;
          id: number;
          is_active: boolean;
          subscription_benefit_id: number;
          subscription_type_id: number;
          updated_at: string | null;
        };
        Insert: {
          created_at?: string | null;
          id?: number;
          is_active: boolean;
          subscription_benefit_id: number;
          subscription_type_id: number;
          updated_at?: string | null;
        };
        Update: {
          created_at?: string | null;
          id?: number;
          is_active?: boolean;
          subscription_benefit_id?: number;
          subscription_type_id?: number;
          updated_at?: string | null;
        };
        Relationships: [
          {
            foreignKeyName: 'fk_subscription_benefit';
            columns: ['subscription_benefit_id'];
            isOneToOne: false;
            referencedRelation: 'subscription_benefits';
            referencedColumns: ['id'];
          },
          {
            foreignKeyName: 'fk_subscription_type';
            columns: ['subscription_type_id'];
            isOneToOne: false;
            referencedRelation: 'subscription_types';
            referencedColumns: ['id'];
          }
        ];
      };
      subscriptions: {
        Row: {
          created_at: string | null;
          duration: number;
          id: number;
          name: string;
          payment_date: string | null;
          price: number;
          status: Database['public']['Enums']['subscription_status_enum'];
          subscription_type_id: number | null;
          updated_at: string | null;
          user_id: string | null;
        };
        Insert: {
          created_at?: string | null;
          duration: number;
          id?: number;
          name: string;
          payment_date?: string | null;
          price: number;
          status: Database['public']['Enums']['subscription_status_enum'];
          subscription_type_id?: number | null;
          updated_at?: string | null;
          user_id?: string | null;
        };
        Update: {
          created_at?: string | null;
          duration?: number;
          id?: number;
          name?: string;
          payment_date?: string | null;
          price?: number;
          status?: Database['public']['Enums']['subscription_status_enum'];
          subscription_type_id?: number | null;
          updated_at?: string | null;
          user_id?: string | null;
        };
        Relationships: [
          {
            foreignKeyName: 'fk_subscription_type';
            columns: ['subscription_type_id'];
            isOneToOne: false;
            referencedRelation: 'subscription_types';
            referencedColumns: ['id'];
          }
        ];
      };
      supplement_plans: {
        Row: {
          created_at: string | null;
          id: number;
          status: Database['public']['Enums']['plan_status_enum'];
          updated_at: string | null;
          user_id: string;
        };
        Insert: {
          created_at?: string | null;
          id?: number;
          status: Database['public']['Enums']['plan_status_enum'];
          updated_at?: string | null;
          user_id: string;
        };
        Update: {
          created_at?: string | null;
          id?: number;
          status?: Database['public']['Enums']['plan_status_enum'];
          updated_at?: string | null;
          user_id?: string;
        };
        Relationships: [];
      };
      supplement_plans_consumables: {
        Row: {
          consumable_id: number;
          created_at: string | null;
          id: number;
          quantity: number;
          supplement_plan_id: number;
          type: Database['public']['Enums']['supplement_consumable_type_enum'];
          updated_at: string | null;
        };
        Insert: {
          consumable_id: number;
          created_at?: string | null;
          id?: number;
          quantity: number;
          supplement_plan_id: number;
          type: Database['public']['Enums']['supplement_consumable_type_enum'];
          updated_at?: string | null;
        };
        Update: {
          consumable_id?: number;
          created_at?: string | null;
          id?: number;
          quantity?: number;
          supplement_plan_id?: number;
          type?: Database['public']['Enums']['supplement_consumable_type_enum'];
          updated_at?: string | null;
        };
        Relationships: [
          {
            foreignKeyName: 'fk_consumable';
            columns: ['consumable_id'];
            isOneToOne: false;
            referencedRelation: 'consumables';
            referencedColumns: ['id'];
          },
          {
            foreignKeyName: 'fk_supplement_plan';
            columns: ['supplement_plan_id'];
            isOneToOne: false;
            referencedRelation: 'supplement_plans';
            referencedColumns: ['id'];
          }
        ];
      };
      training_plans: {
        Row: {
          cardio: number | null;
          cardio_type: Database['public']['Enums']['cardio_type_enum'] | null;
          created_at: string | null;
          id: number;
          notes: string | null;
          status: Database['public']['Enums']['plan_status_enum'];
          updated_at: string | null;
          user_id: string;
        };
        Insert: {
          cardio?: number | null;
          cardio_type?: Database['public']['Enums']['cardio_type_enum'] | null;
          created_at?: string | null;
          id?: number;
          notes?: string | null;
          status: Database['public']['Enums']['plan_status_enum'];
          updated_at?: string | null;
          user_id: string;
        };
        Update: {
          cardio?: number | null;
          cardio_type?: Database['public']['Enums']['cardio_type_enum'] | null;
          created_at?: string | null;
          id?: number;
          notes?: string | null;
          status?: Database['public']['Enums']['plan_status_enum'];
          updated_at?: string | null;
          user_id?: string;
        };
        Relationships: [];
      };
      trainings: {
        Row: {
          created_at: string | null;
          day_of_week: number;
          id: number;
          is_completed: boolean;
          name: string;
          training_plan_id: number;
          updated_at: string | null;
        };
        Insert: {
          created_at?: string | null;
          day_of_week: number;
          id?: number;
          is_completed: boolean;
          name: string;
          training_plan_id: number;
          updated_at?: string | null;
        };
        Update: {
          created_at?: string | null;
          day_of_week?: number;
          id?: number;
          is_completed?: boolean;
          name?: string;
          training_plan_id?: number;
          updated_at?: string | null;
        };
        Relationships: [
          {
            foreignKeyName: 'fk_training_plan';
            columns: ['training_plan_id'];
            isOneToOne: false;
            referencedRelation: 'training_plans';
            referencedColumns: ['id'];
          }
        ];
      };
      tutorials: {
        Row: {
          configs: Json;
          created_at: string;
          id: string;
          lng: string;
        };
        Insert: {
          configs: Json;
          created_at?: string;
          id?: string;
          lng: string;
        };
        Update: {
          configs?: Json;
          created_at?: string;
          id?: string;
          lng?: string;
        };
        Relationships: [];
      };
      updates: {
        Row: {
          back_photo_url: string;
          body_fat: number | null;
          created_at: string | null;
          feedback: string | null;
          front_photo_url: string;
          id: number;
          lean_mass: number | null;
          next_update_date: string | null;
          notes: string;
          side_photo_url: string;
          status: Database['public']['Enums']['update_status_enum'];
          updated_at: string | null;
          user_id: string;
          weight: number;
        };
        Insert: {
          back_photo_url: string;
          body_fat?: number | null;
          created_at?: string | null;
          feedback?: string | null;
          front_photo_url: string;
          id?: number;
          lean_mass?: number | null;
          next_update_date?: string | null;
          notes: string;
          side_photo_url: string;
          status: Database['public']['Enums']['update_status_enum'];
          updated_at?: string | null;
          user_id: string;
          weight: number;
        };
        Update: {
          back_photo_url?: string;
          body_fat?: number | null;
          created_at?: string | null;
          feedback?: string | null;
          front_photo_url?: string;
          id?: number;
          lean_mass?: number | null;
          next_update_date?: string | null;
          notes?: string;
          side_photo_url?: string;
          status?: Database['public']['Enums']['update_status_enum'];
          updated_at?: string | null;
          user_id?: string;
          weight?: number;
        };
        Relationships: [];
      };
    };
    Views: {
      pg_all_foreign_keys: {
        Row: {
          fk_columns: unknown[] | null;
          fk_constraint_name: unknown | null;
          fk_schema_name: unknown | null;
          fk_table_name: unknown | null;
          fk_table_oid: unknown | null;
          is_deferrable: boolean | null;
          is_deferred: boolean | null;
          match_type: string | null;
          on_delete: string | null;
          on_update: string | null;
          pk_columns: unknown[] | null;
          pk_constraint_name: unknown | null;
          pk_index_name: unknown | null;
          pk_schema_name: unknown | null;
          pk_table_name: unknown | null;
          pk_table_oid: unknown | null;
        };
        Relationships: [];
      };
      tap_funky: {
        Row: {
          args: string | null;
          is_definer: boolean | null;
          is_strict: boolean | null;
          is_visible: boolean | null;
          kind: unknown | null;
          langoid: unknown | null;
          name: unknown | null;
          oid: unknown | null;
          owner: unknown | null;
          returns: string | null;
          returns_set: boolean | null;
          schema: unknown | null;
          volatility: string | null;
        };
        Relationships: [];
      };
    };
    Functions: {
      _cleanup: {
        Args: Record<PropertyKey, never>;
        Returns: boolean;
      };
      _contract_on: {
        Args: { '': string };
        Returns: unknown;
      };
      _currtest: {
        Args: Record<PropertyKey, never>;
        Returns: number;
      };
      _db_privs: {
        Args: Record<PropertyKey, never>;
        Returns: unknown[];
      };
      _definer: {
        Args: { '': unknown };
        Returns: boolean;
      };
      _dexists: {
        Args: { '': unknown };
        Returns: boolean;
      };
      _expand_context: {
        Args: { '': string };
        Returns: string;
      };
      _expand_on: {
        Args: { '': string };
        Returns: string;
      };
      _expand_vol: {
        Args: { '': string };
        Returns: string;
      };
      _ext_exists: {
        Args: { '': unknown };
        Returns: boolean;
      };
      _extensions: {
        Args: Record<PropertyKey, never> | { '': unknown };
        Returns: unknown[];
      };
      _funkargs: {
        Args: { '': unknown[] };
        Returns: string;
      };
      _get: {
        Args: { '': string };
        Returns: number;
      };
      _get_db_owner: {
        Args: { '': unknown };
        Returns: unknown;
      };
      _get_dtype: {
        Args: { '': unknown };
        Returns: string;
      };
      _get_language_owner: {
        Args: { '': unknown };
        Returns: unknown;
      };
      _get_latest: {
        Args: { '': string };
        Returns: number[];
      };
      _get_note: {
        Args: { '': number } | { '': string };
        Returns: string;
      };
      _get_opclass_owner: {
        Args: { '': unknown };
        Returns: unknown;
      };
      _get_rel_owner: {
        Args: { '': unknown };
        Returns: unknown;
      };
      _get_schema_owner: {
        Args: { '': unknown };
        Returns: unknown;
      };
      _get_tablespace_owner: {
        Args: { '': unknown };
        Returns: unknown;
      };
      _get_type_owner: {
        Args: { '': unknown };
        Returns: unknown;
      };
      _got_func: {
        Args: { '': unknown };
        Returns: boolean;
      };
      _grolist: {
        Args: { '': unknown };
        Returns: unknown[];
      };
      _has_group: {
        Args: { '': unknown };
        Returns: boolean;
      };
      _has_role: {
        Args: { '': unknown };
        Returns: boolean;
      };
      _has_user: {
        Args: { '': unknown };
        Returns: boolean;
      };
      _inherited: {
        Args: { '': unknown };
        Returns: boolean;
      };
      _is_schema: {
        Args: { '': unknown };
        Returns: boolean;
      };
      _is_super: {
        Args: { '': unknown };
        Returns: boolean;
      };
      _is_trusted: {
        Args: { '': unknown };
        Returns: boolean;
      };
      _is_verbose: {
        Args: Record<PropertyKey, never>;
        Returns: boolean;
      };
      _lang: {
        Args: { '': unknown };
        Returns: unknown;
      };
      _opc_exists: {
        Args: { '': unknown };
        Returns: boolean;
      };
      _parts: {
        Args: { '': unknown };
        Returns: unknown[];
      };
      _pg_sv_type_array: {
        Args: { '': unknown[] };
        Returns: unknown[];
      };
      _prokind: {
        Args: { p_oid: unknown };
        Returns: unknown;
      };
      _query: {
        Args: { '': string };
        Returns: string;
      };
      _refine_vol: {
        Args: { '': string };
        Returns: string;
      };
      _relexists: {
        Args: { '': unknown };
        Returns: boolean;
      };
      _returns: {
        Args: { '': unknown };
        Returns: string;
      };
      _strict: {
        Args: { '': unknown };
        Returns: boolean;
      };
      _table_privs: {
        Args: Record<PropertyKey, never>;
        Returns: unknown[];
      };
      _temptypes: {
        Args: { '': string };
        Returns: string;
      };
      _todo: {
        Args: Record<PropertyKey, never>;
        Returns: string;
      };
      _vol: {
        Args: { '': unknown };
        Returns: string;
      };
      can: {
        Args: { '': unknown[] };
        Returns: string;
      };
      casts_are: {
        Args: { '': string[] };
        Returns: string;
      };
      check_user_permission: {
        Args: { user_id: string; roles: string[] };
        Returns: boolean;
      };
      col_is_null: {
        Args:
          | {
              schema_name: unknown;
              table_name: unknown;
              column_name: unknown;
              description?: string;
            }
          | { table_name: unknown; column_name: unknown; description?: string };
        Returns: string;
      };
      col_not_null: {
        Args:
          | {
              schema_name: unknown;
              table_name: unknown;
              column_name: unknown;
              description?: string;
            }
          | { table_name: unknown; column_name: unknown; description?: string };
        Returns: string;
      };
      collect_tap: {
        Args: Record<PropertyKey, never> | { '': string[] };
        Returns: string;
      };
      diag: {
        Args: Record<PropertyKey, never> | Record<PropertyKey, never> | { msg: string } | { msg: unknown };
        Returns: string;
      };
      diag_test_name: {
        Args: { '': string };
        Returns: string;
      };
      do_tap: {
        Args: Record<PropertyKey, never> | { '': string } | { '': unknown };
        Returns: string[];
      };
      domains_are: {
        Args: { '': unknown[] };
        Returns: string;
      };
      enums_are: {
        Args: { '': unknown[] };
        Returns: string;
      };
      extensions_are: {
        Args: { '': unknown[] };
        Returns: string;
      };
      fail: {
        Args: Record<PropertyKey, never> | { '': string };
        Returns: string;
      };
      findfuncs: {
        Args: { '': string };
        Returns: string[];
      };
      finish: {
        Args: { exception_on_failure?: boolean };
        Returns: string[];
      };
      foreign_tables_are: {
        Args: { '': unknown[] };
        Returns: string;
      };
      functions_are: {
        Args: { '': unknown[] };
        Returns: string;
      };
      get_all_table_name: {
        Args: Record<PropertyKey, never>;
        Returns: {
          table_name: string;
        }[];
      };
      get_types: {
        Args: { tname: string };
        Returns: {
          column_name: string;
          data_type: string;
          is_nullable: string;
          default_value: string;
        }[];
      };
      groups_are: {
        Args: { '': unknown[] };
        Returns: string;
      };
      has_check: {
        Args: { '': unknown };
        Returns: string;
      };
      has_composite: {
        Args: { '': unknown };
        Returns: string;
      };
      has_domain: {
        Args: { '': unknown };
        Returns: string;
      };
      has_enum: {
        Args: { '': unknown };
        Returns: string;
      };
      has_extension: {
        Args: { '': unknown };
        Returns: string;
      };
      has_fk: {
        Args: { '': unknown };
        Returns: string;
      };
      has_foreign_table: {
        Args: { '': unknown };
        Returns: string;
      };
      has_function: {
        Args: { '': unknown };
        Returns: string;
      };
      has_group: {
        Args: { '': unknown };
        Returns: string;
      };
      has_inherited_tables: {
        Args: { '': unknown };
        Returns: string;
      };
      has_language: {
        Args: { '': unknown };
        Returns: string;
      };
      has_materialized_view: {
        Args: { '': unknown };
        Returns: string;
      };
      has_opclass: {
        Args: { '': unknown };
        Returns: string;
      };
      has_pk: {
        Args: { '': unknown };
        Returns: string;
      };
      has_relation: {
        Args: { '': unknown };
        Returns: string;
      };
      has_role: {
        Args: { '': unknown };
        Returns: string;
      };
      has_schema: {
        Args: { '': unknown };
        Returns: string;
      };
      has_sequence: {
        Args: { '': unknown };
        Returns: string;
      };
      has_table: {
        Args: { '': unknown };
        Returns: string;
      };
      has_tablespace: {
        Args: { '': unknown };
        Returns: string;
      };
      has_type: {
        Args: { '': unknown };
        Returns: string;
      };
      has_unique: {
        Args: { '': string };
        Returns: string;
      };
      has_user: {
        Args: { '': unknown };
        Returns: string;
      };
      has_view: {
        Args: { '': unknown };
        Returns: string;
      };
      hasnt_composite: {
        Args: { '': unknown };
        Returns: string;
      };
      hasnt_domain: {
        Args: { '': unknown };
        Returns: string;
      };
      hasnt_enum: {
        Args: { '': unknown };
        Returns: string;
      };
      hasnt_extension: {
        Args: { '': unknown };
        Returns: string;
      };
      hasnt_fk: {
        Args: { '': unknown };
        Returns: string;
      };
      hasnt_foreign_table: {
        Args: { '': unknown };
        Returns: string;
      };
      hasnt_function: {
        Args: { '': unknown };
        Returns: string;
      };
      hasnt_group: {
        Args: { '': unknown };
        Returns: string;
      };
      hasnt_inherited_tables: {
        Args: { '': unknown };
        Returns: string;
      };
      hasnt_language: {
        Args: { '': unknown };
        Returns: string;
      };
      hasnt_materialized_view: {
        Args: { '': unknown };
        Returns: string;
      };
      hasnt_opclass: {
        Args: { '': unknown };
        Returns: string;
      };
      hasnt_pk: {
        Args: { '': unknown };
        Returns: string;
      };
      hasnt_relation: {
        Args: { '': unknown };
        Returns: string;
      };
      hasnt_role: {
        Args: { '': unknown };
        Returns: string;
      };
      hasnt_schema: {
        Args: { '': unknown };
        Returns: string;
      };
      hasnt_sequence: {
        Args: { '': unknown };
        Returns: string;
      };
      hasnt_table: {
        Args: { '': unknown };
        Returns: string;
      };
      hasnt_tablespace: {
        Args: { '': unknown };
        Returns: string;
      };
      hasnt_type: {
        Args: { '': unknown };
        Returns: string;
      };
      hasnt_user: {
        Args: { '': unknown };
        Returns: string;
      };
      hasnt_view: {
        Args: { '': unknown };
        Returns: string;
      };
      in_todo: {
        Args: Record<PropertyKey, never>;
        Returns: boolean;
      };
      index_is_primary: {
        Args: { '': unknown };
        Returns: string;
      };
      index_is_unique: {
        Args: { '': unknown };
        Returns: string;
      };
      is_aggregate: {
        Args: { '': unknown };
        Returns: string;
      };
      is_clustered: {
        Args: { '': unknown };
        Returns: string;
      };
      is_definer: {
        Args: { '': unknown };
        Returns: string;
      };
      is_empty: {
        Args: { '': string };
        Returns: string;
      };
      is_normal_function: {
        Args: { '': unknown };
        Returns: string;
      };
      is_not_updating_profiles_roles_field: {
        Args: { _id: string; roles: string[] };
        Returns: boolean;
      };
      is_partitioned: {
        Args: { '': unknown };
        Returns: string;
      };
      is_procedure: {
        Args: { '': unknown };
        Returns: string;
      };
      is_strict: {
        Args: { '': unknown };
        Returns: string;
      };
      is_superuser: {
        Args: { '': unknown };
        Returns: string;
      };
      is_window: {
        Args: { '': unknown };
        Returns: string;
      };
      isnt_aggregate: {
        Args: { '': unknown };
        Returns: string;
      };
      isnt_definer: {
        Args: { '': unknown };
        Returns: string;
      };
      isnt_empty: {
        Args: { '': string };
        Returns: string;
      };
      isnt_normal_function: {
        Args: { '': unknown };
        Returns: string;
      };
      isnt_partitioned: {
        Args: { '': unknown };
        Returns: string;
      };
      isnt_procedure: {
        Args: { '': unknown };
        Returns: string;
      };
      isnt_strict: {
        Args: { '': unknown };
        Returns: string;
      };
      isnt_superuser: {
        Args: { '': unknown };
        Returns: string;
      };
      isnt_window: {
        Args: { '': unknown };
        Returns: string;
      };
      json_mobile_international_messages_for: {
        Args: { language: string; namespace: string };
        Returns: Json;
      };
      language_is_trusted: {
        Args: { '': unknown };
        Returns: string;
      };
      languages_are: {
        Args: { '': unknown[] };
        Returns: string;
      };
      lives_ok: {
        Args: { '': string };
        Returns: string;
      };
      materialized_views_are: {
        Args: { '': unknown[] };
        Returns: string;
      };
      no_plan: {
        Args: Record<PropertyKey, never>;
        Returns: boolean[];
      };
      num_failed: {
        Args: Record<PropertyKey, never>;
        Returns: number;
      };
      ok: {
        Args: { '': boolean };
        Returns: string;
      };
      opclasses_are: {
        Args: { '': unknown[] };
        Returns: string;
      };
      operators_are: {
        Args: { '': string[] };
        Returns: string;
      };
      os_name: {
        Args: Record<PropertyKey, never>;
        Returns: string;
      };
      pass: {
        Args: Record<PropertyKey, never> | { '': string };
        Returns: string;
      };
      pg_version: {
        Args: Record<PropertyKey, never>;
        Returns: string;
      };
      pg_version_num: {
        Args: Record<PropertyKey, never>;
        Returns: number;
      };
      pgtap_version: {
        Args: Record<PropertyKey, never>;
        Returns: number;
      };
      plan: {
        Args: { '': number };
        Returns: string;
      };
      roles_are: {
        Args: { '': unknown[] };
        Returns: string;
      };
      runtests: {
        Args: Record<PropertyKey, never> | { '': string } | { '': unknown };
        Returns: string[];
      };
      schemas_are: {
        Args: { '': unknown[] };
        Returns: string;
      };
      sequences_are: {
        Args: { '': unknown[] };
        Returns: string;
      };
      skip: {
        Args: { '': number } | { '': string } | { why: string; how_many: number };
        Returns: string;
      };
      tables_are: {
        Args: { '': unknown[] };
        Returns: string;
      };
      tablespaces_are: {
        Args: { '': unknown[] };
        Returns: string;
      };
      throws_ok: {
        Args: { '': string };
        Returns: string;
      };
      todo: {
        Args:
          | { how_many: number }
          | { how_many: number; why: string }
          | { why: string }
          | { why: string; how_many: number };
        Returns: boolean[];
      };
      todo_end: {
        Args: Record<PropertyKey, never>;
        Returns: boolean[];
      };
      todo_start: {
        Args: Record<PropertyKey, never> | { '': string };
        Returns: boolean[];
      };
      types_are: {
        Args: { '': unknown[] };
        Returns: string;
      };
      users_are: {
        Args: { '': unknown[] };
        Returns: string;
      };
      views_are: {
        Args: { '': unknown[] };
        Returns: string;
      };
    };
    Enums: {
      cardio_type_enum: 'pre-workout' | 'post-workout' | 'other';
      consumable_type_enum: 'food' | 'supplement';
      diet_type_enum: 'vegan' | 'vegetarian' | 'traditional' | 'other';
      gender_enum: 'male' | 'female' | 'other';
      plan_status_enum: 'active' | 'inactive';
      subscription_status_enum: 'active' | 'inactive' | 'payment_pending';
      supplement_consumable_type_enum:
        | 'pre-workout'
        | 'post-workout'
        | 'intra-workout'
        | 'daily'
        | 'meal'
        | 'main-meal';
      unit_enum: 'g' | 'kg' | 'l' | 'ml' | 'slice' | 'un';
      update_status_enum: 'pending' | 'approved';
      workout_routine_type_enum: 'begginer' | 'irregular' | 'medium' | 'advanced';
    };
    CompositeTypes: {
      _time_trial_type: {
        a_time: number | null;
      };
    };
  };
};

type DefaultSchema = Database[Extract<keyof Database, 'public'>];

export type Tables<
  DefaultSchemaTableNameOrOptions extends
    | keyof (DefaultSchema['Tables'] & DefaultSchema['Views'])
    | { schema: keyof Database },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof Database;
  }
    ? keyof (Database[DefaultSchemaTableNameOrOptions['schema']]['Tables'] &
        Database[DefaultSchemaTableNameOrOptions['schema']]['Views'])
    : never = never
> = DefaultSchemaTableNameOrOptions extends { schema: keyof Database }
  ? (Database[DefaultSchemaTableNameOrOptions['schema']]['Tables'] &
      Database[DefaultSchemaTableNameOrOptions['schema']]['Views'])[TableName] extends {
      Row: infer R;
    }
    ? R
    : never
  : DefaultSchemaTableNameOrOptions extends keyof (DefaultSchema['Tables'] & DefaultSchema['Views'])
  ? (DefaultSchema['Tables'] & DefaultSchema['Views'])[DefaultSchemaTableNameOrOptions] extends {
      Row: infer R;
    }
    ? R
    : never
  : never;

export type TablesInsert<
  DefaultSchemaTableNameOrOptions extends keyof DefaultSchema['Tables'] | { schema: keyof Database },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof Database;
  }
    ? keyof Database[DefaultSchemaTableNameOrOptions['schema']]['Tables']
    : never = never
> = DefaultSchemaTableNameOrOptions extends { schema: keyof Database }
  ? Database[DefaultSchemaTableNameOrOptions['schema']]['Tables'][TableName] extends {
      Insert: infer I;
    }
    ? I
    : never
  : DefaultSchemaTableNameOrOptions extends keyof DefaultSchema['Tables']
  ? DefaultSchema['Tables'][DefaultSchemaTableNameOrOptions] extends {
      Insert: infer I;
    }
    ? I
    : never
  : never;

export type TablesUpdate<
  DefaultSchemaTableNameOrOptions extends keyof DefaultSchema['Tables'] | { schema: keyof Database },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof Database;
  }
    ? keyof Database[DefaultSchemaTableNameOrOptions['schema']]['Tables']
    : never = never
> = DefaultSchemaTableNameOrOptions extends { schema: keyof Database }
  ? Database[DefaultSchemaTableNameOrOptions['schema']]['Tables'][TableName] extends {
      Update: infer U;
    }
    ? U
    : never
  : DefaultSchemaTableNameOrOptions extends keyof DefaultSchema['Tables']
  ? DefaultSchema['Tables'][DefaultSchemaTableNameOrOptions] extends {
      Update: infer U;
    }
    ? U
    : never
  : never;

export type Enums<
  DefaultSchemaEnumNameOrOptions extends keyof DefaultSchema['Enums'] | { schema: keyof Database },
  EnumName extends DefaultSchemaEnumNameOrOptions extends {
    schema: keyof Database;
  }
    ? keyof Database[DefaultSchemaEnumNameOrOptions['schema']]['Enums']
    : never = never
> = DefaultSchemaEnumNameOrOptions extends { schema: keyof Database }
  ? Database[DefaultSchemaEnumNameOrOptions['schema']]['Enums'][EnumName]
  : DefaultSchemaEnumNameOrOptions extends keyof DefaultSchema['Enums']
  ? DefaultSchema['Enums'][DefaultSchemaEnumNameOrOptions]
  : never;

export type CompositeTypes<
  PublicCompositeTypeNameOrOptions extends keyof DefaultSchema['CompositeTypes'] | { schema: keyof Database },
  CompositeTypeName extends PublicCompositeTypeNameOrOptions extends {
    schema: keyof Database;
  }
    ? keyof Database[PublicCompositeTypeNameOrOptions['schema']]['CompositeTypes']
    : never = never
> = PublicCompositeTypeNameOrOptions extends { schema: keyof Database }
  ? Database[PublicCompositeTypeNameOrOptions['schema']]['CompositeTypes'][CompositeTypeName]
  : PublicCompositeTypeNameOrOptions extends keyof DefaultSchema['CompositeTypes']
  ? DefaultSchema['CompositeTypes'][PublicCompositeTypeNameOrOptions]
  : never;

export const Constants = {
  public: {
    Enums: {
      cardio_type_enum: ['pre-workout', 'post-workout', 'other'],
      consumable_type_enum: ['food', 'supplement'],
      diet_type_enum: ['vegan', 'vegetarian', 'traditional', 'other'],
      gender_enum: ['male', 'female', 'other'],
      plan_status_enum: ['active', 'inactive'],
      subscription_status_enum: ['active', 'inactive', 'payment_pending'],
      supplement_consumable_type_enum: ['pre-workout', 'post-workout', 'intra-workout', 'daily', 'meal', 'main-meal'],
      unit_enum: ['g', 'kg', 'l', 'ml', 'slice', 'un'],
      update_status_enum: ['pending', 'approved'],
      workout_routine_type_enum: ['begginer', 'irregular', 'medium', 'advanced'],
    },
  },
} as const;
