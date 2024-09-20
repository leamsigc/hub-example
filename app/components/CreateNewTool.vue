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

 {
  "categories": ["cat1", "cat2", "cat3"],
    "tool": {
        "name": "Tool 1",
        "url": "https://example.com",
        "description":"This is a description",
        "likes":0,
        "tags": "tag1, tag2, tag3",
        "pricing": "free"
    }
}

 */
import { z } from "zod";

import * as zod from "zod";

const validationSchema = toTypedSchema(
  zod.object({
    name: z.string().min(1, "Please enter a name."),
    url: z.string().min(1, "Please enter a url."),
    description: z.string().min(1, "Please enter a description."),
    tags: z.array(z.string()).min(1, "Please enter at least one tags."),
    pricing: z.string().min(1, "Please select a pricing."),
    image: z.string().min(1, "Please enter a image url."),
    categories: z.string().min(1, "Please enter at least one category."),
    likes: z.number().min(1, "Please enter at least one like."),
  }),
);

const { handleSubmit, errors, setFieldValue } = useForm({ validationSchema });
const cardIsPending = ref(false);

const onSubmit = handleSubmit((values) => {
  console.log(values);
  console.log("Request to create new tool ");

  // Send request to server
  cardIsPending.value = true;

  const { status } = useFetch("/api/tools", {
    method: "PUT",
    body: values,
  });
  if (status.value === "success") {
    closeDialog(true);
  }
  else {
    closeDialog(false);
  }
});

const { value: name } = useField<string>("name");
const { value: url } = useField<string>("url");
const { value: description } = useField<string>("description");
const { value: tags } = useField<string[]>("tags");
const { value: pricing } = useField<"basic" | "premium" | "freemium">("pricing");
const { value: likes } = useField("likes");
const { value: categories } = useField<string>("categories");
const { value: image } = useField<string>("image");

setFieldValue("image", "/baby.webp");

const dialog = ref(false);

const closeDialog = (save: boolean) => {
  useToast().toast({
    title: save ? "Created new tool successfully" : "Tool can't be created",
    description: `Your changes has been ${save ? "saved" : "discarded"}.`,
    duration: 5000,
    icon: save ? "lucide:check" : "lucide:x",
  });
  cardIsPending.value = false;
  dialog.value = false;
};
const categoriesOptions = ["Ai", "Image", "Video"];
</script>

