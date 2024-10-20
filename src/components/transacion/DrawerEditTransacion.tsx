import { useState } from "react";
import {
  Drawer,
  DrawerContent,
  DrawerDescription,
  DrawerHeader,
  DrawerTitle,
} from "@/components/ui/drawer";
import { ICategory } from "@/interfaces/ICategory";
import { TrasacionForm } from "./TransacionForm";
import { message } from "antd";
import { useCategoryUpdate } from "@/hooks/category/categoryHook"; 

interface DrawerCategoryProps {
  initialCategory: ICategory; 
  isOpen: boolean; 
  onClose: () => void; 
}

export function DrawerCategory({ initialCategory, isOpen, onClose }: DrawerCategoryProps) {
  const [isLoading, setLoading] = useState(false);

  const { mutate: updateCategory } = useCategoryUpdate();

  const handleCategorySave = (values: ICategory) => {
    setLoading(true);

    updateCategory(
      { ...values, id: initialCategory.id },
      {
        onSuccess: () => {
          message.success("Transação editada com sucesso!");
          setLoading(false);
          onClose(); 
        },
        onError: () => {
          message.error("Erro ao editar a transação. Tente novamente.");
          setLoading(false);
        },
      }
    );
  };

  return (
    <Drawer open={isOpen} onOpenChange={onClose} onClose={onClose}>
      <DrawerContent>
        <div className="mx-auto w-full max-w-lg flex flex-col justify-center">
          <DrawerHeader>
            <DrawerTitle>Editar Transação</DrawerTitle>
            <DrawerDescription>
              Altere os detalhes da transação.
            </DrawerDescription>
            <TrasacionForm
              onSubmit={handleCategorySave}
              isLoading={isLoading}
              initialData={initialCategory} 
            />
          </DrawerHeader>
        </div>
      </DrawerContent>
    </Drawer>
  );
}
