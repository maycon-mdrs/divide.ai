export interface IUser {
    email?: string;
    token?: string;
}

export interface ILogin {
    email: string;
    password: string;
}

export interface IUserCard {
    id: number;
    firstName: string;
    lastName: string;
}