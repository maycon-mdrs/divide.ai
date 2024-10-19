import { useQueryClient } from "@tanstack/react-query";
import { useState } from "react";
import {
    Drawer,
    DrawerContent,
    DrawerDescription,
    DrawerHeader,
    DrawerTitle,
    DrawerTrigger,
} from "@/components/ui/drawer";
import { Button } from "@/components/ui/button";
import { message } from "antd";
import { ICategory} from "@/interfaces/ICategory";
import { CategoryForm } from "./CategoryForm";
import { useCategoryMutate } from "@/hooks/category/categoryHook";

export function DrawerNewCategory() {
  const [isOpen, setIsOpen] = useState(false);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [isLoading, setLoading] = useState(false);
  const { mutate: createCategory } = useCategoryMutate();
   
  const handleClose = () => {
    setIsOpen(false);
};
const queryClient = useQueryClient();

const handleCategorySave = (values: ICategory) => {
  setLoading(true);
  setTimeout(() => {
    setIsDialogOpen(true);
    message.success("Categoria criada com sucesso!");
    setLoading(false);
    console.log("no envio da categoria: ", values);
    
    createCategory(values, {
      onSuccess: () => {
      }
    });
    
    setIsOpen(false);
  }, 500);
};

  return (
    <Drawer open={isOpen} onOpenChange={setIsOpen} onClose={handleClose}>
      <DrawerTrigger asChild onClick={() => setIsOpen(true)}>
        <Button variant="divideDark">Nova Categoria</Button>
      </DrawerTrigger>
      <DrawerContent>
        <div className="mx-auto w-full max-w-lg flex flex-col justify-center">
          <DrawerHeader>
            <DrawerTitle>Criar nova categoria</DrawerTitle>
            <DrawerDescription>Preencha os detalhes para criar uma nova categoria.</DrawerDescription>
            <CategoryForm onSubmit={handleCategorySave} isLoading={isLoading} />
          </DrawerHeader>
        </div>
      </DrawerContent>
      
    </Drawer>
  );
}