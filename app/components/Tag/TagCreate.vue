<!-- Create.vue.template -->

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

const { createTag } = useTagCrud();

const dialog = ref(false);
const cardIsPending = ref(false);

const { handleSubmit, isSubmitting } = useForm({
  // Assume validation schema is generated from Drizzle schema
  validationSchema: getValidationSchemaFromDrizzle("tag"),
});

const onSubmit = handleSubmit(async (values) => {
  const formattedNewTag = { ...values };
  const { status, error } = await createTag(formattedNewTag as unknown as Tag);
  if (status.value === "success") {
    dialog.value = false;
  }
  else {
    useToast().toast({
      title: "Can't create Tag",
      description: error.value.data.message,
      variant: "destructive",
      icon: "lucide:badge-x",
    });
  }
});
</script>

<template>
  <div>
    <UiDialog v-model:open="dialog">
      <UiDialogTrigger as-child>
        <UiButton variant="outline">
          New Tag
        </UiButton>
      </UiDialogTrigger>

      <UiDialogContent
        class="sm:max-w-4xl"
        title="Create new Tag"
        description="Provide the information below to create a new Tag."
      >
        <template #content>
          <section class="grid grid-cols-2 gap-4">
            <UiCardContent
              v-if="cardIsPending"
              class="grid gap-4 py-4"
            >
              <div class="grid grid-cols-4 items-center gap-4">
                <div class="flex items-center space-x-4">
                  <UiSkeleton class="h-12 w-12 rounded-full" />
                  <div class="space-y-2">
                    <UiSkeleton class="h-4 w-[450px]" />
                    <UiSkeleton class="h-4 w-[200px]" />
                    <UiSkeleton class="h-4 w-[640px]" />
                    <UiSkeleton class="h-4 w-[500px]" />
                    <UiSkeleton class="h-4 w-[400px]" />
                    <UiSkeleton class="h-4 w-[200px]" />
                  </div>
                </div>
              </div>
            </UiCardContent>
            <UiCardContent
              v-else
              v-auto-animate
              class="grid gap-2 py-4 col-span-2"
            >
              <form
                class="max-w-screen-sm"
                @submit="onSubmit"
              >
                <fieldset
                  :disabled="isSubmitting"
                  class="space-y-5"
                >
                  <!-- Assume form fields are generated from Drizzle schema -->
                  <FormGenerator :schema="getFormSchemaFromDrizzle('tag')" />
                  <UiButton type="submit">
                    Submit
                  </UiButton>
                </fieldset>
              </form>
            </UiCardContent>
          </section>
        </template>
        <template #footer />
      </UiDialogContent>
    </UiDialog>
  </div>
</template>

<style scoped></style>
