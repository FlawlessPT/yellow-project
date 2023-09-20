# Introduction

This is a repository that works as a starter for a full stack mobile application and includes a Back Office Web App.

## Main technologies:

- react-native (mobile application);
- react + vite (Back Office SPA);
- typescript;
- supabase (Database + Serverless Backend);
- bitbucket pipelines;

## Requirements:

- NodeJs@18;
- Docker;
- iOS and Android as mentioned [here](https://reactnative.dev/docs/environment-setup?guide=native&os=macos&platform=android) (chose your Development OS and Target OS accordingly to your case);

## Main features included:

- Basic Authentication features:
  - Sign up email / password (Mobile App);
  - Sign in email / password (Mobile App);
  - Recover password process (Mobile App and Back office);
  - Authentication, using oauth github provider or oauth google provider (Mobile App);
  - Logout (Mobile App and Back office);
  - Update user account (Mobile App);
- Initial Back office automatically generated from supabase database schema (customizations may be needed for each case);
- Possibility to generate custom pages using a rich text editor (wysiwyg) that stores the corresponding html in the database (Back office);
- "Terms and conditions" an "Privacy policy" screens using Back office feature mentioned in previous point. Content for those screens should be configured using Back office. (Mobile App);
- Base pipelines (customizations will be needed for each project);

## Goals

The goal for this project is to supply some recipes with code that is usually repeated from project to project, optimizing Mobiweb processes to start new products for our clients.

With this, we aim to stand out in a competitive market, while keeping our quality high and our clients happy.

## Repository structure

This repository is composed by 3 main folders/projects:

- supabase: configurations needed for supabase database and integration with our applications;
- RNMobileApp: mobile application using bare react-native;
- BackofficeCMS: Single Page Application (web) for an auto generated Back office from supabase database, offering the possibility for **Admins** to change some data directly;

## Getting Started - TLDR

**If you are a beginner on the technologies mentioned above, do not skip the next sections. It is recommended that you first read "Detailed Overview" section and then go back here.**

This section is a quick overview of the steps needed to start working with this repository, a base knowledge on the technologies mentioned is assumed:

### Fork this repository to your own project

Follow bitbucket instructions to fork the repository and clone it to your machine, open a terminal in the root of your repository.

### Supabase integrations

Go to [Supabase Dashboard](https://supabase.com/dashboard) and **create your supabase remote project**. If you, for now, want to use it locally only, skip this section and read **"Detailed Overview"** section.

**Note: Do not forget the database password defined while creating the project, it will be needed. And make sure you store it safely.**

Access your keys at **Project Settings -> API**:

- Project URL;
- Anon key at Project API Keys;

Go to **supabase** folder:

```sh
cd supabase
```

Create a **.env** file with same content as **.env.example** and update it with keys accessed previously.

Configure Mobile project and Back Office project with configs defined at **.env** by executing:

```sh
yarn supabase-configs
```

This command will configure **supabase.configs.ts** files needed in both projects to integrate with supabase.

Now link your remote supabase project with your repository by doing:

```sh
npx supabase link --project-ref <project-id>
```

Replace <project-id> with correct value. It can be found at **Project Settings -> API**.

More information about it could be found [here](https://supabase.com/docs/guides/cli/local-development#link-your-project). If you are not logged in to supabase you need to do it by executing:

```sh
npx supabase login
```

Andd following the instructions.

Now execute:

```sh
npx supabase db push
```

It will update your remote database with **supabase/migrations**. After that you should be able to check database changes on remote project by going to its dashboard.

Your serverless database is now configured and ready to be used.

If you change your database directly on your supabase remote project using the Supabase dashboard you need to pull those changes, locally, to have the migrations updated on code and syncronise your local database:

```sh
npx supabase db pull
```

You should now find a new migration files at **supabase/migrations**. After that execute:

```sh
npx supabase db reset
```

To update you local database with last changes.

**Note: To execute some of those commands you will need to have Docker running on your machine and have executed _npx supabase start command_ to start local environment. More information about it at "Detailed Overview" section.**

#### Auth providers

To have github and google authentication working you need to configure your supabase project with needed configurations at **Authentication -> Providers** and configure **Authentication -> URL Configuration** correctly. More information about it at **"Github or Google Authentication"** and **"Deep Linking"** section.

### Mobile application

Go to **RNMobileApp** project and execute

```sh
yarn start
```

Or follow instructions at **RNMobileApp/README.md**.

### Back Office Single Page Application

Go to **RNMobileApp** project and execute

```sh
yarn dev
```

And open [http://localhost:5173/](http://localhost:5173/).

### Pipelines

You may not want to use the default pipelines here. If that is the case remove **bitbucket-pipelines.yml** or adapt steps as you need. Below there is a **Pipelines and deployment** section explaining it in detail.

# Detailed Overview

## Supabase

Supabase is an open source Firebase alternative. Start your project with a Postgres database, Authentication, instant APIs, Edge Functions, Realtime subscriptions, Storage, and Vector embeddings.

### Local development

The following content is based on the official guide [here](https://supabase.com/docs/guides/cli/local-development).

Make sure you have Docker installed and running. Sometimes you may have some conflicts between old containers or images and need to stop some containers and/or remove images.

**Only execute those command if you are sure that you can eliminate all containers and/or images. Probably we do not need to use both commands, or you only need the first**.

```sh
docker stop $(docker ps -a -q)
```

```sh
docker rmi -f $(docker images -aq)
```

If you need to remove all volumes run (this will remove all database/data storages inside docker):

```sh
docker volume rm $(docker volume ls -q --filter dangling=true)
```

Go to **supabse** folder and execute:

```sh
npx supabase start
```

This will take some time and will start useful tools, namely:

- Supabase Studio at [https://localhost:54323](https://localhost:54323), the same as Supabase Dashboard in the cloud;
- Inbucket application at [https://localhost:54324](https://localhost:54324). In local environment supabase will not sends emails, but they will be available at this application for you to test it locally;

Needed keys and database access are shared when the starting process is done.

For local development you want to create a **.env** file with supabase variables needed to integrate your mobile and back office application with your local supabase environment by using:

```sh
SUPABASE_URL=http://localhost:54321
SUPBASE_API_KEY=ANON_KEY_SUPPLIED_IN_THE_END_OF_START_PROCESS_HERE
```

Now run

```sh
yarn supabase-configs
```

And both applications will be configured to use local supabase. For more details read **supabase/README.md**.

### Database

Now that you have a postgres database running locally, we need to execute initial sql to have initial tables and functions.

#### Database Migrations

To start you have some migrations at **migrations** folder.

The first migration **migrations/\*\_user_auth_management_starter.sql** is the structure needed for authentication. You may want to update columns for **profiles** table according to your project requirements.

Then we have two migrations that create two functions:

- get_all_table_name (**migrations/\*\_list_tables_function.sql**);
- get_types (**migrations/\*\_get_table_types.sql**);

To be used at Back office web app to auto generate needed pages for each table existing in **public** database schema.

For **Custom page** feature you can find the following migrations to create **custom_pages** table, preparing specific data for "Terms and conditions" and "Privacy policy" cases, and configure needed policies:

- **20230918092251_add_custom_pages_table.sql**;
- **20230918092742_add_initial_custom_pages_rows.sql**;
- **20230918105318_custom_pages_policies.sql**;

To apply those migrations on your local supabase database execute:

```sh
npx supabase db reset
```

After this command is executed with success you can go to [Dashboard Studio](https://localhost:54323) and at **Database** check the new tables, functions, triggers and storage.

You could also create your tables directly from [Dashboard Studio](https://localhost:54323) following the intuitive UI it offers. However, if you do that do not forget to follow the instructions [here](https://supabase.com/docs/guides/cli/local-development#diffing-changes) to have your migrations generated as code. This is important to have syncronized with other members of the team and in cases you need to bootstrap everything again or migrate to different environments.

Now your local database is configured and ready to be used.

##### Create migrations

To create a new migration, locally, you need to execute:

```sh
npx supabase migration new migration_name
```

A new file at **supabase/migrations** will be created for you to fill it with desired sql code.

After that you should execute:

```sh
npx supabase db reset
```

You can find documentation about migration commands [here](https://supabase.com/docs/reference/cli/supabase-migration-new).

#### Syncronize with remote supabase project

In case you already have a remote supabase project you should link it with your repository by doing:

```sh
npx supabase link --project-ref <project-id>
```

Replace <project-id> with correct value. It can be found at **Project Settings -> API**.

More information about it could be found [here](https://supabase.com/docs/guides/cli/local-development#link-your-project).

**Note:** If you are not, you first need to be authenticated to supabase cloud through the terminal by executing the following command and following the instructions:

```sh
npx supabase login
```

And then execute:

```sh
npx supabase db push
```

It will update your remote database with **supabase/migrations**. After that you should be able to check database changes on remote project by going to its dashboard.

In the opposite direction, to update you local database with changes from remote project. You also need to _pull_ those changes to remote project, if you have it, using:

```sh
npx supabase db pull
```

### Supabase security

Security is very important and should ensure that no bad actor has access to our information in any way.

We should never forget that protecting our systems on frontend is never enough. **It must always be protected on backend and database layers as well**.

For that supabase and postgres offer **[Row lever security](https://supabase.com/docs/learn/auth-deep-dive/auth-row-level-security)** and **[Policies](https://supabase.com/docs/learn/auth-deep-dive/auth-policies)** features that allow us to configure who is able to access our data at database layer.

Initial this project is configured to have a **roles** system. At **supabase/migrations/20230918101007_add_profile_roles** you can find a migration that adds to **profiles** table a **roles** column, which is an array of strings.

The current code assumes the existence of one role: **ADMIN**. This role is used for Back office users.

At **supabase/migrations/20230918103312_check_permissions_function** you will find the creation of a function called **check_user_permission** that could be used at policies to restrict database operations according to user roles.

You can find an example of its usage at **supabase/migrations/20230918105318_custom_pages_policies** where custom pages are public for read but only an ADMIN user can insert or update a custom page:

```sql
CREATE POLICY "public read access for custom_pages"
ON public.custom_pages
FOR SELECT USING (
  true
);

CREATE POLICY "insert only for ADMIN users for custom_pages"
ON public.custom_pages
FOR INSERT
TO authenticated WITH CHECK (check_user_permission(auth.uid(), array['ADMIN']));

CREATE POLICY "update only for ADMIN users for custom_pages"
ON public.custom_pages
FOR UPDATE
TO authenticated USING (check_user_permission(auth.uid(), array['ADMIN'])) WITH CHECK (check_user_permission(auth.uid(), array['ADMIN']));
```

For more details about this implementation we recommend you to read this article [here](https://medium.com/@jimmyruann/row-level-security-custom-permission-base-authorization-with-supabase-91389e6fc48c).

You will also find configuration to only allow ADMIN users to update roles, to avoid having anyone to be able to change their roles to ADMIN. For this case a trick suggest [here](https://stackoverflow.com/a/71167428) was used.

You find more about policies [here](https://supabase.com/docs/learn/auth-deep-dive/auth-policies).

## Deep Linking

For authentication process to work well on mobile, deep linking was implemented for the following features:

- Reset password (email link redirect to mw://recoverpassword);
- Github sign in (after github authentication, user is redirected to mw://signin/github);
- Email confirmation after signup (confirmation email link redirect to mw://signup);
- Google sign in using web oauth (after google authentication, user is redirected to mw://signin/google);

For that **mw** scheme was defined for the application (below follow instructions to change the scheme for your application);

For the redirects to work well you need to go to your supabase remote project at **Authentication -> URL Configuration -> Redirect URLs** and add:

- mw://recoverpassword;
- mw://signin/github;
- mw://signup;
- mw://signin/google;

Anytime you have any different **redirect URL** related with supabase authentication you need to add it here. The same for needed URLs related with Back office.

**Note:** If you change the **scheme** of your application, update the URLs accordingly.

More about deep linking [here](https://reactnavigation.org/docs/deep-linking/). You should not need to do any extra configuration than what is already done in this repository.

### Change scheme application

You should update the **scheme** of your application, instead of using **mw**. For that you need to do the following:

**Android**:
Look for **android:scheme="mw"** at **android/app/src/main/AndroidManifest.xml** and change **mw** to your scheme;

**iOS**:
Look for **CFBundleURLSchemes** at **ios/RNMobileApp/Info.plist** and change **mw** to your scheme;

On **RNMobileApp** project look for all references to **mw://** and change it accordingly.

## Github or Google Authentication

For github authentication to work you need to create a github application and configure it at **Authentication -> Providers -> Github** on your supabase remote project dashboard.

Follow the instructions [here](https://supabase.com/docs/guides/auth/social-login/auth-github#create-a-github-oauth-app).

For google authentication you need to create a OAuth Client Id and configure **Authentication -> Providers -> Google** on your supabase remote project dashboard.

**Note:** This example is not using Android Native sign in, but web oauth.

Follow the instructions [here](https://supabase.com/docs/guides/auth/social-login/auth-google#configuration-web).

In mobile for the authentication to work some more work is required since we need to show the provider authentication page as in this example for github (screens/Auth/Auth.tsx):

```tsx
import * as WebBrowser from "expo-web-browser";

const { error, data } = await supabase.auth.signInWithOAuth({
  provider: "github" /* "google" */,
  options: {
    redirectTo: "mw://signin/github" /* "mw://signin/google" */,
  },
});

if (data.url) {
  WebBrowser.openBrowserAsync(data.url);
}
```

We are using **expo-web-browser** library to open provider page.

Then at **App.tsx** we are listening to deep link events and update supabase session when **access_token** and **refresh_token** parameters are passed:

```tsx
useEffect(() => {
  Linking.addEventListener("url", (event) => {
    let urlString = event.url.replace("#", "?");
    const url = new URL(urlString);

    const refreshToken = url.searchParams.get("refresh_token");
    const accessToken = url.searchParams.get("access_token");

    if (accessToken && refreshToken) {
      supabase.auth
        .setSession({
          refresh_token: refreshToken,
          access_token: accessToken,
        })
        .then(() => {
          if (
            url.hostname === "signin" &&
            ["/github", "/google"].includes(url.pathname)
          ) {
            WebBrowser.dismissBrowser();
          }
        })
        .catch((err) => console.log({ err }));
    }
  });
  return () => {
    Linking.removeAllListeners("url");
  };
}, []);
```

In some situation we also close the pending open browser, like for github and google web oauth authentications:

```tsx
WebBrowser.dismissBrowser();
```

## Mobile Application

The **RNMobileAPP** folder is a bare react-native project already configured to support expo modules because some modules were useful to implement some features like web oauth authentication.

This is a simple application with base examples for the following features:

- Sign up email / password;
- Sign in email / password;
- Recover password process;
- Authentication using github provider and google provider (web oauth);
- Update user account;
- Logout;
- Terms and conditions screen (configurable using Back office);
- Privacy policy screen (configurable using Back office);

Being the important code in the following files:

- **App.tsx**: application entry where deep linking listeners are configured, supabase session state is defined, and a minimal stack navigation is configured;
- **screens/Auth/Auth.tsx**: examples with code needed for authentication features mentioned above;
- **screens/Account/Account.tsx**:form example for user to update account information and logout;
- **screens/CustomPage/CustomPage.tsx**: used to fetch a custom page from database and show the corresponding html as native elements, using [react-native-render-html](https://meliorence.github.io/react-native-render-html/) library;
- **screens/TermsAndConditions/TermsAndConditions.tsx**: uses **CustomPage** for Terms and conditions;
- **screens/PrivacyPolicy/PrivacyPolicy.tsx**: uses **CustomPage** for Privacy policy;

No visual details or user experience optimizations were considered and it should be updated from project to project according to requirements.

### Local development

Go to **RNMobileApp** project and execute

```sh
yarn start
```

Or follow instructions at **RNMobileApp/README.md**.

## Back office - Single Page Application (Web)

For the Back office we are using **ReactJs** with **Vite** bundler.

To help us build this back office we use **[react-admin](https://marmelab.com/react-admin/)** library, trying to make it an auto generated back office from our postgres database with some configurations possible to be done using json.

For more advanced configurations **[react-admin](https://marmelab.com/react-admin/documentation.html)** documentation should be followed and according code implemented.

Being the important code in the following folders and files:

- **App.tsx**: application entry where back office is configured with information fetched about database schema. Beside that, other routes are defined here for recover password process;
- **components folder**: base components to generate inputs, fields, forms, lists and others to back office;
- **configs folder**: where override configurations are done (explained below);
- **pages/ForgotPasswordForm/ForgotPasswordForm.tsx**: component for page with form used to recover password;
- **pages/UpdatePasswordForm/UpdatePasswordForm.tsx**: component for page with form used to update password;

### Back office configurations

At **configs/configs.ts** we can defined some overrides to our back office.

Here we have an example that defines some **columns** to not be presented for all tables/resources, as well as some input types (**"none"** is used for us to be able to not show some **columns** for specific resources as you can find in the example for **slug** at **custom_pages** table while in **edit** mode).

You can also find the **rich_text** type being used for **content** column at **custom_pages**. With that we are telling that we want to replace the regular text field with a rich text editor. For that we use **[ra-input-rich-text](https://marmelab.com/react-admin/RichTextInput.html)** library.

Another custom type is **select** being used in the example to define a select for **roles**, in regard to **profiles** table, making it possible for an ADMIN user to edit the roles for another user.

```tsx
import { AdminOverrides, InputType, ViewMode } from "../types";

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
        roles: {
          type: "select",
          options: rolesOptions,
        },
      },
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
```

### Local development

Go to **RNMobileApp** project and execute

```sh
yarn dev
```

And open [http://localhost:5173/](http://localhost:5173/).

### Pipelines and deployment

TO BE DONE

Vercel integration: https://vercel.com/guides/how-can-i-use-bitbucket-pipelines-with-vercel

Environment vars in staging only
