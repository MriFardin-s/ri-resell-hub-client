import { serverMutation } from "../core/server"


export const changeEmail = async (data)=>{
    return serverMutation (`/api/users/update-profile`, data, 'PATCH')
}