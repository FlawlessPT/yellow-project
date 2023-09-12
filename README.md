# Introduction

This a repository that works as a starter for a full stack mobile application and includes a Back Office Web App.

## Main technologies:

- react-native (mobile application);
- react + vite (Back Office SPA);
- supabase (Database + Serverless Backend);
- bitbucket pipelines + Vercel;

## Main features included:

- Basic Authentication features:
  - Sign up email / password (Mobile App);
  - Sign in email / password (Mobile App);
  - Recover password process (Mobile App and Backoffice);
  - Authentication using github provider (Mobile App);
  - Logout (Mobile App and Backoffice);
  - Update user account (Mobile App);
  - Initial Back Office automatically generated from supabase database schema (customizations may be needed for each case);
  - Base pipelines (customizations may be needed for each case, for now deployment phase only considers Back Office Web App);

## Goals

This goal of this project is to supply some recipes with code that is usually repeated from project to project, optimizing Mobiweb processes to start new products for our clients.

With this, we aim to stand out in a competitive market, while keeping our quality high and our clients happy.

## Repository structure

This repository is composed by 3 main folders/projects:

- supabase: configurations needed for supabase database and integration with our applications;
- RNMobileApp: mobile application using bare react-native;
- BackofficeCMS: Single Page Application (web) for an automatically Back Office generated from supabase database, offering the possibility for admins to change some data directly;

## Getting Started - TLDR

**If you are a beginner on the technologies mentioned above, do not skip the next sections. It is recommended that you first read "Detailed Overview" section and then go back here**

This section is a quick overview of the steps needed to start working with this repository, a base knowledge on the technologies mentioned is assumed:

### Fork this repository to your own

Follow bitbucket instructions to fork the repository and clone it to your machine, and open a terminal in the root of your cloned repository.

### Supabase integrations

