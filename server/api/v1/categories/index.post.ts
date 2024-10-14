import type { H3Event } from "h3";
import { createNewCategory, checkIfCategoryExists } from "~~/server/utils/categories";
import { insertCategorySchema } from "~~/server/utils/drizzle";

export default eventHandler(async (e: H3Event) => {
  const body = await readValidatedBody(e, insertCategorySchema.parse);

  // check if category already exists
  const existingCategory = await checkIfCategoryExists(body.name as string);
  if (existingCategory) {
    return createError({ statusCode: 409, message: "Category already exists" });
  }
  else {
    const createdCategory = await createNewCategory(body);
    return createdCategory;
  }
});
