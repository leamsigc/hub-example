<script lang="ts" setup>
/**
 *
 * The hero component
 *
 * @author Reflect-Media <reflect.media GmbH>
 * @version 0.0.1
 *
 * @todo [ ] Test the component
 * @todo [ ] Integration test.
 * @todo [✔] Update the typescript.
 */
interface Props {
  alt: string
  heroImageUrl: string
  title: string
  subTitle: string
  href: string
  callToActionText?: string
}
const props = withDefaults(defineProps<Props>(), {
  callToActionText: "Learn more",
});
const { alt, heroImageUrl, subTitle, title, href, callToActionText } = toRefs(props);
</script>

<template>
  <section class="relative">
    <NuxtImg
      :src="heroImageUrl"
      class="absolute inset-0 h-full w-full hidden lg:block object-cover blur-3xl  bg-blend-exclusion dark:bg-transparent dark:bg-blend-exclusion dark:opacity-35"
      :alt="alt"
    />
    <div
      class="container mx-auto px-4 "
    >
      <div class="mb-20 mt-auto">
        <div class="relative rounded-3xl md:py-36 lg:px-12">
          <div class="-mx-4 mt-24 flex flex-wrap items-center space-y-6 lg:space-y-0">
            <div class="w-full px-4 md:w-10/12 xl:w-8/12">
              <h1 class="mb-10 flex flex-col items-start justify-start gap-6">
                <div
                  class="text-6xl font-bold leading-tight text-slate-950 dark:text-slate-300"
                  v-html="title"
                />
                <div
                  class="text-lg font-normal leading-relaxed text-slate-900 dark:text-slate-300"
                  v-html="subTitle"
                />
              </h1>
              <UiButton
                class="px-16 py-6 rounded-full"
                variant="outline"
                :href="href"
              >
                <slot>
                  <span class="mr-5 inline-block">
                    {{ callToActionText }}
                  </span>
                </slot>
              </UiButton>
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<style scoped></style>
