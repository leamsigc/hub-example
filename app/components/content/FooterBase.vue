<script lang="ts" setup>
/**
 *
 * Base footer for the application
 *
 * @author Reflect-Media <reflect.media GmbH>
 * @version 0.0.1
 *
 * @todo [ ] Test the component
 * @todo [ ] Integration test.
 * @todo [✔] Update the typescript.
 */
interface Props {
  logoUrl?: string
  logoAlt?: string
  socialMedias?: { name: string, icon: string, url: string }[]
  brand?: string

  footerLinks: {
    title: string
    links: { name: string, url: string }[]
  }[]
}
const props = withDefaults(defineProps<Props>(), {
  logoUrl: "/base/logo.png",
  logoAlt: "Best tools logo",
  brand: "Best Tools",
});
const { logoUrl, logoAlt, socialMedias, brand, footerLinks } = toRefs(props);
</script>

<template>
  <div class="mx-auto px-4 sm:px-6 lg:px-8 max-w-screen-2xl w-full py-10">
    <div class="my-12 grid grid-cols-1 gap-y-10 sm:grid-cols-6 lg:grid-cols-12">
      <div class="sm:col-span-6 lg:col-span-5">
        <div class="flex flex-shrink-0 items-center border-right">
          <NuxtImg
            :src="logoUrl"
            :alt="logoAlt"
            class="h-20 w-20 rounded-full"
          />
        </div>
        <h3 class="text-xs font-medium text-gunmetalgray lh-160 mt-5 mb-4 lg:mb-16">
          <slot name="description" />
        </h3>
        <div class="flex gap-4">
          <NuxtLink
            v-for="socialMedia in socialMedias"
            :key="socialMedia.name"
            :to="socialMedia.url"
            target="_blank"
            class="bg-white h-12 w-12 shadow-xl text-base rounded-full flex items-center justify-center footer-icons hover:bg-ultramarine"
          >
            <Icon :name="`lucide:${socialMedia.icon}`" />
          </NuxtLink>
        </div>
      </div>
      <div
        v-for="footerLink in footerLinks"
        :key="footerLink.title"
        class="col-span-2"
      >
        <p class="text-black text-lg font-medium mb-9">
          {{ footerLink.title }}
        </p>
        <ul>
          <li
            v-for="link in footerLink.links"
            :key="link.name"
            class="mb-5"
          >
            <NuxtLink
              class="text-darkgray text-base font-normal mb-6 space-links"
              :to="link.url"
            >
              {{ link.name }}
            </NuxtLink>
          </li>
        </ul>
      </div>
    </div>
    <div class="py-10 md:flex items-center justify-between border-t border-t-gray-blue">
      <h4 class="text-dark-red opacity-75 text-sm text-center md:text-start font-normal">
        @{{ new Date().getFullYear() }}.{{ brand }}.All rights reserved
      </h4>
      <div class="flex gap-5 mt-5 md:mt-0 justify-center md:justify-start">
        <h4 class="text-dark-red opacity-75 text-sm font-normal">
          <a
            target="_blank"
            href="/"
          >
            Privacy policy
          </a>
        </h4>
        <div class="h-5 bg-dark-red opacity-25 w-0.5" />
        <h4 class="text-dark-red opacity-75 text-sm font-normal">
          <a
            target="_blank"
            href="/"
          >
            Terms &amp; conditions
          </a>
        </h4>
      </div>
    </div>
  </div>
</template>

<style scoped></style>
