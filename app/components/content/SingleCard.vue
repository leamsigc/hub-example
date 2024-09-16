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
interface Props {
  title?: string
  description?: string
  image?: string
  type: 'basic' | 'freemium' | 'premium'
  category?: string
  tags?: string[]
  link?: string
}

const props = withDefaults(defineProps<Props>(), {
  type: 'basic',
  category: 'AI',
  image: '/baby.webp',
  title: 'The plate name',
  description: 'Small description of the plate',
  tags: () => ['tag1', 'tag2'],
  link: '/',
})
const { type, category, image, title, description } = toRefs(props)

const extraCss = {
  basic: {
    base: 'shadow',
    card: '',
  },
  freemium: {
    base: 'shadow',
    card: 'bg-white',
  },
  premium: {
    base: 'bg-green-300 shadow-yellow-500 shadow-2xl',
    card: 'bg-green-300',
  },
}
</script>

<template>
  <NuxtLink
    :to="link"
    class="relative w-full p-1 border rounded-2xl font-sans overflow-hidden flex flex-col transition-all hover:scale-105 hover:-translate-y-1 hover:shadow-md"
    :class="extraCss[type].base"
    target="_blank"
    @click="$emit('click')"
  >
    <div
      v-if="type !== 'basic'"
      class="moving-border absolute inset-0 z-0 "
    />
    <div
      class="relative z-10 p-4 flex-1 rounded-xl"
      :class="extraCss[type].card"
    >
      <div class="w-12 h-12 border rounded-full flex items-center justify-center mb-4">
        <NuxtImg
          :src="image"
          class="w-10 h-10 rounded-full"
          :alt="title"
        />
      </div>
      <div>
        <h2 class="text-xl font-bold mb-2">
          {{ title }}
        </h2>
        <p class="text-sm text-gray-600 mb-3">
          {{ description }}
        </p>
        <span class="text-xs text-gray-400">{{ category }}</span>
      </div>
      <div class="absolute top-2 right-2 flex gap-1">
        <button
          v-for="tag in tags"
          :key="tag"
          class="  bg-opacity-50 rounded-full py-1 px-3   transition-colors text-xs"
          :class="{
            'bg-blue-400 text-blue-900 hover:bg-blue-600 ': tag !== 'Featured',
            'bg-red-400 text-red-900 hover:bg-red-600 font-bold ': tag === 'Featured',
          }"
        >
          <Icon
            v-if="tag === 'Featured'"
            name="ic:baseline-star"
          />
          {{ tag }}
        </button>
      </div>
    </div>
  </NuxtLink>
</template>

<style scoped>
.moving-border {
  background: conic-gradient(from 0deg,transparent 70%, #8e44ad, #3498db, #8e44ad);
  animation: rotate 15s linear infinite;
  scale: 2.5;
}

@keyframes rotate {
  100% {
    transform: rotate(360deg);
  }
}
</style>
