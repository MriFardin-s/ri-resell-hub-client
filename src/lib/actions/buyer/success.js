import { serverMutation } from "@/lib/core/server";


export const postSuccess = async (sessionId) =>{
    return serverMutation("/api/orders",
    {  sessionId }, "POST");
}