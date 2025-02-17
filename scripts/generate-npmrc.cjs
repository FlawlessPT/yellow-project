const { writeFileSync } = require("fs");

// This token is either grabbed from the environment variables (through vercel ci/cd) or passed as an argument (when running locally)
const npmAuthToken = process.env.NPM_AUTH_TOKEN || process.argv[2];

const npmrcContent = `always-auth=true
@flawlesspt:registry=https://npm.pkg.github.com/
//npm.pkg.github.com/:_authToken=${npmAuthToken}
registry=https://registry.npmjs.org
`;

// write file to .npmrc in BackOfficeCMS
writeFileSync("./BackofficeCMS/.npmrc", npmrcContent);

// write file to .npmrc in RNMobileApp
writeFileSync("RNMobileApp/.npmrc", npmrcContent);

// write file to .npmrc in common
writeFileSync("common/.npmrc", npmrcContent);

console.log("[yellow-setup] .npmrc file generated successfully!");
