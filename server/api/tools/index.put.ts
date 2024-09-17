import type { H3Event } from "h3";
import { z } from "zod";
import { insertToolSchema } from "~~/server/utils/drizzle";
import { createTool } from "~~/server/utils/tools";

export default eventHandler(async (e: H3Event) => {
  // Get request body
  const { tool, categories } = await readValidatedBody(e, z.object({ tool: insertToolSchema, categories: z.array(z.string()) }).parse);

  // Create tool
  const createdTool = await createTool(tool, categories);
  return createdTool;
  // validate body with zod schema
});
