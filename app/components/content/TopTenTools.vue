<script lang="ts" setup>
import type { UiConfettiContainer } from "#build/components";

/**
 *
 * Top ten tools
 *
 * @author Reflect-Media <reflect.media GmbH>
 * @version 0.0.1
 *
 * @todo [ ] Test the component
 * @todo [ ] Integration test.
 * @todo [✔] Update the typescript.
 */

const confettiContainer = ref<InstanceType<typeof UiConfettiContainer>>();
const HandleContentClick = () => {
  confettiContainer.value?.action.cannonSide();
};

const { data: tools } = await useFetch("/api/tools?limit=10&tag=top-10-tools");
console.log(tools);
</script>

<template>
  <UiConfettiContainer ref="confettiContainer">
    <section @click="HandleContentClick">
      <TheTitle
        title="Top 10 Tools"
        sub-title="The most used tools"
        description="The top 10 tools used by our users."
      />
      <div class="grid grid-cols-3 gap-5 container mx-auto">
        <SingleCard
          type="basic"
          image="/baby.webp"
          title="Magic Studio"
          description="With Magic Studio anybody can use AI to create images, add & remove objects, backgrounds and more."
          category="AI, Image"
          :tags="['Free Trial']"
          :click="HandleContentClick"
        />
        <SingleCard
          type="freemium"
          image="/baby.webp"
          title="Magic Studio"
          description="With Magic Studio anybody can use AI to create images, add & remove objects, backgrounds and more."
          category="AI, Image"
          :tags="['Free Trial', 'Featured']"
          :click="HandleContentClick"
        />
        <SingleCard
          type="premium"
          image="/baby.webp"
          title="Magic Studio"
          description="With Magic Studio anybody can use AI to create images, add & remove objects, backgrounds and more."
          category="AI, Image"
          :tags="['Free Trial', 'Featured']"
          :click="HandleContentClick"
        />
      </div>
    </section>
  </UiConfettiContainer>
</template>

<style scoped>

</style>
