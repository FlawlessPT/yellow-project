import { writeFileSync } from 'fs';

const npmrcContent = `
  always-auth=true
  @flawlesspt:registry=https://npm.pkg.github.com/
  //npm.pkg.github.com:_authToken=${process.env.NPM_AUTH_TOKEN}
  registry=https://registry.npmjs.org
`;

writeFileSync('.npmrc', npmrcContent);
console.log('.npmrc file generated successfully!');
