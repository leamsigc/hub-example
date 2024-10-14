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
</script>

<template>
  <UiContainer class="flex flex-col gap-y-16 py-10 lg:h-[720px] lg:flex-row lg:gap-10">
    <div class="flex h-full items-center justify-center lg:w-2/3 xl:w-1/2">
      <div>
        <h1 class="mb-4 mt-7 text-4xl font-semibold lg:mb-6 lg:mt-5 lg:text-5xl xl:text-6xl">
          Be the first to know when we launch a new tool
        </h1>
        <p class="text-lg text-muted-foreground lg:text-xl">
          We're still building. Subscribe for updates and 20% off when we launch. No spam, we
          promise!
        </p>
        <form
          class="mt-8 flex w-full flex-col gap-3 sm:w-[500px] lg:mt-12 lg:w-full lg:flex-row lg:items-center"
        >
          <div class="w-full lg:w-[60%]">
            <UiVeeInput
              required
              placeholder="Enter your email"
              aria-label="Enter your email"
            />
          </div>
          <p class="my-2 text-sm text-muted-foreground lg:hidden">
            We care about your data in our privacy policy.
          </p>
          <div>
            <UiButton
              class="w-full whitespace-nowrap lg:w-auto"
              type="submit"
            >
              Subscribe
            </UiButton>
          </div>
        </form>
        <p class="mt-3 hidden text-sm text-muted-foreground lg:block">
          We care about your data in our privacy policy.
        </p>
      </div>
    </div>
    <div class="h-[350px] lg:h-full lg:w-1/3 xl:w-1/2">
      <NuxtImg
        src="/baby.webp"
        class="h-full w-full object-cover"
        alt="Hero section one styles"
        loading="eager"
        width="700"
        height="800"
      />
    </div>
  </UiContainer>
</template>
