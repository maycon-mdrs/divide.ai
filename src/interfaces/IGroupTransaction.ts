import { User } from "@/types/User";
import { IDebt } from "./IDebt";
import { IGroup } from "./IGroup";
import { IUser } from "./IUser";

export interface IGroupTransaction  {
    id?: number;
    amount: number;
    description: string;
    groupId: number;
    debts: IDebt[];
    createdBy?: number;
};

export interface IGroupTransactionResponse  {
    id: number;
    amount: number;
    description: string;
    group: IGroup;
    debts: IDebt[];
    createdBy: IUser;
};
