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
import { z } from "zod";
import { Field } from "vee-validate";

const { categories, getCategories, HandleEditCategory, HandleDeleteCategory } = useCategory();
await getCategories();

const dialog = ref(false);

const schema = z.object({
  id: z.number({ required_error: "Required" }),
  name: z.string({ required_error: "Required" }).min(3, { message: "Min 3 characters" }),
  description: z
    .string({ required_error: "Required" })
    .min(3, { message: "Min 3 characters" }),
  icon: z.string({ required_error: "Required" }).min(3, { message: "Min 3 characters" }),
  status: z.boolean({ required_error: "Required" }).default(true),
});
const { handleSubmit, isSubmitting, setFieldValue } = useForm({
  validationSchema: toTypedSchema(schema),
});

const OpenEditCategory = (category: Category) => {
  setFieldValue("id", category.id);
  setFieldValue("name", category.name || "");
  setFieldValue("description", category.description);
  setFieldValue("icon", category.icon);
  setFieldValue("status", category.status == "ACTIVE" ? true : false);
};

const onSubmit = handleSubmit(async (values) => {
  const formattedNewCategory = {
    id: values.id,
    name: values.name,
    description: values.description,
    icon: values.icon,
    status: values.status ? "ACTIVE" : "INACTIVE",
  };
  const { status, error } = await HandleEditCategory(formattedNewCategory as unknown as Category);
  if (status.value === "success") {
    dialog.value = false;
    useToast().toast({
      title: "Category updated",
      description: "Category updated successfully",
      variant: "success",
      icon: "lucide:check",
    });
  }
  else {
    useToast().toast({
      title: "Can't update category",
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
        title="Update the category"
        description="Please fill in the form below to update the category"
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
              <UiVeeTextarea
                label="Description"
                name="description"
                hint="Small description about the category"
              />
              <UiVeeInput
                label="Icon"
                name="icon"
              />
              <Field
                v-slot="{ handleChange, value }"
                name="status"
              >
                <div class="flex items-center gap-3">
                  <UiSwitch
                    :checked="value"
                    @update:checked="handleChange"
                  />
                  <UiLabel class="w-auto">
                    Status
                  </UiLabel>
                </div>
              </Field>

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
        <UiTableCaption>A list of all available Categories</UiTableCaption>
        <UiTableHeader>
          <UiTableRow>
            <UiTableHead class="w-[300px]">
              Name
            </UiTableHead>
            <UiTableHead>Icon</UiTableHead>
            <UiTableHead>Status</UiTableHead>
            <UiTableHead>Description</UiTableHead>
            <UiTableHead class="text-right">
              Actions
            </UiTableHead>
          </UiTableRow>
        </UiTableHeader>
        <UiTableBody class="last:border-b">
          <template
            v-for="category in categories"
            :key="category.id"
          >
            <UiTableRow>
              <UiTableCell class="font-medium">
                {{ category.name }}
              </UiTableCell>
              <UiTableCell>
                <Icon :name="category.icon" />
              </UiTableCell>
              <UiTableCell>{{ category.status }}</UiTableCell>
              <UiTableCell>{{ category.description }}</UiTableCell>
              <UiTableCell class="text-right">
                <UiDialogTrigger>
                  <UiButton
                    class="mr-2 text-sm p-0 rounded w-6 h-6"
                    variant="outline"
                    @click="OpenEditCategory(category)"
                  >
                    <Icon name="lucide:edit" />
                  </UiButton>
                </UiDialogTrigger>
                <UiButton
                  variant="default"
                  class="mr-2 text-sm p-0 rounded w-6 h-6 bg-red-500"
                  @click="HandleDeleteCategory(category.id)"
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
