import {
    Drawer,
    DrawerContent,
    DrawerDescription,
    DrawerHeader,
    DrawerTitle,
} from "@/components/ui/drawer";
import { IGroupForm } from "@/interfaces/IGroup";
import { message } from "antd";
import { useEffect, useState } from "react";
import { GroupForm } from "./GroupForm";

interface DrawerEditGroupProps {
  isOpen: boolean;
  onClose: () => void;
  groupId: number;
}

export function DrawerEditGroup({ isOpen, onClose, groupId }: DrawerEditGroupProps) {
  const [groupData, setGroupData] = useState<IGroupForm | null>(null);
  const [isLoading, setLoading] = useState(false);

  useEffect(() => {
    if (groupId && isOpen) {
      setLoading(true);
      setTimeout(() => {
        const fetchedGroup = {
          id: groupId,
          name: `Grupo ${groupId}`,
          description: `Descrição do Grupo ${groupId}`,
        };
        setGroupData(fetchedGroup);
        setLoading(false);
      }, 800);
    }
  }, [groupId, isOpen]);

  const handleGroupSave = (values: IGroupForm) => {
    setLoading(true);
    setTimeout(() => {
      message.success("Grupo atualizado com sucesso!");
      setLoading(false);
      onClose(); 
    }, 800);
  };

  return (
    <Drawer open={isOpen} onOpenChange={onClose} onClose={onClose}>
      <DrawerContent>
        <div className="mx-auto w-full max-w-lg">
          <DrawerHeader>
            <DrawerTitle>Editar Grupo</DrawerTitle>
            <DrawerDescription>Atualize as informações do grupo abaixo.</DrawerDescription>
            <GroupForm
              initialData={groupData}
              onSubmit={handleGroupSave}
              isLoading={isLoading}
            />
          </DrawerHeader>
        </div>
      </DrawerContent>
    </Drawer>
  );
}
