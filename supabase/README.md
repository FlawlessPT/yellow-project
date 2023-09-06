## Scripts

Here you will find 3 scripts:

Generate configs for mobile project:

```sh
yarn supabase-configs-mobile
```

Generate configs for Back Office project:

```sh
yarn supabase-configs-backoffice
```

Generate configs for both projects:

```sh
yarn supabase-configs
```

Before executing any of those scripts you should create a **.env** file with same content as **.env.example** and update it with supabase keys for you remote project.

## Database Migrations

The first migration **migrations/\*\_user_auth_management_starter.sql** is the structure needed for authentication. You may want to update columns for **profiles** table according to your project requirements.

Then we have tow migrations that create two functions:

- get_all_table_name (**migrations/\*\_list_tables_function.sql**);
- get_types (**migrations/\*\_get_table_types.sql**);

To be use at Back Office web app to auto generate needed pages for each table existing in **public** database schema.

## Email Templates

You will find at **templates** some \*html files to override default email templates for authentication process. On remote project we must update it at **supabase dashboard -> Authentication -> Email Templates\***.

You must define it at **config.toml**, for new ones.

## Local config.toml

For local development some configurations need to be done at **config.toml**.
