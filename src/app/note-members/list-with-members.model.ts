import { User } from '../auth/user.model';
export interface ListWithMembers{
    Creator: string,
    Desc: string,
    ID: string,
    Members?: User[]
}

// export interface User{
//     email: string,
//     uid: string,
//     displayName?: string
// }