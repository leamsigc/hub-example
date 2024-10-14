import { updateCategory } from "~~/server/utils/categories";

export default defineEventHandler(async (event) => {
  const id = getRouterParam(event, "id");

  console.log(`Updating category with id: ${id}`);

  const body = await readValidatedBody(event, insertCategorySchema.parse);
  const updatedCategory = await updateCategory(Number(id), body);

  return updatedCategory;
});
