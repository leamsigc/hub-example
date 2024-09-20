const isProd = process.env.NODE_ENV === "production";

export default defineNuxtConfig({
  compatibilityDate: "2024-07-30",
  future: { compatibilityVersion: 4 },
  modules: ["@nuxtjs/tailwindcss", "@nuxt/content", "@nuxthub/core", "@nuxt/eslint", "@nuxtjs/color-mode", "@vueuse/nuxt", "@nuxt/icon", "@samk-dev/nuxt-vcalendar", "@vee-validate/nuxt", "@nuxtjs/seo", "nuxt-swiper", "@unlighthouse/nuxt", "@formkit/nuxt", "@nuxt/image", "nuxt-auth-utils", "nuxt-security", "@formkit/auto-animate"],
  routeRules: {
    "/api/me": {
      security: {
        rateLimiter: {
          headers: false,
          interval: 60 * 1000,
          tokensPerInterval: 6,
        },
      },
    },
    "/api/_hub/**": {
      csurf: false,
    },
    "/**": {
      security: {
        rateLimiter: false,
      },
    },
  },

  hub: {
    database: false,
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
  security: {
    csrf: true,
    rateLimiter: {
      driver: {
        name: "cloudflare-kv-binding",
        options: {
          binding: "KV",
        },
      },
    },
    headers: {
      contentSecurityPolicy: {
        "img-src": [
          "'self'",
          "data:",
          "https://avatars.githubusercontent.com",
          "https://static-cdn.jtvnw.net/",
        ],
        "script-src": [
          "'self'",
          "https",
          "'nonce-{{nonce}}'",
          "https://static.cloudflareinsights.com",
        ],
      },
      crossOriginEmbedderPolicy: isProd ? "credentialless" : false,
    },
  },
  csurf: {
    methodsToProtect: ["POST", "PUT", "PATCH", "DELETE"],
  },

  // Development
  devtools: { enabled: true },

  css: [
    "./assets/css/global.css",
  ],
  tailwindcss: {
    exposeConfig: true,
    editorSupport: true,
    cssPath: ["~/assets/css/tailwind.css", { injectPosition: "last" }],
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

  content: {
    // ... options
    documentDriven: true,
  },
  ogImage: {
    componentOptions: {
      global: true,
    },
  },
  formkit: {
    autoImport: true,
    configFile: "./formkit.config.ts",
  },
  eslint: {
    config: {
      stylistic: true,
    },
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
  runtimeConfig: {
    public: {
      baseUrl: process.env.BASE_URL || "https://babyname.leamsigc.com",
    },
  },
});
