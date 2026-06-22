
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











export const serverMutation = async (path, data, method = 'POST') => {
    const res = await fetch(`${baseUrl}${path}`, {
        method: method,
        headers: {
            'Content-Type': 'application/json',
           
        },
        body: data ? JSON.stringify(data) : undefined,
    });
    return res.json();


    
}
