import { mkdir, readFile, writeFile } from "fs/promises";
import { dirname, join } from "path";
import { fileURLToPath } from "url";

const currentDirname = dirname(fileURLToPath(import.meta.url));
const rootDir = join(currentDirname, "../");
const templatesDir = join(currentDirname, "./templates");

const crudName = process.argv[2]; // e.g., "user"

if (!crudName) {
  throw new Error("Please specify a crudName.");
}

function kebabCase(str) {
  return str
    .toLowerCase()
    .replace(/\s+/g, "-") // replace one or more spaces with a single dash
    .replace(/[^\w-]+/g, ""); // remove any non-word characters (except dashes)
}

function camelCase(str) {
  return str
    .toLowerCase()
    .replace(/\s+|[-_]+/g, "") // replace spaces, dashes, or underscores with a single space
    .split(" ")
    .map((word, index) => (index === 0 ? word : word.charAt(0).toUpperCase() + word.slice(1)))
    .join("");
}

function pascalCase(str) {
  return camelCase(str)
    .charAt(0)
    .toUpperCase() + camelCase(str).slice(1);
}
const crudNameKebab = kebabCase(crudName);
const crudNameCamel = camelCase(crudName);
const crudNamePascal = pascalCase(crudName);

// UI related templates
const componentsDir = join(rootDir, `./app/components/${crudNamePascal}`);
const usersTableFile = join(componentsDir, `${crudNamePascal}Table.vue`);
const userCreateFile = join(componentsDir, `${crudNamePascal}Create.vue`);
const userUpdateFile = join(componentsDir, `${crudNamePascal}Update.vue`);

// Composables
const composablesDir = join(rootDir, "./app/composables");
const useUserCrudFile = join(composablesDir, `use${crudNamePascal}Crud.ts`);

// Server API
const serverApiDir = join(rootDir, "./server/api/v1");
const apiCrudDir = join(serverApiDir, crudNameKebab);
const apiIndexGetFile = join(apiCrudDir, "index.get.ts");
const apiIndexPostFile = join(apiCrudDir, "index.post.ts");
const apiIdPutFile = join(apiCrudDir, "[id].put.ts");
const apiIdDeleteFile = join(apiCrudDir, "[id].delete.ts");

// Server Utils
const serverUtilsDir = join(rootDir, "./server/utils");
const userUtilsFile = join(serverUtilsDir, `${crudNameKebab}.ts`);

// Create directories if not exist
await mkdir(componentsDir, { recursive: true });
await mkdir(composablesDir, { recursive: true });
await mkdir(serverApiDir, { recursive: true });
await mkdir(apiCrudDir, { recursive: true });
await mkdir(serverUtilsDir, { recursive: true });

// Create files using templates
const createFile = async (filePath, templateFile) => {
  const templatePath = join(templatesDir, templateFile);
  const content = await readFile(templatePath, { encoding: "utf-8" });
  const replacedContent = content
    .replace(/{{crudNameKebab}}/g, crudNameKebab)
    .replace(/{{crudNameCamel}}/g, crudNameCamel)
    .replace(/{{crudNamePascal}}/g, crudNamePascal);
  await writeFile(filePath, replacedContent.trim());
  console.log(`File created: ${filePath}`);
};

// UI Templates
createFile(usersTableFile, "Table.vue.template");
createFile(userCreateFile, "Create.vue.template");
createFile(userUpdateFile, "Update.vue.template");

// Composables
createFile(useUserCrudFile, "useCrud.ts.template");

// Server API
createFile(apiIndexGetFile, "index.get.ts.template");
createFile(apiIndexPostFile, "index.post.ts.template");
createFile(apiIdPutFile, "[id].put.ts.template");
createFile(apiIdDeleteFile, "[id].delete.ts.template");

// Server Utils
createFile(userUtilsFile, "db.ts.template");
