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
// get tools by category
const route = useRoute();
definePageMeta({
  layout: "directory-layout",
});
</script>

<template>
  <div>
    {{ route.params.slug }}
  </div>
</template>

<style scoped>

</style>
