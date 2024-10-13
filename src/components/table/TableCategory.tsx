import {
    Table,
    TableBody,
    TableCaption,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table";
import { Button } from "@/components/ui/button"; 
import { IconDelete } from '../icon/iconDelete';

export function TableCategory(props: { data: any }) {
    return (
        <Table>
            <TableCaption>Categorias</TableCaption>
            <TableHeader>
                <TableRow>
                    <TableHead className="w-[100px]">Nome</TableHead>
                    <TableHead>Descrição</TableHead>
                    <TableHead>Cor</TableHead>
                    <TableHead className="w-4/12">Ações</TableHead>
                </TableRow>
            </TableHeader>
            <TableBody>
                {props.data.map((category: any) => (
                    <TableRow key={category.id}>
                        <TableCell className="font-medium">{category.name}</TableCell>
                        <TableCell>{category.description}</TableCell>
                        <TableCell>{category.cor}</TableCell>
                        <TableCell>
                            <div className="flex space-x-2">
                                <Button variant="link" className="text-gray" onClick={() => handleEdit(category.id)}>
                                    Editar
                                </Button>
                                <Button variant="destructive" onClick={() => handleDelete(category.id)}>
                                    <IconDelete/>
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