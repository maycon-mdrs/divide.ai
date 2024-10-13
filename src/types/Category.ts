import { User } from "./User";

export type CategoryStatus = 'active' | 'inactive';

export type Category = {
    id: number;
    name: string;
    description: string;
    color: string;
    creationDate: Date;
    creator: User;
};
