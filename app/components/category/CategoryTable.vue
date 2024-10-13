<script lang="ts" setup>
import type { Category } from "~~/server/utils/drizzle";

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

// Fetch all the categories
const { data } = await useFetch<Category[]>("/api/v1/categories");
</script>

<template>
  <div class="overflow-x-auto rounded-md border pb-4">
    <UiTable>
      <UiTableCaption>A list of all available Categories</UiTableCaption>
      <UiTableHeader>
        <UiTableRow>
          <UiTableHead class="w-[300px]">
            Name
          </UiTableHead>
          <UiTableHead>Icon</UiTableHead>
          <UiTableHead>Status</UiTableHead>
          <UiTableHead class="text-right">
            Amount
          </UiTableHead>
        </UiTableRow>
      </UiTableHeader>
      <UiTableBody class="last:border-b">
        <template
          v-for="category in data"
          :key="category.id"
        >
          <UiTableRow>
            <UiTableCell class="font-medium">
              {{ category.name }}
            </UiTableCell>
            <UiTableCell>{{ category.icon }}</UiTableCell>
            <UiTableCell>{{ category.status }}</UiTableCell>
            <UiTableCell class="text-right">
              {{ category.id }}
            </UiTableCell>
          </UiTableRow>
        </template>
      </UiTableBody>
    </UiTable>
  </div>
</template>
