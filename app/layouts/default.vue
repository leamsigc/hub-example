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
const callToActions = [
  {
    name: "Login",
    href: "/login",
  },
  {
    name: "Register",
    href: "/register",
    variant: "outline",
  },
];

const { data } = await useAsyncData("Navigation", () => queryContent("/").where({ _partial: true, title: "Navigation" }).findOne());
</script>

<template>
  <div
    class=" flex flex-col dark:bg-neutral-950 dark:text-slate-400 min-h-svh"
  >
    <UiToastToaster />
    <NavigationHeaderSecondary
      v-if="data"
      :call-to-action="callToActions"
      :menu="data.MenuLinks"
      :short-links="data.ShortLinks"
      :logo-link="{ title: 'Best youtube tools', href: '/', src: '' }"
    >
      <ThemeSwitcher />
    </NavigationHeaderSecondary>
    <slot />
  </div>
</template>

<style scoped></style>
