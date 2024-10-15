import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table";
import { Trash2, FilePenLine } from 'lucide-react';
import { Button } from "@/components/ui/button"; 
import { useState } from "react";
// import { CategoryService } from '../../services/CategoryService';
import { ICategory } from '@/interfaces/ICategory';

export function TableCategory(props: { data?: any[] }) {
    const { data = [] } = props;
    // const [categories, setCategories] = useState<Category[]>(props.data);
    // const [loading, setLoading] = useState(false);  
    // const [error, setError] = useState<string | null>(null);  

    // const handleEdit = (id: any) => {
    //     console.log(`Editando categoria com ID: ${id}`);
    // };

    // const handleDelete = async (id: any) => {
    //     const categoryService = new CategoryService();
    //     setLoading(true);

    //     try {
    //         await categoryService.deleteCategory(id, 'eyJhbGciOiJIUzI1NiJ9.eyJpZCI6IjUyIiwic3ViIjoidXNlckBnbWFpbC5jb20iLCJpYXQiOjE3Mjg5NjU1OTMsImV4cCI6MTcyODk2OTE5M30.kprlzGb7TE6uQLlAEnRPJMKW4tr39ZneAk6ufPsf6MI');
    //         setCategories(categories.filter((category: Category) => category.id !== id));
    //         setLoading(false);
    //     } catch (error: any) {
    //         setLoading(false);
    //         setError('Erro ao excluir categoria');
    //         console.error(error);
    //     }
    // };

    return (
        <Table>
           
            <TableHeader>
                <TableRow>
                    <TableHead className="w-2/12">Nome</TableHead>
                    <TableHead>Descrição</TableHead>
                    <TableHead>Cor</TableHead>
                    <TableHead className="w-2/12">Ações</TableHead>
                </TableRow>
            </TableHeader>
            <TableBody>
                {data.map((category: any) => (
                    <TableRow key={category.id}>
                        <TableCell className="">{category.name}</TableCell>
                        <TableCell>{category.description}</TableCell>
                        <TableCell>                        
                            <div className="w-5 h-5 rounded-full" style={{ backgroundColor: category.color }}></div>
                        </TableCell>
                        <TableCell>
                            <div className="flex">
                                <Button variant="link" className="text-gray p-1" onClick={() => handleEdit(category.id)}>
                                    <FilePenLine className="w-5 h-5"/>
                                </Button>
                                <Button variant="link" onClick={() => handleDelete(category.id)}>
                                    <Trash2 color="red" className="w-5 h-5 text-gray-50" />
                                </Button>
                            </div>  
                        </TableCell>
                    </TableRow>
                ))}
            </TableBody>
        </Table>
    );
}


function handleEdit(id: any) {
    console.log(`Editando categoria com ID: ${id}`);
}

function handleDelete(id: any) {
    console.log(`Excluindo categoria com ID: ${id}`);
}