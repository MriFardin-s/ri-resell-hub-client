
const baseUrl = process.env.NEXT_PUBLIC_BASE_URL;


export const getProducts = async (productId, status= "available") => {
   
        const res = await fetch(`${baseUrl}/api/products?productId=
            ${productId}&status=${status}`

        );
        return res.json({ success: false, message: 'Failed to fetch products' });

    }
