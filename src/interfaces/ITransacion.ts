export interface ITransacion  {
    id?: number;
    amount: number;
    description: string;
    categoryId: number;
    userId: number;
    paidAt?: Date | null;
};
