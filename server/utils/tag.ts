import type { SQL } from "drizzle-orm";
import type { TagInsert } from "~~/server/utils/drizzle";

export async function findTagById(id: number) {
  try {
    return await useDrizzle().select().from(tables.tags).where(eq(tables.tags.id, id)).get();
  }
  catch (error) {
    console.error("Error finding Tag by ID:", error);
    throw error;
  }
}

export async function checkIfTagExists(name: string) {
  return useDrizzle().select().from(tables.tags).where(eq(tables.tags.name, name.toUpperCase())).get();
}
export async function findTagBy(query: SQL | undefined) {
  try {
    return await useDrizzle().select().from(tables.tags).where(query).get();
  }
  catch (error) {
    console.error("Error finding Tag by query:", error);
    throw error;
  }
}

export async function createTag(tag: TagInsert) {
  try {
    const createdTag = await useDrizzle()
      .insert(tables.tags)
      .values(tag)
      .returning({
        id: tables.tags.id,
        name: tables.tags.name,
        label: tables.tags.label,
      })
      .get();
    return createdTag;
  }
  catch (error) {
    console.error("Error creating Tag:", error);
    throw error;
  }
}

export async function updateTag(id: number, tag: Partial<TagInsert>) {
  try {
    return await useDrizzle().update(tables.tags).set(tag).where(eq(tables.tags.id, id)).run();
  }
  catch (error) {
    console.error("Error updating Tag:", error);
    throw error;
  }
}

export async function deleteTag(id: number) {
  try {
    return await useDrizzle().delete(tables.tags).where(eq(tables.tags.id, id)).run();
  }
  catch (error) {
    console.error("Error deleting Tag:", error);
    throw error;
  }
}

export async function getAllTag() {
  try {
    return await useDrizzle().select().from(tables.tags).get();
  }
  catch (error) {
    console.error("Error fetching Tag:", error);
    throw error;
  }
}
