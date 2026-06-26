
import { serverMutation } from "@/lib/core/server";

export const updateProduct = async (id, updatedProductData) => {
  return serverMutation(
    `/api/products/${id}`,
    updatedProductData,
    "PATCH"
  );
};