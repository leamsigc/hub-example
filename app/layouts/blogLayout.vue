<script lang="ts" setup>
/**
 *
 * Blog layout
 *
 * @author Reflect-Media <reflect.media GmbH>
 * @version 0.0.1
 *
 * @todo [ ] Test the component
 * @todo [ ] Integration test.
 * @todo [✔] Update the typescript.
 */
const callToActions: [] = [

];

const { data } = await useAsyncData("Navigation", () => queryContent("/").where({ _partial: true, title: "Navigation" }).findOne());

const footer = {
  description: "Whether you're planning a birthday bash, anniversary celebration, rehearsal dinner, or corporate event, Rosa Mexicana Cocina offers a warm and inviting atmosphere that will make your guests feel right at home.",
  title: "Celebrate Your Special Event!",
  logoUrl: "/logo.png",
  btns: [
    {
      label: "Call Us Now",
      href: "tel:+1-256-559-5900",
      variant: "outline",
    },
  ],
};
</script>

<template>
  <div class=" flex flex-col dark:bg-neutral-950 dark:text-slate-400 min-h-svh">
    <NavigationHeader
      v-if="data"
      :call-to-action="callToActions"
      :menu="data.MenuLinks"
      :short-links="data.ShortLinks"
      :logo-link="{ title: 'Best youtube tools', href: '/', src: '' }"
    >
      <ThemeSwitcher />
    </NavigationHeader>
    <slot />
    <FooterCallToAction v-bind="footer" />
  </div>
</template>

<style scoped></style>
