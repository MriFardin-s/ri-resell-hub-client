'use server';
const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || 'http://localhost:9000';
export const addProduct = async (newProductData) => {
    try {
        const res = await fetch(`${baseUrl}/api/products`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(newProductData)

        });
        return res.json({ success: false, message: 'Failed to add product' });
    } catch (error) {
        console.error('Error adding product:', error);
        throw error;

    }
};  