import { protectedFetch  } from "@/lib/core/server";

export const getSellerStats = async (id) => {
  return protectedFetch(`/api/seller/stats?userId=${id}`);
};