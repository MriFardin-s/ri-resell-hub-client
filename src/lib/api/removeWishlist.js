import { serverFetch } from "../core/server"

export const removeWishlist = async (userId, productId) =>{
    return serverFetch(`/api/wishlist/remove?userId=${userId}&productId=${productId}`)
}