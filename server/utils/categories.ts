export async function getAllCategories() {
  return useDrizzle()
    .select()
    .from(tables.categories);
}
export async function createNewCategory(category: CategoryInsert) {
  return useDrizzle()
    .insert(tables.categories)
    .values({
      ...category,
      name: category.name?.toUpperCase(),
    })
    .returning({ id: tables.categories.id, name: tables.categories.name, description: tables.categories.description, status: tables.categories.status, icon: tables.categories.icon })
    .get();
}

export async function checkIfCategoryExists(name: string) {
  return useDrizzle().select().from(tables.categories).where(eq(tables.categories.name, name.toUpperCase())).get();
}

export async function updateCategory(id: number, category: Partial<Omit<Category, "id">>) {
  return useDrizzle().update(tables.categories).set(category).where(eq(tables.categories.id, id)).get();
};

export async function deleteCategory(id: number) {
  return useDrizzle().delete(tables.categories).where(eq(tables.categories.id, id));
}
