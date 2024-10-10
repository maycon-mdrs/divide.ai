import { Button } from "@/components/ui/button";
import { Edit, Info, Trash } from "lucide-react";
import { useRef, useState } from "react";
import { useMediaQuery } from 'react-responsive';
import { 
    DropdownMenu,  
    DropdownMenuItem, 
    DropdownMenuContent, 
    DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
import { EllipsisVertical } from "lucide-react";  
import { IGroupCard } from "@/interfaces/IGroup";
import { DialogCode } from "../DialogCode";
import { DrawerEditGroup } from "../saveGroup/DrawerEditGroup";
import {
  Drawer,
  DrawerContent,
  DrawerTrigger,
} from "@/components/ui/drawer";
import { DialogTitle } from "@/components/ui/dialog";

interface GroupOptionsProps {
    group: IGroupCard;
}

export function GroupOptions({ group }: GroupOptionsProps) {
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  const [isEditDrawerOpen, setIsEditDrawerOpen] = useState(false);

  const isDesktop = useMediaQuery({ query: "(min-width: 768px)" });

  const handleEditGroup = () => {
    setIsEditDrawerOpen(true);
  };

  const handleGetCode = () => {
    setIsDialogOpen(true);
  };

  const handleDrawerClose = () => {
    setIsDrawerOpen(false);
  };

  return (
    <>
      {isDesktop ? (
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <div className="cursor-pointer p-2 rounded-full hover:bg-gray-100 transition-colors">
              <EllipsisVertical />
            </div>
          </DropdownMenuTrigger>
          <DropdownMenuContent className="w-40">
            <DropdownMenuItem onClick={handleEditGroup}>Editar</DropdownMenuItem>
            <DropdownMenuItem onClick={handleGetCode}>Obter código</DropdownMenuItem>
            <DropdownMenuItem
              onClick={() => console.log(`Excluir Grupo ${group.id}`)}
            >
              Remover
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      ) : (
        <Drawer
          open={isDrawerOpen}
          onOpenChange={setIsDrawerOpen}
          onClose={handleDrawerClose}
        >
          <DrawerTrigger asChild>
            <div className="cursor-pointer p-2 rounded-full hover:bg-gray-100 transition-colors">
              <EllipsisVertical />
            </div>
          </DrawerTrigger>
          <DrawerContent className="flex justify-center items-center">
            <DialogTitle className="sr-only">Opções do Grupo</DialogTitle>
            <div className="flex flex-col space-y-4 p-4 w-1/2 max-w-md mx-auto">
              <Button
                variant="outline"
                onClick={handleEditGroup}
                className="flex items-center space-x-2"
              >
                <Edit className="w-4 h-4" />
                <span>Editar</span>
              </Button>
              <Button
                variant="secondary"
                onClick={handleGetCode}
                className="flex items-center space-x-2"
              >
                <Info className="w-4 h-4" />
                <span>Obter código</span>
              </Button>
              <Button
                variant="destructive"
                onClick={() => console.log(`Excluir Grupo ${group.id}`)}
                className="flex items-center space-x-2"
              >
                <Trash className="w-4 h-4" />
                <span>Remover</span>
              </Button>
            </div>
          </DrawerContent>
        </Drawer>
      )}

      {isDialogOpen && (
        <DialogCode
          isOpen={isDialogOpen}
          onClose={() => setIsDialogOpen(false)}
          groupCode={group.groupCode}
        />
      )}

      <DrawerEditGroup
        isOpen={isEditDrawerOpen}
        onClose={() => setIsEditDrawerOpen(false)}
        groupId={group.id}
      />
    </>
  );
}