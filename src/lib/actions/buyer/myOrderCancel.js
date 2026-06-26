import { serverMutation } from "@/lib/core/server";

export const myOrderCancel = async (orderId) => {
    return serverMutation(
        `/api/orders/${orderId}/cancel`,
        {},
        "PATCH"
    );
};
