export interface IUser {
    email?: string;
    token?: string;
    id?: number;

}

export interface ILogin {
    email: string;
    password: string;
}

export interface IUserRegister {
    firstName: string;
    lastName: string;
    email: string;
    password: string;
    phoneNumber: string;
}

export interface IUserCard {
    id: number;
    firstName: string;
    lastName: string;
}