import type { H3Event } from "h3";
import { findTopTenTools } from "~~/server/utils/tools";

export default eventHandler(async (e: H3Event) => {
  const { tag, limit } = getQuery(e);

  if (tag == "top-10-tools") {
    const numberLimit = limit ? Number(limit) : 10;
    const tools = await findTopTenTools(numberLimit);
    return tools;
  }
  else {
    return [];
  }
});
