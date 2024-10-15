export interface ICategoryForm {
    id: number;
    name: string;
    description: string;
    color: string;
}

export type ICategory = {
    id: number;
    name: string;
    description: string;
    color: string;
    creationDate: Date;
};
