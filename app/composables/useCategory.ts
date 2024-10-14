import type { Category } from "~~/server/utils/drizzle";

const categories = ref<Category[]>([]);

export function useCategory() {
  const getCategories = async () => {
    const { data } = await useFetch<Category[]>("/api/v1/categories");
    categories.value = data.value as unknown as Category[];
  };

  const createCategory = async (category: Omit<Category, "id">) => {
    const { status, error } = await useCsrfFetch("/api/v1/categories", {
      method: "POST",
      body: category,
    });

    if (status.value === "success") {
      getCategories();
      return { status, error };
    }
    else {
      return { status, error };
    }
  };

  const HandleEditCategory = async (category: Category) => {
    const { status, error } = await useCsrfFetch(`/api/v1/categories/${category.id}`, {
      method: "PUT",
      body: category,
    });

    if (status.value === "success") {
      getCategories();
      return { status, error };
    }
    else {
      return { status, error };
    }
  };

  const HandleDeleteCategory = async (id: number) => {
    const { status, error } = await useCsrfFetch(`/api/v1/categories/${id}`, {
      method: "DELETE",
    });

    if (status.value === "success") {
      getCategories();
      useToast().toast({
        title: "Category deleted",
        description: "Category deleted successfully",
        variant: "success",
        icon: "lucide:check",
      });

      return { status, error };
    }
    else {
      useToast().toast({
        title: "Can't delete category",
        description: error.value.data.message,
        variant: "destructive",
        icon: "lucide:badge-x",
      });
      return { status, error };
    }
  };

  return {
    categories,
    getCategories,
    createCategory,
    HandleEditCategory,
    HandleDeleteCategory,
  };
}