Go to [Supabase Dashboard](https://supabase.com/dashboard) and **create your supabase remote project**. If you, for now, want to use it locally only, skip this section and read "Detailed Overview" section.

**Note: Do not forget database password defined while creating the project, it will be needed. And make sure you will store it safely.**

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

More information about it could be found [here](https://supabase.com/docs/guides/cli/local-development#link-your-project).

Now execute:

```sh
npx supabase db push
```

It will update your remote database with **supabase/migrations**. After that you should be able to check database changes on remote project by going to its dashboard.

Your serverless database is now configured and ready to be used.

**Authentication Email templates:**

Go to **supabase/templates** folder and copy content from \*.html files to template configurations at **Authentication -> Email Templates** on your supabase dashboard.

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

You may not want to use the default pipelines here. If that is the case remove **bitbucket-pipelines.yml** or adapt steps as you need. Below there is a **Pipelines and deployment** section expalining it in detail.

# Detailed Overview

## Supabase

Supabase is an open source Firebase alternative. Start your project with a Postgres database, Authentication, instant APIs, Edge Functions, Realtime subscriptions, Storage, and Vector embeddings.

### Local development

The following content is based on the official guide [here](https://supabase.com/docs/guides/cli/local-development).

Make sure you have Docker installed and running. Sometimes you may have some conflicts between old containers or images and need to stop some containers and/or remove images.

**Only execute those command if you are sure that we can eliminate all container and/or images. Probably we do not need to use those commands or you only need the first**.

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

For local development you want to create a **.env** file with supabase variables needed to integrate your mobile and back office application with you local supabase environment by using:

```sh
SUPABASE_URL=http://localhost:54321
SUPBASE_API_KEY=ANON_KEY_SUPPLIED_IN_THE_END_OF_START_PROCESS_HERE
```

Now run

```sh
yarn supabase-configs
```

And both application will be configured to use local supabase. For more details read **supabase/README.md**.

### Database

Now that you have a postgres database running locally, we need to execute initial sql to have initial tables and functions.

## Database Migrations

To start you have some migrations at **migrations** folder.

The first migration **migrations/\*\_user_auth_management_starter.sql** is the structure needed for authentication. You may want to update columns for **profiles** table according to your project requirements.

Then we have tow migrations that create two functions:

- get_all_table_name (**migrations/\*\_list_tables_function.sql**);
- get_types (**migrations/\*\_get_table_types.sql**);

To be use at Back Office web app to auto generate needed pages for each table existing in **public** database schema.

To apply those migrations on your local supabase database execute:

```sh
npx supabase db reset
```

After this command is executed with success you can go to [Dashboard Studio](https://localhost:54323) and at **Database** check the new tables, functions, triggers and storage.

You could also create your tables directly from [Dashboard Studio](https://localhost:54323) following the intuitive UI its offers. However if you do that, do not forget to follow the instructions [here](https://supabase.com/docs/guides/cli/local-development#diffing-changes) to have your migrations generated as code. This is important to have syncronized with other members of the team and in cases you need to bootstrap everything again or migrate to different environments.

Now your local database is configured and ready to be used.

### Syncronize with remote supabase project

In case you already have a remote supabase project you should link it with your repository by doing:

```sh
npx supabase link --project-ref <project-id>
```

Replace <project-id> with correct value. It can be found at **Project Settings -> API**.

More information about it could be found [here](https://supabase.com/docs/guides/cli/local-development#link-your-project).

**Note:** If you are not, you first need to authenticated to supabase cloud through the terminal by executing the following command and following the instructions:

```sh
npx supabase login
```

And then execute:

```sh
npx supabase db push
```

It will update your remote database with **supabase/migrations**. After that you should be able to check database changes on remote project by going to its dashboard.

## Deep Linking

For authentication process to work well on mobile, deep linking was implemented for the following features:

- Reset password (email link redirect to mw://recoverpassword);
- Github sign in (after github authentication, user is redirected to mw://signin/github);
- Email confirmation after signup (confirmation email link redirect to mw://signup scheme);

For that **mw** scheme was defined for the application (below follow instructions to change the scheme for your application);

For the redirects to work well you need to go to your supabase remote project at **Authentication -> URL Configuration -> Redirect URLs** and add:

- mw://recoverpassword;
- mw://signin/github;
- mw://signup;

Anytime you have any different **redirect URL** related with supabase authentication you need to add it here.

**Note:** If you change the **scheme** of your application, update the URLs accordingly.

More about deep linking [here](https://reactnavigation.org/docs/deep-linking/). You not need to do any extra configuration than what is already done in this repository.

### Change scheme application

You should update the **scheme** of your application, instead of using **mw**. For that you need to do the following:

**Android**:
Look for **<data android:scheme="mw"/>** at **android/app/src/main/AndroidManifest.xml** and change **mw** to your scheme;

**iOS**:
Look for **CFBundleURLSchemes** at **ios/RNMobileApp/Info.plist** and change **mw** to your scheme;

On **RNMobileApp** project look for all references to **mw://** and change it accordingly.

## Github Authentication

For github authentication to work you need to create a github application and configure it at **Authentication -> Providers -> Github** on your supabase remote project dashboard.

Follow the instructions [here](https://supabase.com/docs/guides/auth/social-login/auth-github#create-a-github-oauth-app).

This process should be similar for all auth providers.

In mobile for the authentication to work some more work is required since we need to show the provider authentication page as in this example for github (components/auth.tsx):

```tsx
import * as WebBrowser from "expo-web-browser";

const { error, data } = await supabase.auth.signInWithOAuth({
  provider: "github",
  options: {
    redirectTo: "mw://signin/github",
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
          if (url.hostname === "signin" && url.pathname === "/github") {
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

In some situation we also close the pending open browser, like for github authentication:

```tsx
WebBrowser.dismissBrowser();
```

## Mobile Application

The **RNMobileAPP** folder is a bare react-native project already configured to support expo modules because some modules were useful to implement some features like github authentication.

This is a simple application with base examples for the following features:

- Sign up email / password;
- Sign in email / password;
- Recover password process;
- Authentication using github provider;
- Update user account;
- Logout;

Being the important code in the following files:

- **App.tsx**: application entry were deep linking listeners are configured and supabase session state is defined;
- **components/Auth.tsx**: examples with code needed for authentication features mentioned above;
- **components/Account.tsx**:form example for user to update account information and logout;

No visual details our user experience optimizations were considered and it should be updated from project to project according to requirements.

### Local development

Go to **RNMobileApp** project and execute

```sh
yarn start
```

Or follow instructions at **RNMobileApp/README.md**.

## Back Office - Single Page Application (Web)

TO BE DONE -- technical information

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
