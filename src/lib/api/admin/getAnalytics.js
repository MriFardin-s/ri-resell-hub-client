import { protectedFetch } from "@/lib/core/server";

export const getAnalytics = async () => {
  return protectedFetch("/api/admin/analytics");
};