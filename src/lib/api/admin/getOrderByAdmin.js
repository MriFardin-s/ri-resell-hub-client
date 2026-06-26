import { protectedFetch } from "@/lib/core/server"

export const getOrderByAdmin = async () =>{
    return protectedFetch(`/api/admin/orders`)
}