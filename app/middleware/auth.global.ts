import { defineNuxtRouteMiddleware, navigateTo, useUserSession } from "#imports";

export default defineNuxtRouteMiddleware((to) => {
  const { loggedIn } = useUserSession();

  // if (to.path.startsWith("/app") && !loggedIn.value) {
  //   return navigateTo("/login");
  // }
});
