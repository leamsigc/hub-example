<!-- Table.vue.template -->

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
import { useTagCrud } from "~/composables/useTagCrud";

const { tagList, getTagList, HandleEditTag, HandleDeleteTag } = useTagCrud();
await getTagList();

const dialog = ref(false);

const { handleSubmit, isSubmitting, setFieldValue } = useForm({
  // Assume validation schema is generated from Drizzle schema
  validationSchema: getValidationSchemaFromDrizzle("tag"),
});

const OpenEditTag = (tag: Tag) => {
  Object.keys(tag).forEach((key) => {
    setFieldValue(key, tag[key] || "");
  });
};

const onSubmit = handleSubmit(async (values) => {
  const formattedNewTag = { ...values };
  const { status, error } = await HandleEditTag(formattedNewTag as unknown as Tag);
  if (status.value === "success") {
    dialog.value = false;
    useToast().toast({
      title: "Tag updated",
      description: "Tag updated successfully",
      variant: "success",
      icon: "lucide:check",
    });
  }
  else {
    useToast().toast({
      title: "Can't update Tag",
      description: error.value.data.message,
      variant: "destructive",
      icon: "lucide:badge-x",
    });
  }
});
</script>

<template>
  <UiDialog v-model:open="dialog">
    <div class="overflow-x-auto rounded-md border pb-4">
      <UiDialogContent
        class="sm:max-w-md"
        title="Update the Tag"
        description="Please fill in the form below to update the Tag"
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
              <!-- Assume form fields are generated from Drizzle schema -->
              <FormGenerator :schema="getFormSchemaFromDrizzle('tag')" />
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
        <UiTableCaption>A list of all available Tags</UiTableCaption>
        <UiTableHeader>
          <UiTableRow>
            <!-- Assume table headers are generated from Drizzle schema -->
            <UiTableHead
              v-for="(column, index) in getTableHeadersFromDrizzle('tag')"
              :key="index"
            >
              {{ column }}
            </UiTableHead>
            <UiTableHead>Action</UiTableHead>
          </UiTableRow>
        </UiTableHeader>
        <UiTableBody class="last:border-b">
          <template
            v-for="item in tagList"
            :key="item.id"
          >
            <UiTableRow>
              <!-- Assume table cells are generated from Drizzle schema -->
              <UiTableCell
                v-for="(value, index) in item"
                :key="index"
              >
                {{ value }}
              </UiTableCell>
              <UiTableCell class="text-right">
                <UiDialogTrigger>
                  <UiButton
                    class="mr-2 text-sm p-0 rounded w-6 h-6"
                    variant="outline"
                    @click="OpenEditTag(item)"
                  >
                    <Icon name="lucide:edit" />
                  </UiButton>
                </UiDialogTrigger>
                <UiButton
                  variant="default"
                  class="mr-2 text-sm p-0 rounded w-6 h-6 bg-red-500"
                  @click="HandleDeleteTag(item.id)"
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
