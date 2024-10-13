import { count, desc } from "drizzle-orm";
import type { ToolInsert } from "~~/server/utils/drizzle";

export async function findTopTenTools(limit = 10) {
  return useDrizzle().select().from(tables.tools)
    .leftJoin(tables.stats, eq(tables.tools.id, tables.stats.toolId))
    .groupBy(tables.tools.id).orderBy(desc(count(tables.stats.views)))
    .limit(limit).get();
}

export async function createTool(tool: ToolInsert, categories: string[]) {
  const createdTool = await useDrizzle()
    .insert(tables.tools)
    .values(tool)
    .returning({
      id: tables.tools.id,
      name: tables.tools.name,
      description: tables.tools.description,
      url: tables.tools.url,
      likes: tables.tools.likes,
      tags: tables.tools.tags,
      pricing: tables.tools.pricing,
    })
    .get();

  //  create tags for tool if they don't exist
  tool.tags?.split(",").forEach(async (tag) => {
    // check if tag exists
    let tagExists = await useDrizzle().select().from(tables.tags).where(eq(tables.tags.name, tag.toUpperCase())).get();
    if (tagExists) {
      return;
    }
    else {
      tagExists = await useDrizzle().insert(tables.tags).values({
        name: tag.toUpperCase(),
        label: tag,
      }).returning({ id: tables.tags.id, name: tables.tags.name, label: tables.tags.label }).get();
    }

    await useDrizzle().insert(tables.toolTags).values({
      toolId: createdTool.id,
      tagId: tagExists.id,
    });
  });

  // create categories for tool if they don't exist
  categories.forEach(async (category) => {
    // check if category exists
    const categoryExists = await useDrizzle().select().from(tables.categories).where(eq(tables.categories.name, category.toUpperCase())).get();

    if (categoryExists) {
      return;
    }
    else {
      await useDrizzle().insert(tables.categories)
        .values({
          name: category.toUpperCase(),
          description: category.toUpperCase() || "No description provided",
        })
        .returning({ id: tables.categories.id, name: tables.categories.name, label: tables.categories.description }).get();
    }
  });

  return { ...createdTool, categories: categories };
}
