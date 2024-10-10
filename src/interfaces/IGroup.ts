import { GroupStatus } from "@/types/Group";
import { IUserCard } from "./IUser";

export interface IGroupCard {
    id: number;
    name: string;
    description: string;
    creator: IUserCard;
    status: GroupStatus;
    users: IUserCard[];
    groupCode: string;
}

export interface IGroupForm {
    id: number;
    name: string;
    description: string;
    code?: number;
}