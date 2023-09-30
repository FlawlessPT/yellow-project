const fs = require("fs");
require("dotenv").config({ path: ".env" });

const configsFilePath = process.argv[2];
const mock = Boolean(process.argv[3]);

const supabaseProjectURL = mock ? "mock" : process.env.SUPABASE_URL;
const supabaseAnonKey = mock ? "mock" : process.env.SUPABASE_API_KEY;

console.log("SUPABASE_URL: ", supabaseProjectURL);
console.log("SUPBASE_API_KEY: ", supabaseAnonKey);

function createConfigsFile() {
  const writeStream = fs.createWriteStream(configsFilePath);
  writeStream.write(
    `export const supabaseProjectURL = '${supabaseProjectURL}';\n`
  );
  writeStream.write(`export const supabaseAnonKey = '${supabaseAnonKey}';\n`);
  writeStream.end();
  console.log("Configs file was created.");
}

if (supabaseProjectURL && supabaseAnonKey) {
  fs.stat(configsFilePath, function (err) {
    if (err) {
      createConfigsFile();
    } else {
      fs.unlink(configsFilePath, function (err) {
        if (err) return console.log(err);
        console.log(
          `${configsFilePath} file deleted successfully. A new one will be created.`
        );

        createConfigsFile();
      });
    }
  });
} else {
  console.err(
    "Not all needed environment variables were defined: SUPABASE_URL, SUPBASE_API_KEY"
  );
}
