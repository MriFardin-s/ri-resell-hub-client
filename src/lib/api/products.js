
// const baseUrl = process.env.NEXT_PUBLIC_BASE_URL;

import { protectedFetch, serverFetch } from "../core/server"


// export const getProducts = async (productId, status= "pending") => {
   
//         const res = await fetch(`${baseUrl}/api/products?productId=${productId}&status=${status}`
//         );
//         return res.json();

//     }


export const getProducts = async (sellerId) => {
    return protectedFetch(`/api/products?sellerId=${sellerId}`);
}

export const getAllProducts = async (query = "") => {
    return serverFetch(`/api/all/products?${query}`);
};


export const getAllProductsById = async (id) => {
    return serverFetch(`/api/all/products/${id}`)
}


