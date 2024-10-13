import { defineNuxtRouteMiddleware } from "#imports";

export default defineNuxtRouteMiddleware((to) => {
  const isUserDashboard = to.path.startsWith("/app");

  if (isUserDashboard) {
    setPageLayout("dashboard-layout");
  }
});
