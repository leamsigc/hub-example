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

const dialog = ref(false);
const cardIsPending = ref(false);

const schema = z.object({
  name: z.string({ required_error: "Required" }).min(3, { message: "Min 3 characters" }),
  description: z.string({ required_error: "Required" }).min(3, { message: "Min 3 characters" }),
  icon: z.string({ required_error: "Required" }).min(3, { message: "Min 3 characters" }),
  status: z.boolean({ required_error: "Required" }).default(false),
});

const { handleSubmit, isSubmitting } = useForm({
  validationSchema: toTypedSchema(schema),
});

const onSubmit = handleSubmit(async (values) => {
  console.log(values);
});
</script>

<template>
  <div>
    <UiDialog v-model:open="dialog">
      <UiDialogTrigger as-child>
        <UiButton variant="outline">
          New Category
        </UiButton>
      </UiDialogTrigger>

      <UiDialogContent
        class="sm:max-w-4xl"
        title="Create new category"
        description="Provide the information below to create a new category."
      >
        <template #content>
          <section class="grid grid-cols-2 gap-4">
            <UiCardContent
              v-if="cardIsPending"
              class="grid gap-4 py-4"
            >
              <div
                class="grid grid-cols-4 items-center gap-4"
              >
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
                  <div class="flex items-center space-x-2">
                    <UiSwitch id="status" />
                    <UiLabel for="status">
                      Status
                    </UiLabel>
                  </div>

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

<style scoped>

</style>
