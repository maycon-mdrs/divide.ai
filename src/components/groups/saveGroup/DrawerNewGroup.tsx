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
import { nanoid } from "nanoid"; 
import { message } from "antd";
import { GroupForm } from "./GroupForm";
import { DialogCode } from "../DialogCode";

export function DrawerNewGroup() {
  const [isOpen, setIsOpen] = useState(false);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [groupCode, setGroupCode] = useState<string | null>(null);
  const [isLoading, setLoading] = useState(false);

  const handleClose = () => {
    setIsOpen(false);
};

  const handleGroupSave = (values: IGroupForm) => {
    setLoading(true);
    setTimeout(() => {
      const code = nanoid(8);
      setGroupCode(code);
      setIsDialogOpen(true);
      message.success("Grupo criado com sucesso!");
      setLoading(false);
      setIsOpen(false);
    }, 500);
  };

  return (
    <Drawer open={isOpen} onOpenChange={setIsOpen} onClose={handleClose}>
      <DrawerTrigger asChild onClick={() => setIsOpen(true)}>
        <Button variant="divideDark">Novo grupo</Button>
      </DrawerTrigger>
      <DrawerContent>
        <div className="mx-auto w-full max-w-lg flex flex-col justify-center">
          <DrawerHeader>
            <DrawerTitle>Criar novo grupo</DrawerTitle>
            <DrawerDescription>Preencha os detalhes para criar um novo grupo.</DrawerDescription>
            <GroupForm onSubmit={handleGroupSave} isLoading={isLoading} />
          </DrawerHeader>
        </div>
      </DrawerContent>
      {groupCode && (
        <DialogCode isOpen={isDialogOpen} groupCode={groupCode} onClose={() => setIsDialogOpen(false)} />
      )}
    </Drawer>
  );
}