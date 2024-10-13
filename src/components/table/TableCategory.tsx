import {
    Table,
    TableBody,
    TableCaption,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table";
import { Trash2, FilePenLine } from 'lucide-react';
import { Button } from "@/components/ui/button"; 
import { IconDelete } from '../icon/iconDelete';

export function TableCategory(props: { data: any }) {
    return (
        <Table>
            <TableCaption>Categorias</TableCaption>
            <TableHeader>
                <TableRow>
                    <TableHead className="w-2/12">Nome</TableHead>
                    <TableHead>Descrição</TableHead>
                    <TableHead>Cor</TableHead>
                    <TableHead className="w-2/12">Ações</TableHead>
                </TableRow>
            </TableHeader>
            <TableBody>
                {props.data.map((category: any) => (
                    <TableRow key={category.id}>
                        <TableCell className="font-medium">{category.name}</TableCell>
                        <TableCell>{category.description}</TableCell>
                        <TableCell>                        
                            <div className="w-5 h-5 rounded-full" style={{ backgroundColor: category.cor }}></div>
                        </TableCell>
                        <TableCell>
                            <div className="flex space-x-2">
                                <Button variant="link" className="text-gray" onClick={() => handleEdit(category.id)}>
                                    <FilePenLine className="w-5 h-5"/>
                                </Button>
                                <Button variant="destructive" onClick={() => handleDelete(category.id)}>
                                    <Trash2 className="w-5 h-5" />
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