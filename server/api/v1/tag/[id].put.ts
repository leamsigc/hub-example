import { insertTagSchema } from "~~/server/utils/drizzle";

export default defineEventHandler(async (event) => {
  const id = getRouterParam(event, "id");
  console.log(`Updating Tag with id: ${id}`);
  const body = await readValidatedBody(event, insertTagSchema.parse);
  const updatedTag = await updateTag(Number(id), body);
  return updatedTag;
});
