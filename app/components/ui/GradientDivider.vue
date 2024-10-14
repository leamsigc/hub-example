<template>
  <Separator
    v-bind="forwarded"
    :class="styles({ class: props.class })"
  />
</template>

<script lang="ts" setup>
import { Separator } from "radix-vue";
import type { SeparatorProps } from "radix-vue";

const props = withDefaults(
  defineProps<
    SeparatorProps & {
      /** Custom class(es) to add to parent element */
      class?: any
    }
  >(),
  {
    as: "hr",
  },
);

const forwarded = reactiveOmit(props, "class");

const styles = tv({
  base: "h-px w-full border-t-0 border-x-0 border-border bg-gradient-to-r from-transparent via-black/10 to-transparent",
});
</script>
