import { serverMutation } from "@/lib/core/server"

export const updateSellerStatus = async (orderId, status ) =>{
    return serverMutation(`/api/orders/${orderId}/status`, {status}, 'PATCH')
}