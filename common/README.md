# Yellow Common

Yellow common package to share logic between web and mobile app

# Getting github packages connectivity

1. Follow the instructions [here](https://docs.github.com/en/authentication/keeping-your-account-and-data-secure/creating-a-personal-access-token)
   to create a personal access token with necessary [permissions](https://docs.github.com/en/packages/learn-github-packages/about-permissions-for-github-packages#about-scopes-and-permissions-for-package-registries).
   If you dont want to be bothering to renew the token you can create one without expiration.

2. Run **`npm login --scope=@FlawlessPT --auth-type=legacy --registry=https://npm.pkg.github.com`**

3. Insert your username and the token you generated, make sure you copy the token when you create it because you wont have access to it again.

# Publishing the package

1. Increment version @ package.json
2. Run **`yarn build`** and **`yarn publish`**

# Running Yellow Common localy

1. Run **`yarn start`**
2. Run **`wml start`**
