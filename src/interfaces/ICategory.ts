export interface ApiResponse<T> {
    success: boolean;
    message: string;
    data: T;
    error: string | null;
}

export interface ICategory  {
    id?: number;
    name: string;
    description: string;
    color: string;
    expense: boolean | number;
    userId: number;
};
