import { getAllCategories } from "~~/server/utils/categories";

export default eventHandler(async () => {
  const categories = await getAllCategories();

  return categories;
});
