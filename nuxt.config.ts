// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  compatibilityDate: "2024-07-30",

  // Nuxt 4 directory structure and features
  // https://nuxt.com/docs/getting-started/upgrade#testing-nuxt-4
  future: { compatibilityVersion: 4 },

  // Nuxt Modules
  // https://nuxt.com/modules
  modules: [
    "@nuxt/content",
    "@nuxthub/core",
    "@nuxt/eslint",
    "@nuxtjs/tailwindcss",
    "@nuxtjs/color-mode",
    "@vueuse/nuxt",
    "nuxt-icon",
    "@samk-dev/nuxt-vcalendar",
    "@vee-validate/nuxt",
  ],

  hub: {
    database: true,
    kv: true,
    blob: true,
    cache: true,
    analytics: true,
  },

  nitro: {
    experimental: {
      // Enable Server API documentation within NuxtHub
      openAPI: true,
    },
  },

  // Development
  devtools: { enabled: true },

  tailwindcss: {
    exposeConfig: true,
  },

  colorMode: {
    classSuffix: "",
  },

  imports: {
    imports: [
      {
        from: "tailwind-variants",
        name: "tv",
      },
      {
        from: "tailwind-variants",
        name: "VariantProps",
        type: true,
      },
    ],
  },

  app: {
    head: {
      script: [
        {
          src: "https://cdnjs.cloudflare.com/ajax/libs/pdfmake/0.2.9/pdfmake.min.js",
          defer: true,
        },
        {
          src: "https://cdnjs.cloudflare.com/ajax/libs/pdfmake/0.2.9/vfs_fonts.min.js",
          defer: true,
        },
      ],
    },
  },
  content: {
    // ... options
    documentDriven: true,
  },

  typescript: {
    shim: true,
    includeWorkspace: true,
  },
  site: {
    url: "https://rosamexicanrestauranthuntsville.com",
    name: "Rosa Mexican Cocina",
    description: "The best mexican around the Huntsville Area!",
    defaultLocale: "en", // not needed if you have @nuxtjs/i18n installed
  },
});
