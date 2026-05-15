import { create } from "zustand";
import axios from "../lib/axios_config";
import { Package } from "../types";
import { API_ENDPOINTS } from "../utilities/api-endpoints";
import { toastError } from "../utilities/toast_utils";

interface PackageState {
  fetchPackageByArtistId: (id: string) => Promise<Package[] | null>;
}

const usePackageStore = create<PackageState>(() => ({
  fetchPackageByArtistId: async (id: string) => {
    try {
      const response = await axios.get(
        `${API_ENDPOINTS.MAIN.PACKAGE?.BY_ARTIST(id)}`,
      );

      return response.data;
    } catch (err) {
      console.error(err);
      toastError("Failed to fetch artist package");
    }
  },
}));

export default usePackageStore;
