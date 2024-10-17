import { insertTagSchema } from "~~/server/utils/drizzle";
import { checkIfTagExists, createTag } from "~~/server/utils/tag";

export default eventHandler(async (event) => {
  const body = await readValidatedBody(event, insertTagSchema.parse);
  const existingTag = await checkIfTagExists(body.name as string);
  if (existingTag) {
    return createError({ statusCode: 409, message: "Tag already exists" });
  }
  else {
    const createdTag = await createTag(body);
    return createdTag;
  }
});
