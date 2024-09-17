<script lang="ts" setup>
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
definePageMeta({
  layout: "directory-layout",
});
// Get all tools
</script>

<template>
  <section class="lg:col-span-8 grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-8">
    <SingleCard
      type="basic"
      image="/baby.webp"
      title="Magic Studio"
      description="With Magic Studio anybody can use AI to create images, add & remove objects, backgrounds and more."
      category="AI, Image"
      :tags="['Free Trial']"
    />
    <SingleCard
      type="freemium"
      image="/baby.webp"
      title="Magic Studio"
      description="With Magic Studio anybody can use AI to create images, add & remove objects, backgrounds and more."
      category="AI, Image"
      :tags="['Free Trial']"
    />
    <SingleCard
      type="basic"
      image="/baby.webp"
      title="Magic Studio"
      description="With Magic Studio anybody can use AI to create images, add & remove objects, backgrounds and more."
      category="AI, Image"
      :tags="['Free Trial']"
    />
    <SingleCard
      type="basic"
      image="/baby.webp"
      title="Magic Studio"
      description="With Magic Studio anybody can use AI to create images, add & remove objects, backgrounds and more."
      category="AI, Image"
      :tags="['Free Trial']"
    />
    <SingleCard
      type="basic"
      image="/baby.webp"
      title="Magic Studio"
      description="With Magic Studio anybody can use AI to create images, add & remove objects, backgrounds and more."
      category="AI, Image"
      :tags="['Free Trial']"
    />
    <SingleCard
      type="premium"
      image="/baby.webp"
      title="Magic Studio"
      description="With Magic Studio anybody can use AI to create images, add & remove objects, backgrounds and more."
      category="AI, Image"
      :tags="['Free Trial']"
    />
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
