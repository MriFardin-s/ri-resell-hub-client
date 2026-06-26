import { protectedFetch } from "../core/server"

export const removeWishlist = async (userId, productId) =>{
    return protectedFetch(`/api/wishlist/remove?userId=${userId}&productId=${productId}`)
}