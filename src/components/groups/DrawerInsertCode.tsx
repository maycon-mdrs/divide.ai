
import { useState } from "react";
import { Button } from "@/components/ui/button";
import {
    Drawer,
    DrawerContent,
    DrawerHeader,
    DrawerTrigger,
    DrawerDescription,
    DrawerTitle
} from "@/components/ui/drawer";
import { Form } from "antd";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { DropdownMenu, DropdownMenuLabel, DropdownMenuItem, DropdownMenuContent, DropdownMenuSeparator, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
import { EllipsisVertical } from "lucide-react";  

export function DrawerInsertCode() {
    const [isOpen, setIsOpen] = useState(false);
    const [form] = Form.useForm();

    const handleClose = () => {
        setIsOpen(false);
    };

    const handleInsertGroupCode = (values: any) => {
        
    };

    return (
        <Drawer open={isOpen} onOpenChange={setIsOpen} onClose={handleClose}>
        <DrawerTrigger asChild>
            {/*<DropdownMenu>
                <DropdownMenuTrigger asChild> 
                    <EllipsisVertical /> 
                </DropdownMenuTrigger>
                <DropdownMenuContent className="w-56 mt-2">
                    <DropdownMenuLabel>Entrar em grupo</DropdownMenuLabel>
                    <DropdownMenuSeparator />
                    <DropdownMenuItem onSelect={() => setIsOpen(true)}>Inserir código</DropdownMenuItem>
                </DropdownMenuContent>
            </DropdownMenu>*/}
            <Button variant="link">Entrar em grupo</Button>
        </DrawerTrigger>
        <DrawerContent>
            <div className="mx-auto w-full max-w-lg">
                <DrawerHeader>

                <DrawerTitle>Entrar em um grupo</DrawerTitle>
                <DrawerDescription>
                    Forneça o código do grupo e aproveite!
                </DrawerDescription>
                <Form 
                    form={form}
                    name="create-group-form"
                    onFinish={handleInsertGroupCode}>

                    <Label htmlFor="code" className="font-medium">Código</Label>
                    <Form.Item
                        name="code"
                        className="text-primary m-0 mt-2"
                        rules={[{ required: true, message: 'Por favor, insira o código do grupo!' }]}
                        >
                        <Input id="code" />
                    </Form.Item>

                    <Button type="submit" className="w-full mt-4">
                        Inserir
                    </Button>
                </Form>
                </DrawerHeader>
            </div>
        </DrawerContent>
        </Drawer>
    );
}