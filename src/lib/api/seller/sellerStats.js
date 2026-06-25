import { serverFetch } from "@/lib/core/server";

export const getSellerStats = async (id) => {
  return serverFetch(`/api/seller/stats?userId=${id}`);
};