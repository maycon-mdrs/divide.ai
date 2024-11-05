import { IUserResponse } from "./IUser";

export interface IDebt{
    id?: number;
    amount: number;
    user: IUserResponse;
    createdAt?: Date;
    paidAt: Date;
};
