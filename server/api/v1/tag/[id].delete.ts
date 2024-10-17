export default defineEventHandler(async (event) => {
  const id = getRouterParam(event, "id");
  console.log(`Deleting Tag with id: ${id}`);
  if (!id) {
    return sendNoContent(event, 400);
  }
  return await deleteTag(Number(id));
});
