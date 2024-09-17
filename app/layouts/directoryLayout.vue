<script lang="ts" setup>
import type { NuxtLinkProps } from "#app";

/**
 *
 * Tools
 *
 * @author Reflect-Media <reflect.media GmbH>
 * @version 0.0.1
 *
 * @todo [ ] Test the component
 * @todo [ ] Integration test.
 * @todo [✔] Update the typescript.
 */
const route = useRoute();
const router = useRouter();
const iconsMap = {
  All: "i-ph-list-duotone",
  Analytics: "i-ph-chart-bar-duotone",
  CMS: "i-ph-pencil-duotone",
  CSS: "i-ph-paint-brush-broad-duotone",
  Database: "i-ph-database-duotone",
  Devtools: "i-ph-wrench-duotone",
  Ecommerce: "i-ph-shopping-cart-duotone",
  Extensions: "i-ph-puzzle-piece-duotone",
  Fonts: "i-ph-text-aa-duotone",
  Images: "i-ph-image-duotone",
  Libraries: "i-ph-books-duotone",
  Monitoring: "i-ph-timer-duotone",
  Payment: "i-ph-credit-card-duotone",
  Performance: "i-ph-gauge-duotone",
  Request: "i-ph-plugs-connected-duotone",
  Security: "i-ph-shield-duotone",
  SEO: "i-ph-file-search-duotone",
  UI: "i-ph-layout-duotone",
};
export interface Filter extends NuxtLinkProps {
  key: string | number
  icon?: string
}

const categories = computed(() => {
  return Object.keys(iconsMap).map(category => ({
    key: category,
    label: category,
    exactQuery: true,
    to: {
      path: category === "All" ? "/tools" : `/tools/category/${category}`,
      query: category === "All" ? { category } : { },
    },
    icon: iconsMap[category as keyof typeof iconsMap],
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    click: (e: any) => {
      if (route.query.category !== category) {
        return;
      }

      e.preventDefault();

      router.replace({ query: { ...route.query, category: undefined } });
    },
  })).sort((a, b) => {
    return a.label.localeCompare(b.label);
  });
});

const title = "Best youtube tools | Tools | NameNest";
const description = "Explore our curated collection of tools for creators, from video editing and analytics to AI tools, designed to enhance your channel and streamline your workflow.";
useSeoMeta({
  titleTemplate: "%s",
  title,
  description,
  ogDescription: description,
  ogTitle: title,
});
defineOgImageComponent("PageOg");

const { data } = await useAsyncData("Navigation", () => queryContent("/").where({ _partial: true, title: "Navigation" }).findOne());
</script>

<template>
  <section class="dark:bg-neutral-950 dark:text-slate-400 min-h-svh">
    <UiToastToaster />
    <NavigationHeaderSecondary
      v-if="data"
      :call-to-action="[]"
      :menu="data.MenuLinks"
      :short-links="data.ShortLinks"
      :logo-link="{ title: 'Best youtube tools', href: '/', src: '' }"
    >
      <ThemeSwitcher />
      <CreateNewTool class="ml-4" />
    </NavigationHeaderSecondary>

    <main class="mx-auto px-4 sm:px-6 lg:px-8 max-w-screen-2xl w-full py-10">
      <div class="flex flex-col lg:grid lg:grid-cols-10 lg:gap-8 pt-20 -mt-20">
        <section class="lg:col-span-2">
          <UiList class="max-w-[250px] rounded-lg border dark:border-l-0 dark:border-t-0 dark:border-b-0 dark:border-r-slate-50 bg-background">
            <template
              v-for="n in categories"
              :key="n.key"
            >
              <UiListItem
                :to="n.to"
                class=""
              >
                <Icon
                  :name="n.icon"
                  class="h-5 w-5 text-muted-foreground"
                />
                <UiListContent>
                  <UiListTitle
                    :title="n.label"
                    class="text-sm font-medium"
                  />
                </UiListContent>
              </UiListItem>
            </template>
          </UiList>
        </section>
        <slot />
      </div>
    </main>
  </section>
</template>

<style scoped>
.group:hover .shine {
  text-decoration: none;
  display: inline-block;
  position: relative;
  mask-image: linear-gradient(-75deg, rgba(255,255,255,.8) 30%, #fff 50%, rgba(255,255,255,.8) 70%);
  mask-size: 200%;
  animation: shine 2s linear infinite;
}

@keyframes shine {
  from { -webkit-mask-position: 150%; }
  to { -webkit-mask-position: -50%; }
}
</style>
