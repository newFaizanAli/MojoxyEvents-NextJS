import { create } from "zustand";
import axios from "../lib/axios_config";
import { Category } from "../types";
import { API_ENDPOINTS } from "../utilities/api-endpoints";
import { toastError, toastSuccess } from "../utilities/toast_utils";

interface CategoryState {
  categories: Category[];
  fetchCategories: (searchText?: string) => Promise<void>;
  fetchCategoryById: (id: string) => Promise<Category | null>;
  addCategory: (categ: Category) => Promise<void>;
  updateCategory: (id: string, catgeory: Partial<Category>) => Promise<void>;
  deleteCategory: (id: string) => Promise<void>;
}

const useCategoryStore = create<CategoryState>((set) => ({
  categories: [],

  fetchCategories: async (searchText = "") => {
    try {
      const { data } = await axios.get(
        `${API_ENDPOINTS.MAIN.CATEGORY.BASE}?search=${searchText}`,
      );

      if (data?.success) {
        set({ categories: data.data });
      }
    } catch {
      toastError("Failed to fetch categories");
    }
  },

  fetchCategoryById: async (id: string) => {
    try {
      const response = await axios.get(
        `${API_ENDPOINTS.MAIN.CATEGORY?.BY_ID(id)}`,
      );

      return response.data;
    } catch (err) {
      console.error(err);
      toastError("Failed to fetch category");
    }
  },

  addCategory: async (category: Category) => {
    try {
      const formData = new FormData();

      for (const key of Object.keys(category) as (keyof Category)[]) {
        const k = key;
        const value = category[k];

        if (k === "genres") {
          formData.append(k, JSON.stringify(value));
        } else {
          if (value instanceof File) {
            formData.append(k, value);
          } else if (value !== undefined && value !== null) {
            formData.append(k, String(value));
          }
        }
      }

      const response = await axios.post(
        `${API_ENDPOINTS?.MAIN.CATEGORY?.BASE}`,
        formData,
      );

      const newCategory = response.data;

      if (newCategory.success) {
        toastSuccess(newCategory.message || "Category added successfully");
        set((state) => ({
          categories: [...state.categories, newCategory.data],
        }));
      }
    } catch (err) {
      console.error(err);
      toastError("Failed to add category");
    }
  },

  updateCategory: async (id, category) => {
    try {
      const formData = new FormData();

      for (const key of Object.keys(category) as (keyof Category)[]) {
        const k = key;
        const value = category[k];
        if (k === "genres") {
          formData.append(k, JSON.stringify(value));
        } else {
          if (value instanceof File) {
            formData.append(k, value);
          } else if (value !== undefined && value !== null) {
            formData.append(k, String(value));
          }
        }
      }

      const resp = await axios.put(
        `${API_ENDPOINTS?.MAIN.CATEGORY?.BY_ID(id)}`,
        formData,
      );

      if (resp.data.success) {
        toastSuccess(resp.data.message || "Category updated successfully");
        set((state) => ({
          categories: state.categories.map((u) =>
            String(u._id) === String(id) ? { ...u, ...category } : u,
          ),
        }));
      }
    } catch (err) {
      console.error(err);
      toastError("Failed to update category");
    }
  },

  deleteCategory: async (id) => {
    try {
      const resp = await axios.delete(
        `${API_ENDPOINTS?.MAIN.CATEGORY?.BASE}/${id}`,
      );

      if (resp.data.success) {
        toastSuccess(resp.data.message || "Category deleted successfully");
        set((state) => ({
          categories: state.categories.filter(
            (u) => String(u._id) !== String(id),
          ),
        }));
      }
    } catch (err) {
      console.error(err);
      toastError("Failed to delete category");
    }
  },
}));

export default useCategoryStore;
