import { serverMutation } from "@/lib/core/server";

export const toggleUserStatus = async (id, banned) => {
    return serverMutation(
        `/api/admin/users/${id}/status`,
        { banned },
        "PATCH"
    );
};