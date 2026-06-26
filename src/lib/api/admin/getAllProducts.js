import { serverFetch } from "@/lib/core/server";


export const getAllProducts = async () => {
  return serverFetch("/api/all/products");
};