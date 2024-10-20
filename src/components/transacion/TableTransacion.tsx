import { useState, useEffect } from "react";
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table";
import { Label } from "@/components/ui/label"
import { Switch } from "@/components/ui/switch"
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
import { useCategoryDelete, useCategoryDataByUser } from "@/hooks/category/categoryHook";
import { ICategory } from '@/interfaces/ICategory';
import { DrawerCategory } from "./DrawerEditTransacion";


export function TableTransacion() {
    const { data } = useCategoryDataByUser();
    const [isPaid, setIsPaid] = useState(false);
    const [selectedCategory, setSelectedCategory] = useState<ICategory | null>(null);
    const [isDrawerOpen, setIsDrawerOpen] = useState(false);

    const handleEdit = (category: ICategory) => {
        setSelectedCategory(category);
        setIsDrawerOpen(true);
    };
    const handleSwitchChange = (id: number, isPaid: boolean) => {
        //updateCategoryPaymentStatus(id, isPaid); 
        // add logica aqui para ajustar no front
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
                        <TableHead className="w-2/12">Descrição</TableHead>
                        <TableHead>Categoria</TableHead>
                        <TableHead>Valor</TableHead>
                        <TableHead>Pago/Não Pago</TableHead>
                        <TableHead className="text-center">Ações</TableHead>
                    </TableRow>
                </TableHeader>
                <TableBody>

                    {Array.isArray(data) && data.map((category: ICategory) => (

                        <TableRow key={category.id}>
                            <TableCell className="w-5/12">
                                <div className="flex flex-row items-center">
                                    <span>{category.name}</span>
                                </div>
                            </TableCell>
                            <TableCell>
                                <p className="w-fit p-1 px-4 rounded " style={{
                                    backgroundColor: category.color,
                                }}>{category.description}</p></TableCell>
                            <TableCell>{category.expense ? <p className="w-fit bg-rose-100 p-2 px-4 text-sm rounded text-rose-950">Saída</p> : <p className="w-fit bg-green-100 p-2 text-sm rounded text-green-950">Entrada</p>}</TableCell>
                            <TableCell>
                                <div className="flex items-center space-x-2">
                                    <Switch
                                        id={`payment-status-${category.id}`}
                                        checked={category.expense ? true : false}  // Vindo do objeto category
                                        onCheckedChange={(checked) => handleSwitchChange(category.id!, checked)}
                                    />
                                    <Label htmlFor={`payment-status-${category.id}`}>
                                        {category.expense ? "Pago" : "Não pago"}
                                    </Label>
                                </div>
                            </TableCell>
                            <TableCell>
                                <div className="flex justify-center">
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
        setIsModalOpen(false);
    };

    const handleDelete = () => {
        mutate(category.id!);
        if (isSuccess) {
            handleClose();
        }
    };

    return (
        <Dialog open={isModalOpen} onOpenChange={setIsModalOpen}>
            <DialogTrigger asChild>
                <div className="cursor-pointer relative flex select-none items-center rounded-sm px-2 py-1.5 text-sm outline-none transition-colors focus:bg-accent focus:text-accent-foreground data-[disabled]:pointer-events-none data-[disabled]:opacity-50 hover:bg-accent hover:text-accent-foreground">
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
                    <Button variant="secondary" onClick={handleClose}>Cancelar</Button>
                    <Button variant="destructive" onClick={handleDelete}>Deletar</Button>
                </DialogFooter>
            </DialogContent>
        </Dialog>
    );
}
