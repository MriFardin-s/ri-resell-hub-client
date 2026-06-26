import { serverMutation } from "@/lib/core/server";

export const updateProductStatus = async (id, action) => {
  return serverMutation(
    `/api/admin/products/${id}/status`,
    { action },
    "PATCH"
  );
};