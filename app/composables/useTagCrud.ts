import type { Tag } from "~~/server/utils/drizzle";

const tagList = ref<Tag[]>([]);

export function useTagCrud() {
  const getTagList = async () => {
    const { data } = await useFetch<Tag[]>("/api/v1/tag");
    tagList.value = data.value as unknown as Tag[];
  };

  const createTag = async (tag: Omit<Tag, "id">) => {
    const { status, error } = await useCsrfFetch("/api/v1/tag", {
      method: "POST",
      body: tag,
    });

    if (status.value === "success") {
      getTagList();
      return { status, error };
    }
    else {
      return { status, error };
    }
  };

  const HandleEditTag = async (tag: Tag) => {
    const { status, error } = await useCsrfFetch(`/api/v1/tag/${tag.id}`, {
      method: "PUT",
      body: tag,
    });

    if (status.value === "success") {
      getTagList();
      return { status, error };
    }
    else {
      return { status, error };
    }
  };

  const HandleDeleteTag = async (id: number) => {
    const { status, error } = await useCsrfFetch(`/api/v1/tag/${id}`, {
      method: "DELETE",
    });

    if (status.value === "success") {
      getTagList();
      useToast().toast({
        title: "Tag deleted",
        description: "Tag deleted successfully",
        variant: "success",
        icon: "lucide:check",
      });

      return { status, error };
    }
    else {
      useToast().toast({
        title: "Can't delete Tag",
        description: error.value.data.message,
        variant: "destructive",
        icon: "lucide:badge-x",
      });
      return { status, error };
    }
  };

  return {
    tagList,
    getTagList,
    createTag,
    HandleEditTag,
    HandleDeleteTag,
  };
}
