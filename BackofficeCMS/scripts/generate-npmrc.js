import { writeFileSync } from 'fs';

const npmAuthToken = process.env.NPM_AUTH_TOKEN || process.argv[2];

const npmrcContent = `
  always-auth=true
  @flawlesspt:registry=https://npm.pkg.github.com/
  //npm.pkg.github.com:_authToken=${npmAuthToken}
  registry=https://registry.npmjs.org
`;

writeFileSync('.npmrc', npmrcContent);
console.log('.npmrc file generated successfully!');
