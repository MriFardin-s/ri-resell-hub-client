

import { serverMutation } from "@/lib/core/server";

export const deleteProduct = async (id) => {
  return serverMutation(
    `/api/products/${id}`,
    null,
    "DELETE"
  );
};