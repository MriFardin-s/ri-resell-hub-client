import { serverMutation } from "../core/server"

export const ChangePassword = async (password) =>{
    return serverMutation(`/api/users/change-password`, password, 'PATCH')
}