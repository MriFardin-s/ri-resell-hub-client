import { serverMutation } from "@/lib/core/server";


export const deleteUser = async (id) => {
    return serverMutation(
        `/api/admin/users/${id}`,
        null,
        "DELETE"
    );
};