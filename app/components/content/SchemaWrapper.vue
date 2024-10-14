<script lang="ts" setup>
import type { WebSiteSimple } from "@unhead/schema-org";
/**
 *
 * Schema wrapper
 *
 * @author Reflect-Media <reflect.media GmbH>
 * @version 0.0.1
 *
 * @todo [ ] Test the component
 * @todo [ ] Integration test.
 * @todo [✔] Update the typescript.
 */
interface Props {
  webSite: WebSiteSimple
}

const props = withDefaults(defineProps<Props>(), {
  webSite: (): WebSiteSimple => ({
    "@type": "WebSite",
    "url": "https://unhead.dev",
    "name": "Unhead",
    "description": "Headless Framework",
    "inLanguage": "en",
  }),
});
useSchemaOrg([
  defineWebSite(props.webSite),
]);
</script>

<template>
  <slot />
</template>
