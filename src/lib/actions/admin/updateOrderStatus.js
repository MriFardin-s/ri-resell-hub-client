import { serverMutation } from "@/lib/core/server";


export const updateOrderStatus = async (id, status) => {
  return serverMutation(
    `/api/admin/orders/${id}/status`,
    { status },
    "PATCH"
  );
};