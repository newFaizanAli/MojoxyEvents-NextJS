import { create } from "zustand";
import axios from "../lib/axios_config";
import { Artist } from "../types";
import { API_ENDPOINTS } from "../utilities/api-endpoints";
import { toastError, toastSuccess } from "../utilities/toast_utils";

interface ArtistState {
  artists: Artist[];
  fetchArtists: (
    searchText?: string,
    category?: string,
    is_featured?: boolean,
  ) => Promise<void>;
  fetchArtistById: (id: string) => Promise<Artist | null>;
  addArtist: (artist: Artist) => Promise<void>;
  updateArtist: (id: string, artist: Partial<Artist>) => Promise<void>;
  deleteArtist: (id: string) => Promise<void>;
}

const useArtistStore = create<ArtistState>((set) => ({
  artists: [],

  fetchArtists: async (searchText = "", category = "", is_featured = false) => {
    try {
      const { data } = await axios.get(
        `${API_ENDPOINTS.MAIN.ARTIST.BASE}?search=${searchText}&category=${category}&is_featured=${is_featured}`,
      );

      if (data?.success) {
        set({ artists: data.data });
      }
    } catch {
      toastError("Failed to fetch artists");
    }
  },

  fetchArtistById: async (id: string) => {
    try {
      const response = await axios.get(
        `${API_ENDPOINTS.MAIN.ARTIST?.BY_ID(id)}`,
      );

      return response.data;
    } catch (err) {
      console.error(err);
      toastError("Failed to fetch artist");
    }
  },

  addArtist: async (artist: Artist) => {
    try {
      const response = await axios.post(
        `${API_ENDPOINTS?.MAIN.ARTIST?.BASE}`,
        artist,
      );

      const newArtist = response.data;

      if (newArtist.success) {
        toastSuccess(newArtist.message || "Artist added successfully");
        set((state) => ({
          artists: [...state.artists, newArtist.data],
        }));
      }
    } catch (err) {
      console.error(err);
      toastError("Failed to add artist");
    }
  },

  updateArtist: async (id, artist) => {
    try {
      const resp = await axios.put(
        `${API_ENDPOINTS?.MAIN.ARTIST?.BY_ID(id)}`,
        artist,
      );

      if (resp.data.success) {
        toastSuccess(resp.data.message || "Artist updated successfully");
        set((state) => ({
          artists: state.artists.map((u) =>
            String(u._id) === String(id) ? { ...u, ...artist } : u,
          ),
        }));
      }
    } catch (err) {
      console.error(err);
      toastError("Failed to update artist");
    }
  },

  deleteArtist: async (id) => {
    try {
      const resp = await axios.delete(
        `${API_ENDPOINTS?.MAIN.ARTIST?.BASE}/${id}`,
      );

      if (resp.data.success) {
        toastSuccess(resp.data.message || "Artist deleted successfully");
        set((state) => ({
          artists: state.artists.filter((u) => String(u._id) !== String(id)),
        }));
      }
    } catch (err) {
      console.error(err);
      toastError("Failed to delete artist");
    }
  },
}));

export default useArtistStore;
