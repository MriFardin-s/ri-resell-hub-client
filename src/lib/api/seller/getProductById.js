import { protectedFetch } from "@/lib/core/server";

export const getProduct = async (id) => {
  return protectedFetch(`/api/products/${id}`);
};