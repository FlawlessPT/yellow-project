# Introduction

This a repository that works as a starter for a full stack mobile application and includes a Back Office Web App.

## Main technologies:

- react-native (mobile application);
- react + vite (Back Office SPA);
- supabase (Database + Serverless Backend);
- bitbucket pipelines + Vercel;

## Main features included:

- Basic Authentication features:
  - Sign up email / password;
  - Sign in email / password;
  - Recover password process;
  - Authentication using provider like github, facebook, etc (TO BE DONE);
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

Go to **supabase/templates** folder and copy content from \*.html files to template configurations at "Authentication -> Email Templates" on your supabase dashboard.

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

### Pipelines and deployment

TO BE DONE

# Detailed Overview

## Supabase

TODO: explain here process to integrate with supabase using supabase.configs.example.ts at RNMobileApp/lib

### Database

Update if needed "/supabase/migrations/\*\_user_auth_management_starter.sql"

### Local development

## Mobile Application

## Back Office - Single Page Application (Web)
