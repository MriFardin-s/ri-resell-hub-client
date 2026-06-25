import { getUserToken } from "./session";

const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || "http://localhost:9000" ;
export const authHeader = async () =>{
    const token = await getUserToken();
    const header = token ? {
        authorization: `Bearer ${token}` 
    } : {};
    return header
}
export const serverFetch = async (path) => {
    try {
        const res = await fetch(`${baseUrl}${path}`,
        {
            cache: 'no-store',
        });
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
            ...await authHeader()
           
        },
        body: data ? JSON.stringify(data) : undefined,
    });
    return res.json();


    
}
