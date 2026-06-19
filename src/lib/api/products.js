
// const baseUrl = process.env.NEXT_PUBLIC_BASE_URL;

import { serverFetch } from "../core/server"


// export const getProducts = async (productId, status= "pending") => {
   
//         const res = await fetch(`${baseUrl}/api/products?productId=${productId}&status=${status}`
//         );
//         return res.json();

//     }


export const getProducts = async (sellerId, status = "pending") => {
    return serverFetch(`/api/products?sellerId=${sellerId}&status=${status}`);
}


