import { serverFetch } from "../core/server";

export const getPopularCategories = async () => {
  return serverFetch("/api/categories/popular");
};