<template>
  <div class="inline-flex items-center justify-center">
    <UiDialog v-model:open="dialog">
      <UiDialogTrigger as-child>
        <UiButton variant="outline">
          New Tool
        </UiButton>
      </UiDialogTrigger>

      <UiDialogContent
        class="sm:max-w-4xl"
        title="Create new tool"
        description="Provide the information below to create a new tool."
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
              as="form"
              class="grid gap-4 py-4"
            >
              <div class="grid grid-cols-4 items-center gap-4">
                <UiLabel
                  for="categories"
                  class="text-right"
                >
                  Categories
                </UiLabel>

                <div
                  class="col-span-3 w-full"
                >
                  <UiSelect
                    v-model="categories"
                    name="categories"
                  >
                    <UiSelectTrigger placeholder="Select an option" />
                    <UiSelectContent class="bg-white rounded">
                      <UiSelectLabel>Options</UiSelectLabel>
                      <UiSelectSeparator />
                      <UiSelectGroup>
                        <UiSelectItem
                          v-for="(option, i) in categoriesOptions"
                          :key="i"
                          :value="option"
                          :text="option"
                        />
                      </UiSelectGroup>
                    </UiSelectContent>
                  </UiSelect>
                </div>
                <div
                  v-if="errors.categories"
                  class="text-red-500 text-center col-span-4"
                >
                  {{ errors.categories }}
                </div>
              </div>
              <div class="grid grid-cols-4 items-center gap-4">
                <UiLabel
                  for="name"
                  class="text-right"
                >
                  Name
                </UiLabel>
                <UiInput
                  id="name"
                  v-model="name"
                  name="name"
                  required
                  class="col-span-3"
                  placeholder="Tool name..."
                />
                <div
                  v-if="errors.name"
                  class="text-red-500 text-center col-span-4"
                >
                  {{ errors.name }}
                </div>
              </div>
              <div class="grid grid-cols-4 items-center gap-4">
                <UiLabel
                  for="image"
                  class="text-right"
                >
                  Image url
                </UiLabel>
                <UiInput
                  id="image"
                  v-model="image"
                  name="image"
                  required
                  class="col-span-3"
                  placeholder="Tool image url..."
                />

                <div
                  v-if="errors.image"
                  class="text-red-500 text-center col-span-4"
                >
                  {{ errors.image }}
                </div>
              </div>
              <div class="grid grid-cols-4 items-center gap-4">
                <UiLabel
                  for="url"
                  class="text-right"
                >
                  url
                </UiLabel>
                <UiInput
                  id="url"
                  v-model="url"
                  name="url"
                  required
                  class="col-span-3"
                  placeholder="Tool url..."
                />

                <div
                  v-if="errors.url"
                  class="text-red-500 text-center col-span-4"
                >
                  {{ errors.url }}
                </div>
              </div>
              <div class="grid grid-cols-4 items-center gap-4">
                <UiLabel
                  for="description"
                  class="text-right"
                >
                  Description
                </UiLabel>
                <UiTextarea
                  id="description"
                  v-model="description"
                  name="description"
                  class="col-span-3"
                  placeholder="Tool description..."
                  type="textarea"
                />

                <div
                  v-if="errors.description"
                  class="text-red-500 text-center col-span-4"
                >
                  {{ errors.description }}
                </div>
              </div>
              <div class="grid grid-cols-4 items-center gap-4">
                <UiLabel
                  for="tags"
                  class="text-right"
                >
                  Tags
                </UiLabel>
                <UiTagsInput
                  id="tags"
                  v-model="tags"
                  name="tags"
                  class="col-span-3"
                >
                  <UiTagsInputItem
                    v-for="tag in tags"
                    :key="tag"
                    :value="tag"
                  />
                  <UiTagsInputField placeholder="Add a tag..." />
                  <UiTagsInputClear />
                </UiTagsInput>

                <div
                  v-if="errors.tags"
                  class="text-red-500 text-center col-span-4"
                >
                  {{ errors.tags }}
                </div>
              </div>
              <div class="grid grid-cols-4 items-center gap-4">
                <UiLabel
                  for="pricing"
                  class="text-right"
                >
                  Pricing
                </UiLabel>
                <div
                  class="col-span-3 w-full"
                >
                  <UiSelect
                    v-model="pricing"
                    name="pricing"
                  >
                    <UiSelectTrigger placeholder="Select an option" />
                    <UiSelectContent class="bg-white rounded">
                      <UiSelectSeparator />
                      <UiSelectGroup>
                        <UiSelectItem
                          v-for="(option, i) in ['premium', 'basic', 'freemium']"
                          :key="i"
                          :value="option"
                          :text="option"
                        />
                      </UiSelectGroup>
                    </UiSelectContent>
                  </UiSelect>
                </div>
                <div
                  v-if="errors.pricing"
                  class="text-red-500 text-center col-span-4"
                >
                  {{ errors.pricing }}
                </div>
              </div>
              <div class="grid grid-cols-4 items-center gap-4">
                <UiLabel
                  for="likes"
                  class="text-right"
                >
                  Likes
                </UiLabel>
                <UiInput
                  id="likes"
                  v-model="likes"
                  name="likes"
                  required
                  class="col-span-3"
                  placeholder="Tool likes..."
                  type="number"
                />

                <div
                  v-if="errors.likes"
                  class="text-red-500 text-center col-span-4"
                >
                  {{ errors.likes }}
                </div>
              </div>
              <div class="grid grid-cols-2 items-center gap-4">
                <UiButton
                  variant="outline"
                  type="button"
                  class="mt-2 sm:mt-0"
                  @click="closeDialog(false)"
                >
                  Cancel
                </UiButton>
                <UiButton
                  type="submit"
                  @click="onSubmit"
                >
                  Save
                </UiButton>
                {{ JSON.stringify(errors) }}
              </div>
            </UiCardContent>
            <section class="min-w-96 flex justify-center items-center">
              <SingleCard
                :type="pricing"
                :image="image"
                :title="name"
                :description="description"
                :category="categories"
                :tags="tags"
              />
            </section>
          </section>
        </template>
        <template #footer />
      </UiDialogContent>
    </UiDialog>
  </div>
</template>

<style scoped>

</style>
