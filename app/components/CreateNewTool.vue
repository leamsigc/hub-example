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

import type { FormKitSchemaDefinition } from "@formkit/core";
import { FormKitSchema } from "@formkit/vue";

const schema: FormKitSchemaDefinition = [
  {
    $formkit: "text",
    name: "name",
    label: "Tool name",
    placeholder: "Tool name...",
    validation: "required",
    ValidityVisibility: "live",
  },
  {
    $formkit: "text",
    name: "url",
    label: "Tool url",
    placeholder: "Tool url...",
    validation: "required",
    ValidityVisibility: "live",
  },
  {
    $formkit: "textarea",
    name: "description",
    label: "Tool description",
    placeholder: "Tool description...",
    validation: "required",
    ValidityVisibility: "live",
  },
  {
    $formkit: "text",
    name: "tags",
    label: "Tool tags",
    placeholder: "Tool tags...",
    validation: "required",
    ValidityVisibility: "live",
  },
  {
    $formkit: "text",
    name: "pricing",
    label: "Tool pricing",
    placeholder: "Tool pricing...",
    validation: "required",
    ValidityVisibility: "live",
  },
  {
    $formkit: "text",
    name: "likes",
    label: "Tool likes",
    placeholder: "Tool likes...",
    validation: "required",
    ValidityVisibility: "live",
  },
  {
    $formkit: "select",
    name: "categories",
    label: "Tool categories",
    placeholder: "Tool categories...",
    options: ["cat1", "cat2", "cat3"],
    props: {
      validation: "required",
    },
  },
  {
    $formkit: "submit",
    label: "Submit",
    type: "submit",
    submitText: "Submit",
    onsubmit: "handleSubmit",
  },
];

const data = ref({ name: "", url: "", description: "", tags: "", pricing: "", likes: "", categories: "" });

const handleSubmit = () => {
  console.log("submit", data.value);
};
</script>

<template>
  <div>
    <UiCard
      class="mx-auto max-w-sm"
      title="Profile"
      description="Update your profile information below"
    >
      <template #content>
        <UiCardContent
          as="form"
          class="flex flex-col gap-4"
        >
          <FormKitSchema
            v-auto-animate
            :schema="schema"
            :data="data"
            validation-visibility="live"
            as="form"
            @submit="handleSubmit"
          />
        </UiCardContent>
      </template>
    </UiCard>
  </div>
</template>

<style scoped>

</style>
