import { serverFetch } from "../core/server";

export const getFeaturedProducts = async () => {
  return serverFetch("/api/featured-products");
};