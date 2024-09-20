const isProd = process.env.NODE_ENV === "production";

export const tursoConfig = {
  url: isProd ? process.env.TURSO_DATABASE_URL! : "file:local.db",
  authToken: process.env.TURSO_AUTH_TOKEN,
};
