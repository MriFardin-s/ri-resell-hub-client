import { serverMutation } from "@/lib/core/server";

export const updateUserRole = async (id, action) => {
    return serverMutation(
        `/api/admin/users/${id}/status`,
        { action },
        "PATCH"
    );
};