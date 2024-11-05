import { IUser } from "./IUser";

export interface IDebt  {
    id?: number;
    amount: number;
    user: IUser;
    paidAt?: Date | null;
};


