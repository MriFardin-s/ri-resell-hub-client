import { protectedFetch } from "../core/server"

export const getCheckWishlist = async (userId, productId) =>{
    return protectedFetch(`/api/wishlist/status?userId=${userId}&productId=${productId}`)
}
