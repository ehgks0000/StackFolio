import { atom } from "recoil";

export interface User {
    user_id: string
    email: string
    username: string
    bio: string
    avatar: string
}
const defaultUserState = {
    user_id: '',
    email: '',
    username: '',
    bio: '',
    avatar: '',
}
export const userState = atom({
    key:'userState',
    default: defaultUserState
})