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
import { z } from "zod";

useSeoMeta({
  title: "Log in",
  description:
    "Enter your email & password to log in or continue with Google or Facebook.",
});

// Create zod schema for login
const LoginSchema = z.object({
  email: z.string().email("Please enter a valid email."),
  password: z.string().min(1, "Please enter a password."),
});

const { handleSubmit, isSubmitting } = useForm<typeof LoginSchema>({
  validationSchema: LoginSchema,
});

const submit = handleSubmit(async (_) => {});

const signInWithFacebook = () => {};
</script>

<template>
  <div class="flex h-screen items-center justify-center absolute inset-0">
    <div class="w-full max-w-[330px] px-5">
      <h1 class="text-2xl font-bold tracking-tight lg:text-3xl">
        Log in
      </h1>

      <form
        class="mt-10"
        @submit="submit"
      >
        <fieldset
          :disabled="isSubmitting"
          class="grid gap-5"
        >
          <UiButton
            variant="outline"
            type="button"
            to="/auth/github"
            external
          >
            <Icon
              class="size-4"
              name="logos:github"
            />
            <span class="ml-2">Continue with github</span>
          </UiButton>
          <UiButton
            variant="outline"
            type="button"
            @click="signInWithFacebook()"
          >
            <Icon
              class="size-4"
              name="logos:facebook"
            />
            <span class="ml-2">Continue with Facebook</span>
          </UiButton>
        </fieldset>
      </form>
      <p class="mt-8 text-sm">
        <NuxtLink
          class="font-semibold text-primary underline-offset-2 hover:underline"
          to="#"
        >Forgot password?</NuxtLink>
      </p>
      <p class="mt-4 text-sm text-muted-foreground">
        Don't have an account?
        <NuxtLink
          class="font-semibold text-primary underline-offset-2 hover:underline"
          to="#"
        >
          Create account</NuxtLink>
      </p>
    </div>
  </div>
</template>
