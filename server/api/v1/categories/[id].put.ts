import { updateCategory } from "~~/server/utils/categories";

export default defineEventHandler(async (event) => {
  const id = getRouterParam(event, "id");

  const body = await readValidatedBody(event, insertCategorySchema.parse);
  const updatedCategory = updateCategory(Number(id), body);

  return updatedCategory;
});
