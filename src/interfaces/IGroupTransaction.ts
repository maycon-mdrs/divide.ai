import { User } from "@/types/User";
import { IDebt, IDebtRequest } from "./IDebt";
import { IGroup } from "./IGroup";
import { IUser } from "./IUser";

export interface IGroupTransactionRequest  {
    id?: number;
    amount: number;
    description: string;
    groupId: number;
    debts: IDebtRequest[];
    createdBy?: number;
};
