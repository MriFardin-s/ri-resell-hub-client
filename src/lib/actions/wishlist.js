import { serverMutation } from "../core/server";

export const updateWishlist = async (userId, productId) => {
    const result = await serverMutation(`/api/wishlist/status?userId=${userId}&productId=${productId}`, null, 'PATCH');
    return result;
};