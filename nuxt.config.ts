// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  compatibilityDate: "2024-07-30",

  // Nuxt 4 directory structure and features
  // https://nuxt.com/docs/getting-started/upgrade#testing-nuxt-4
  future: { compatibilityVersion: 4 },

  // Nuxt Modules
  // https://nuxt.com/modules
  modules: [
    "@nuxtjs/tailwindcss",
    "@nuxt/content",
    "@nuxthub/core",
    "@nuxt/eslint",
    "@nuxtjs/color-mode",
    "@vueuse/nuxt",
    "nuxt-icon",
    "@samk-dev/nuxt-vcalendar",
    "@vee-validate/nuxt",
    "@nuxtjs/seo",
    "@unlighthouse/nuxt",
    "@formkit/nuxt",
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
    url: "https://babyname.leamsigc.com",
    name: "NameNest: Tailored Baby Names**",
    description:
      "Discover the perfect baby name with NameNest! Our personalized baby name generator uses your unique preferences to suggest names that resonate with your cultural background, values, and style. Whether you seek names that are traditional, modern, or completely unique, NameNest provides meaningful, well-researched options that reflect your desires. Easily find names with specific origins, meanings, or themes—whether you want a name that symbolizes peace, wisdom, or strength, or simply one that sounds beautiful and is easy to pronounce. Ideal for parents looking for a name that stands out while staying true to their heritage and beliefs. Start your journey to the perfect baby name today!",
    defaultLocale: "en", // not needed if you have @nuxtjs/i18n installed
  },
});
