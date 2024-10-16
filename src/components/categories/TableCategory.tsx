import { useState, useEffect } from "react";
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table";
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Trash2, FilePenLine } from 'lucide-react';
import { useCategoryData, useCategoryDelete } from "@/hooks/category/categoryHook";
import { ICategory } from '@/interfaces/ICategory';
import { DrawerCategory } from "./DrawerEditCategory"; 


export function TableCategory() {
    const { data } = useCategoryData();
    const [selectedCategory, setSelectedCategory] = useState<ICategory | null>(null);
    const [isDrawerOpen, setIsDrawerOpen] = useState(false);

    const handleEdit = (category: ICategory) => {
        setSelectedCategory(category); 
        setIsDrawerOpen(true); 
    };

    const handleDrawerClose = () => {
        setIsDrawerOpen(false);
        setSelectedCategory(null); 
    };

    return (
        <>
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
                    {data?.map((category: ICategory) => (
                        <TableRow key={category.id}>
                            <TableCell>{category.name}</TableCell>
                            <TableCell>{category.description}</TableCell>
                            <TableCell>
                                <div className="w-5 h-5 rounded-full" style={{ backgroundColor: category.color }}></div>
                            </TableCell>
                            <TableCell>
                                <div className="flex">
                                    <Button variant="link" className="text-gray p-1" onClick={() => handleEdit(category)}>
                                        <FilePenLine className="w-5 h-5" />
                                    </Button>
                                    <ButtonDelete category={category} />
                                </div>
                            </TableCell>
                        </TableRow>
                    ))}
                </TableBody>
            </Table>

            {/* Drawer para edição */}
            {selectedCategory && (
                <DrawerCategory
                    initialCategory={selectedCategory} 
                    isOpen={isDrawerOpen} 
                    onClose={handleDrawerClose} 
                />
            )}
        </>
    );
}

function ButtonDelete({ category }: { category: ICategory }) {
    const [isModalOpen, setIsModalOpen] = useState(false);
    const { mutate, isSuccess } = useCategoryDelete();

    const handleClose = () => {
        setIsModalOpen(prev => !prev);
    };

    useEffect(() => {
        handleClose();
    }, [isSuccess]);

    return (
        <Dialog open={isModalOpen} onOpenChange={handleClose}>
            <DialogTrigger asChild>
                <div className="relative flex cursor-default select-none items-center rounded-sm px-2 py-1.5 text-sm outline-none transition-colors focus:bg-accent focus:text-accent-foreground data-[disabled]:pointer-events-none data-[disabled]:opacity-50 hover:bg-accent hover:text-accent-foreground">
                    <Trash2 color="red" className="w-5 h-5 text-gray-50" />
                </div>
            </DialogTrigger>
            <DialogContent>
                <DialogHeader>
                    <DialogTitle>Você tem certeza dessa ação?</DialogTitle>
                    <DialogDescription>
                        Esta ação não pode ser desfeita. Isso excluirá permanentemente sua categoria e suas dívidas/entradas associadas a esta categoria.
                    </DialogDescription>
                </DialogHeader>
                <DialogFooter>
                    <Button variant="destructive" onClick={() => mutate(category.id!)}>Deletar</Button>
                </DialogFooter>
            </DialogContent>
        </Dialog>
    );
}
