
const baseUrl = process.env.NEXT_PUBLIC_BASE_URL ;

export const serverFetch = async (path) => {
    try {
        const res = await fetch(`${baseUrl}${path}`);
        // handle 401, 402, 403
        return res.json();
    } catch (error) {
        console.error('Error fetching data:', error);
        throw error;
    }
};











export const serverMutation = async (path,data) => {
    try {
        const res = await fetch(`${baseUrl}${path}`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(data)

        });
        //handle 401, 402, 403
        return res.json();
    } catch (error) {
        console.error('Error adding product:', error);
        throw error;

    }
};  