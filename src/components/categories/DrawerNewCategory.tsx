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
import { IGroupForm } from "@/interfaces/IGroup";
import { message } from "antd";
import { CategoryForm } from "./CategoryForm";
// import { DialogCode } from "../DialogCode";

export function DrawerNewCategory() {
  const [isOpen, setIsOpen] = useState(false);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [isLoading, setLoading] = useState(false);

  const handleClose = () => {
    setIsOpen(false);
};

  const handleGroupSave = (values: IGroupForm) => {
    setLoading(true);
    setTimeout(() => {
      setIsDialogOpen(true);
      message.success("Categoria criada com sucesso!");
      setLoading(false);
      setIsOpen(false);
    }, 500);
  };

  return (
    <Drawer open={isOpen} onOpenChange={setIsOpen} onClose={handleClose}>
      <DrawerTrigger asChild onClick={() => setIsOpen(true)}>
        <Button className="bg-[#29756F] hover:bg-[#29756F] shadow-lg">Nova Categoria</Button>
      </DrawerTrigger>
      <DrawerContent>
        <div className="mx-auto w-full max-w-lg flex flex-col justify-center">
          <DrawerHeader>
            <DrawerTitle>Criar nova categoria</DrawerTitle>
            <DrawerDescription>Preencha os detalhes para criar uma nova categoria.</DrawerDescription>
            <CategoryForm onSubmit={handleGroupSave} isLoading={isLoading} />
          </DrawerHeader>
        </div>
      </DrawerContent>
      
    </Drawer>
  );
}