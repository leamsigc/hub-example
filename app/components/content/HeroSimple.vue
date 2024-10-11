<script lang="ts" setup>
/**
 *
 * Simple hero with text
 *
 * @author Reflect-Media <reflect.media GmbH>
 * @version 0.0.1
 *
 * @todo [ ] Test the component
 * @todo [ ] Integration test.
 * @todo [✔] Update the typescript.
 */
interface Props {
  showCallToAction?: boolean
  to?: string
  callToActionText?: string
}

const props = withDefaults(defineProps<Props>(), {
  showCallToAction: false,
  to: "/tools",
  callToActionText: "View more",
});
const { to, callToActionText, showCallToAction } = toRefs(props);
</script>

<template>
  <div class="sm:py-20 py-10 px-8 max-w-[850px] m-auto">
    <h1 class="text-center md:text-70px font-bold mb-4 text-2xl sm:text-4xl">
      <slot name="title" />
    </h1>
    <h5 class="text-center opacity-75 mb-5">
      <slot name="sub-title" />
    </h5>
    <div
      v-if="showCallToAction"
      class="text-center"
    >
      <UiButton
        class="px-16 py-6 rounded-full"
        :href="to"
      >
        <slot>
          <span class="mr-5 inline-block p-1.5 text-xl">
            {{ callToActionText }}
          </span>
        </slot>
      </UiButton>
    </div>
  </div>
</template>

<style scoped></style>
