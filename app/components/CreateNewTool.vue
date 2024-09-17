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

const { handleSubmit } = useForm({
  validationSchema: toTypedSchema(
    z.object({
      name: z.string().min(1, "Please enter a name."),
      url: z.string().min(1, "Please enter a url."),
      description: z.string().min(1, "Please enter a description."),
      tags: z.string().min(1, "Please enter at least one tag."),
      pricing: z.string().min(1, "Please select a pricing."),
      image: z.string().min(1, "Please enter a image url."),
      categories: z.string().min(1, "Please enter at least one category."),
      likes: z.string().min(1, "Please enter at least one like."),
    }),
  ) });

const onSubmit = handleSubmit((values) => {
  alert(JSON.stringify(values, null, 2));
});

const data = ref<{
  name: string
  url: string
  description: string
  tags: string[]
  pricing: "basic" | "premium" | "freemium"
  likes: string
  categories: string
  image?: string
}>({ name: "", url: "", description: "", tags: [], pricing: "basic", likes: "", categories: "", image: "/baby.webp" });

const dialog = ref(false);

const closeDialog = (save: boolean) => {
  useToast().toast({
    title: save ? "Profile updated" : "Changes discarded",
    description: `Your changes has been ${save ? "saved" : "discarded"}.`,
    duration: 5000,
    icon: save ? "lucide:check" : "lucide:x",
  });
  dialog.value = false;
};
const categoriesOptions = ["Ai", "Image", "Video"];
</script>

<template>
  <div>
    <div class="flex w-full items-center justify-center">
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
                as="form"
                class="grid gap-4 py-4"
                @submit="onSubmit"
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
                      v-model="data.categories"
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
                    v-model="data.name"
                    required
                    class="col-span-3"
                    placeholder="Tool name..."
                  />
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
                    v-model="data.image"
                    required
                    class="col-span-3"
                    placeholder="Tool image url..."
                  />
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
                    v-model="data.url"
                    required
                    class="col-span-3"
                    placeholder="Tool url..."
                  />
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
                    v-model="data.description"
                    class="col-span-3"
                    placeholder="Tool description..."
                    type="textarea"
                  />
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
                    v-model="data.tags"
                    class="col-span-3"
                  >
                    <UiTagsInputItem
                      v-for="tag in data.tags"
                      :key="tag"
                      :value="tag"
                    />
                    <UiTagsInputField placeholder="Add a tag..." />
                    <UiTagsInputClear />
                  </UiTagsInput>
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
                      v-model="data.pricing"
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
                    v-model="data.likes"
                    required
                    class="col-span-3"
                    placeholder="Tool likes..."
                    type="number"
                  />
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
                  >
                    Save
                  </UiButton>
                </div>
              </UiCardContent>
              <section class="min-w-96 flex justify-center items-center">
                <SingleCard
                  :type="data.pricing"
                  :image="data.image"
                  :title="data.name"
                  :description="data.description"
                  :category="data.categories"
                  :tags="data.tags"
                />
              </section>
            </section>
          </template>
          <template #footer />
        </UiDialogContent>
      </UiDialog>
    </div>
  </div>
</template>

<style scoped>

</style>
