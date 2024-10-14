import { deleteCategory } from "~~/server/utils/categories";

export default defineEventHandler(async (event) => {
  const id = getRouterParam(event, "id");
  console.log(`Deleting category with id: ${id}`);

  if (!id) {
    return sendNoContent(event, 400);
  }

  return await deleteCategory(Number(id));
});
