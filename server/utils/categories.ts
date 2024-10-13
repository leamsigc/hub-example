export async function getAllCategories() {
  return useDrizzle()
    .select()
    .from(tables.categories);
}
