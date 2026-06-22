import { serverFetch } from "../core/server"

export const getCheckWishlist = async (userId, productId) =>{
    return serverFetch(`/api/wishlist/status?userId=${userId}&productId=${productId}`)
}
