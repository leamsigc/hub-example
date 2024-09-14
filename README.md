# NuxtHub Starter Template

This starter lets you get started with [NuxtHub](https://hub.nuxt.com) in seconds.

- [Documentation](https://hub.nuxt.com)

## Features

- Image upload with [`hubBlob()`](http://hub.nuxt.com/docs/storage/blob)
- Save chat messages with [`hubDatabase()`](http://hub.nuxt.com/docs/storage/database)
- Save server redirects with [`hubKV()`](http://hub.nuxt.com/docs/storage/kv)
- Cache an API response with [`cachedEventHandler()`](https://hub.nuxt.com/docs/server/cache)
- Generate the API documentation with Scalar within the [NuxtHub Admin](https://admin.hub.nuxt.com)

## Setup

Make sure to install the dependencies with [pnpm](https://pnpm.io).

```bash
pnpm install
```

## Development Server

Start the development server on `http://localhost:3000`:

```bash
pnpm dev
```

## Production

Build the application for production:

```bash
pnpm build
```

Check out the [deployment documentation](https://hub.nuxt.com/docs/getting-started/deploy) for more information.

## Deploy

Deploy the application on the Edge with [NuxtHub](https://hub.nuxt.com) on your Cloudflare account:

```bash
npx nuxthub deploy
```

Then checkout your server logs, analaytics and more in the [NuxtHub Admin](https://admin.hub.nuxt.com).

You can also deploy using [Cloudflare Pages CI](https://hub.nuxt.com/docs/getting-started/deploy#cloudflare-pages-ci).



--- 

##Database  overview


```mermaid
erDiagram
    Users {
      int id PK "Primary Key, Auto Increment"
      text email "Unique, Not Null"
      text emailToVerify
      text name "Not Null"
      text avatar
      int githubId "Unique"
      text githubToken
      text twitchId "Unique"
      text twitchToken
      text verifiedAt
      text createdAt "Not Null, Default: current_timestamp"
      text updatedAt "Not Null, Default: current_timestamp, On Update: current_timestamp"
    }

    Tools {
      int id PK "Primary Key, Auto Increment"
      text url
      text description
      int likes
      text tags
      text pricing
    }

    Promotions {
      int id PK "Primary Key, Auto Increment"
      int toolId FK "Foreign Key to Tools"
      text from
      text to
      text tag "Tag for Promotion"
    }

    Tags {
      int id PK "Primary Key, Auto Increment"
      text name
      text label
    }

    Stats {
      int id PK "Primary Key, Auto Increment"
      int toolId FK "Foreign Key to Tools"
      int views
      int clicks
      int likes
    }

    Images {
      int id PK "Primary Key, Auto Increment"
      int toolId FK "Foreign Key to Tools"
      text url "Image URL"
      text tag "Tag for Main Image"
    }

    %% Relationships
    Users ||--o{ Tools : "User can create many tools"
    Tools ||--o{ Images : "One tool has many images"
    Tools ||--o| Promotions : "One tool has one promotion"
    Tools ||--|| Stats : "One tool has one stat"
    Tools ||--o{ Tags : "Tools can have multiple tags"
    Images ||--o| Tags : "Images can have one tag"
    Promotions ||--o| Tags : "Promotions can have one tag"

```
