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

const search = ref<string>("");
const { user } = useUserSession();

const topNav = [
  { title: "Home", icon: "lucide:home", link: "/" },
  {
    title: "Dashboard",
    icon: "lucide:bar-chart-3",
    items: [
      { title: "Overview", link: "/app" },
      { title: "Notifications", link: "#" },
      { title: "Analytics", link: "#" },
      { title: "Reports", link: "#" },
    ],
  },
  { title: "Tools", icon: "lucide:folder-dot", link: "/app/tools" },
  { title: "Categories", icon: "lucide:list-checks", link: "/app/categories" },
  { title: "Users", icon: "lucide:users", link: "/app/users" },
];
const bottomNav = [
  { title: "Support", icon: "lucide:life-buoy", link: "#" },
  {
    title: "Settings",
    icon: "lucide:settings-2",
    items: [
      { title: "Profile", link: "#" },
      { title: "Account", link: "#" },
      { title: "Security", link: "#" },
      { title: "Billing", link: "#" },
    ],
  },
];

// const { data } = await useAsyncData("Navigation", () => queryContent("/").where({ _partial: true, title: "Navigation" }).findOne());
const { data } = await useAsyncData(
  "Navigation",
  () => queryContent("/").where({ _partial: true, title: "Navigation" }).findOne(),
);
</script>

<template>
  <main>
    <UiToastToaster />
    <NavigationHeaderSecondary
      v-if="data"
      :call-to-action="[]"
      :menu="data.MenuLinks"
      :short-links="data.ShortLinks"
      :logo-link="{ title: 'Best youtube tools', href: '/', src: '' }"
      class="sticky top-0 z-50"
    >
      <ThemeSwitcher />
    </NavigationHeaderSecondary>
    <div class="flex">
      <aside class=" w-[300px] border-r sticky top-16">
        <UiScrollArea class="size-full">
          <div class="flex h-screen flex-col">
            <NuxtLink
              to="#"
              class="flex w-full items-center gap-3 px-5"
            >
              <UiAvatar
                src="/base/logo.png"
                alt="Company Logo"
                class="size-20 rounded object-contain"
              />
            </NuxtLink>
            <div class="my-6 px-5">
              <UiVeeInput
                v-model="search"
                placeholder="Search..."
                icon="lucide:search"
              />
            </div>
            <div class="flex h-full grow flex-col px-5 pb-8">
              <div class="mb-10 flex flex-col gap-10">
                <nav class="flex flex-col gap-1">
                  <template
                    v-for="(n, i) in topNav"
                    :key="i"
                  >
                    <UiButton
                      v-if="!n.items"
                      :to="n.link"
                      size="default"
                      variant="ghost"
                      class="justify-start gap-4 px-3"
                    >
                      <Icon
                        v-if="n.icon"
                        :name="n.icon"
                        class="size-4 text-muted-foreground"
                      />
                      <span>{{ n.title }}</span>
                    </UiButton>
                    <UiCollapsible v-if="n.items">
                      <UiCollapsibleTrigger as-child>
                        <UiButton
                          size="default"
                          variant="ghost"
                          class="group w-full justify-start gap-4 px-3"
                        >
                          <Icon
                            v-if="n.icon"
                            :name="n.icon"
                            class="size-4 text-muted-foreground"
                          />
                          <span>{{ n.title }}</span>
                          <Icon
                            name="lucide:chevron-down"
                            class="ml-auto size-4 text-muted-foreground transition group-data-[state=open]:rotate-180"
                          />
                        </UiButton>
                      </UiCollapsibleTrigger>
                      <UiCollapsibleContent class="flex flex-col gap-1.5 pl-4 pr-2">
                        <template
                          v-for="(item, index) in n.items"
                          :key="index"
                        >
                          <UiButton
                            :to="item.link"
                            size="sm"
                            variant="ghost"
                            class="justify-start gap-4 px-3"
                          >
                            <span>{{ item.title }}</span>
                          </UiButton>
                        </template>
                      </UiCollapsibleContent>
                    </UiCollapsible>
                  </template>
                </nav>
                <nav class="mt-auto flex flex-col gap-1">
                  <template
                    v-for="(n, i) in bottomNav"
                    :key="i"
                  >
                    <UiButton
                      v-if="!n.items"
                      :to="n.link"
                      size="default"
                      variant="ghost"
                      class="justify-start gap-4 px-3"
                    >
                      <Icon
                        v-if="n.icon"
                        :name="n.icon"
                        class="size-4 text-muted-foreground"
                      />
                      <span>{{ n.title }}</span>
                    </UiButton>
                    <UiCollapsible v-if="n.items">
                      <UiCollapsibleTrigger as-child>
                        <UiButton
                          size="default"
                          variant="ghost"
                          class="group w-full justify-start gap-4 px-3"
                        >
                          <Icon
                            v-if="n.icon"
                            :name="n.icon"
                            class="size-4 text-muted-foreground"
                          />
                          <span>{{ n.title }}</span>
                          <Icon
                            name="lucide:chevron-down"
                            class="ml-auto size-4 text-muted-foreground transition group-data-[state=open]:rotate-180"
                          />
                        </UiButton>
                      </UiCollapsibleTrigger>
                      <UiCollapsibleContent class="flex flex-col gap-1.5 pl-4 pr-2">
                        <template
                          v-for="(item, index) in n.items"
                          :key="index"
                        >
                          <UiButton
                            :to="item.link"
                            size="sm"
                            variant="ghost"
                            class="justify-start gap-4 px-3"
                          >
                            <span>{{ item.title }}</span>
                          </UiButton>
                        </template>
                      </UiCollapsibleContent>
                    </UiCollapsible>
                  </template>
                </nav>
              </div>
              <UiDivider class="my-6 mt-auto" />
              <div class="flex items-center gap-3 pb-8">
                <div class="flex items-center gap-3">
                  <UiAvatar
                    v-if="user"
                    :src="user.avatar || '/base/logo.png'"
                    class="size-10"
                  />
                  <div v-if="user">
                    <p
                      class="text-sm font-semibold"
                    >
                      {{ user.name }}
                    </p>
                    <p
                      class="text-sm text-muted-foreground"
                    >
                      {{ user.email }}
                    </p>
                  </div>
                </div>
                <UiTooltip>
                  <UiTooltipTrigger as-child>
                    <UiButton
                      class="ml-auto shrink-0"
                      size="icon-sm"
                      variant="ghost"
                    >
                      <Icon
                        name="lucide:log-out"
                        class="size-4 text-muted-foreground"
                      />
                    </UiButton>
                  </UiTooltipTrigger>
                  <UiTooltipContent
                    side="right"
                    align="center"
                  >
                    Logout
                  </UiTooltipContent>
                </UiTooltip>
              </div>
            </div>
          </div>
        </UiScrollArea>
      </aside>
      <main class="flex-1 p-6 min-h-screen">
        <slot />
      </main>
    </div>
  </main>
</template>

<style scoped>
</style>
