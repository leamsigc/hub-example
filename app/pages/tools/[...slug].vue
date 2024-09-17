<script lang="ts" setup>
/**
 *
 * Single Tool page
 *
 * @author Reflect-Media <reflect.media GmbH>
 * @version 0.0.1
 *
 * @todo [ ] Test the component
 * @todo [ ] Integration test.
 * @todo [✔] Update the typescript.
 */
//  Get tools by price
const route = useRoute();
definePageMeta({
  layout: "directory-layout",
});
</script>

<template>
  <main class="mx-auto px-4 sm:px-6 lg:px-8 max-w-7xl">
    <div class="flex flex-col lg:grid lg:grid-cols-10 lg:gap-8 pt-20 -mt-20">
      {{ route.params.slug }}
    </div>
  </main>
</template>

<style scoped>

</style>
