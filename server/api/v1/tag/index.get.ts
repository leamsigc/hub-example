// index.get.ts.template

import { getAllTag } from "~~/server/utils/tag";

export default eventHandler(async () => {
  try {
    const tagList = await getAllTag();
    return {
      body: tagList,
      status: 200,
    };
  }
  catch (error) {
    console.error("Error fetching Tag:", error);
    return {
      body: { error: "Failed to fetch Tag" },
      status: 500,
    };
  }
});
