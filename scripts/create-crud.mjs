import { mkdir, readFile, writeFile } from "fs/promises";
import { dirname, join } from "path";
import { fileURLToPath } from "url";

const currentDirname = dirname(fileURLToPath(import.meta.url));

const toolsDir = join(currentDirname, "..", "app", "components");

const crudName = process.argv[2];

if (!crudName) {
  throw new Error("Please specify a crudName.");
}

const crudNameCamelCase = crudName.replace(/-./g, x => x[1].toUpperCase());
const crudNameTitleCase = crudName[0].toUpperCase() + crudName.slice(1).replace(/-/g, " ");
const toolDir = join(toolsDir, crudName);

await mkdir(toolDir);
console.log(`Directory created: ${toolDir}`);

const createToolFile = async (name, content) => {
  const filePath = join(toolDir, name);
  await writeFile(filePath, content.trim());
  console.log(`File created: ${filePath}`);
};

createToolFile(
  `${crudName}Table.vue`,
  `
<script lang="ts" setup>
/**
 *
 * Component Description:Desc
 *
 * @author Reflect-Media <reflect.media GmbH>
 * @version 0.0.1
 *
 * @todo [ ] Test the component
 * @todo [ ] Integration test.
 * @todo [✔] Update the typescript.
 */

const { ${crudNameTitleCase}All } = use${crudNameCamelCase}();
const dialog = ref(false);


const tableHeader = [
  {
    title: 'Name',
    key: 'name',
    class: ' ',
  }
];

</script>

<template>
  <UiDialog v-model:open="dialog">
    <div class="overflow-x-auto rounded-md border pb-4">
      <UiDialogContent
        class="sm:max-w-md"
        title="Update the ${crudNameTitleCase}"
        description="Please fill in the form below to update the ${crudNameTitleCase}"
      >
        <template #content>
          <form
            class="max-w-screen-sm"
            @submit="onSubmit"
          >
            <fieldset
              class="space-y-5"
              :disabled="isSubmitting"
            >
              <UiVeeInput
                label="Name"
                name="name"
              />
              <UiButton
                type="submit"
                class="mt-2 mr-2"
                :disabled="isSubmitting"
                @click="onSubmit"
              >
                Submit
              </UiButton>
              <UiDialogClose as-child>
                <UiButton variant="secondary">
                  Close
                </UiButton>
              </UiDialogClose>
            </fieldset>
          </form>
        </template>
      </UiDialogContent>
      <UiTable>
        <UiTableCaption>A list of all available ${crudNameTitleCase}</UiTableCaption>
        <UiTableHeader>
          <UiTableRow>
            <UiTableHead
              v-for="item in tableHeader"
              :key="item.key"
              :class="item.class"
            >
              {{ item.label }}
            </UiTableHead>
          </UiTableRow>
        </UiTableHeader>
        <UiTableBody class="last:border-b">
          <template
            v-for="item in ${crudNameTitleCase}All"
            :key="item.id"
          >
            <UiTableRow>
              <UiTableCell class="font-medium">
                {{ item.name }}
              </UiTableCell>
              <UiTableCell class="text-right">
                <UiDialogTrigger>
                  <UiButton
                    class="mr-2 text-sm p-0 rounded w-6 h-6"
                    variant="outline"
                    @click="OpenEdit${crudNameTitleCase}(item)"
                  >
                    <Icon name="lucide:edit" />
                  </UiButton>
                </UiDialogTrigger>
                <UiButton
                  variant="default"
                  class="mr-2 text-sm p-0 rounded w-6 h-6 bg-red-500"
                  @click="HandleDelete${crudNameTitleCase}(category.id)"
                >
                  <Icon name="lucide:trash" />
                </UiButton>
              </UiTableCell>
            </UiTableRow>
          </template>
        </UiTableBody>
      </UiTable>
    </div>
  </UiDialog>
</template>

<style scoped >

</style>
`,
);

createToolFile(
  "index.ts",
  `
import { ArrowsShuffle } from '@vicons/tabler';
import { defineTool } from '../tool';

export const tool = defineTool({
  name: '${crudNameTitleCase}',
  path: '/${crudName}',
  description: '',
  keywords: ['${crudName.split("-").join("', '")}'],
  component: () => import('./${crudName}.vue'),
  icon: ArrowsShuffle,
  createdAt: new Date('${new Date().toISOString().split("T")[0]}'),
});
`,
);

createToolFile(`${crudName}.service.ts`, "");
createToolFile(
  `${crudName}.service.test.ts`,
  `
import { expect, describe, it } from 'vitest';
// import { } from './${crudName}.service';
//
// describe('${crudName}', () => {
//
// })
`,
);

createToolFile(
  `${crudName}.e2e.spec.ts`,
  `
import { test, expect } from '@playwright/test';

test.describe('Tool - ${crudNameTitleCase}', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/${crudName}');
  });

  test('Has correct title', async ({ page }) => {
    await expect(page).toHaveTitle('${crudNameTitleCase} - IT Tools');
  });

  test('', async ({ page }) => {

  });
});

`,
);

const toolsIndex = join(toolsDir, "index.ts");
const indexContent = await readFile(toolsIndex, { encoding: "utf-8" }).then(r => r.split("\n"));

indexContent.splice(3, 0, `import { tool as ${crudNameCamelCase} } from './${crudName}';`);
writeFile(toolsIndex, indexContent.join("\n"));
console.log(`Added import in: ${toolsIndex}`);
