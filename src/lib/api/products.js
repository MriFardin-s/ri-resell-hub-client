
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
    let queryString = "";

    if (typeof query === "object" && query !== null) {
        const params = new URLSearchParams();

        Object.entries(query).forEach(([key, value]) => {
            if (value !== undefined && value !== null && value !== "") {
                params.append(key, value.toString());
            }
        });

        queryString = params.toString();
    } else if (typeof query === "string") {
        queryString = query;
    }

    const cleanQueryString = queryString.startsWith('?') ? queryString.slice(1) : queryString;

    return serverFetch(`/api/all/products${cleanQueryString ? `?${cleanQueryString}` : ''}`);
};


export const getAllProductsById = async (id) => {
    return serverFetch(`/api/all/products/${id}`)
}


