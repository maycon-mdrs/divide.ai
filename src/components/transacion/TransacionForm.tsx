import { Form } from "antd";
import { useEffect, useState } from 'react';
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { LoadingOutlined } from '@ant-design/icons';
import { ICategory } from "@/interfaces/ICategory";
import { CirclePicker, ColorResult } from 'react-color';
import { IoArrowUpCircleOutline, IoArrowDownCircleOutline } from "react-icons/io5";
import { useAuth } from "@/context/AuthProvider/useAuth";
import {
  ToggleGroup,
  ToggleGroupItem,
} from "@/components/ui/toggle-group";
import { useCategoryDataByUser } from "@/hooks/category/categoryHook";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"

interface CategoryFormProps {
  initialData?: ICategory | null;
  onSubmit: (values: ICategory) => void;
  isLoading: boolean;
}


export function TrasacionForm({ initialData, onSubmit, isLoading }: CategoryFormProps) {
  const [form] = Form.useForm();
  const [selectedColor, setSelectedColor] = useState<string>(initialData?.color || '#fff');
  const [toggleGroup, setToggleGroup] = useState<string | null>(null);
  const auth = useAuth();
  const { data } = useCategoryDataByUser();

  useEffect(() => {
    if (initialData) {
      form.setFieldsValue({
        name: initialData.name,
        description: initialData.description,
        color: initialData.color,
      });
      setSelectedColor(initialData.color);
    }
  }, [initialData, form]);

  const handleColorChangeComplete = (color: ColorResult) => {
    setSelectedColor(color.hex);
    form.setFieldsValue({ color: color.hex });
  };

  const handleSubmit = (values: ICategory) => {
    const data: ICategory = {
      name: values.name,
      description: values.description,
      color: selectedColor,
      expense: toggleGroup === "inflow" ? false : true,
      userId: Number(auth.id!),
    };
    onSubmit(data);
  };

  return (
    <Form
      form={form}
      name="edit-category-form"
      onFinish={handleSubmit}
      layout="vertical"
      initialValues={{
        name: initialData?.name || '',
        description: initialData?.description || '',
        color: selectedColor,
      }}
    >
      <Label htmlFor="name" className="font-medium">Descrição</Label>
      <Form.Item
        name="name"
        className="text-primary m-0 mt-1 mb-2"
        rules={[{ required: true, message: 'Por favor, insira uma descrição!' }]}
      >
        <Input id="name" />
      </Form.Item>

      <Label htmlFor="description" className="font-medium">Valor</Label>
      <Form.Item
        name="description"
        className="text-primary m-0 mt-1 mb-2"
        rules={[{ required: true, message: 'Por favor, insira uma valor!' }]}
      >
        <Input id="description" />
      </Form.Item>

      <Label htmlFor="description" className="font-medium">Categoria</Label>
      <Form.Item
        name="toggleGroup"
        rules={[{ required: true, message: 'Por favor, selecione uma categoria!' }]}
        className="mt-1 mb-2"
      >
        <Select>
          <SelectTrigger className="w-full">
            <SelectValue placeholder="Selecione uma categoria" />
          </SelectTrigger>
          <SelectContent>
            <SelectGroup>
              <SelectLabel>Categorias</SelectLabel>
              {data?.map((category: ICategory) => (
                <SelectItem key={category.id} value={category.name}>
                  <div className="flex justify-center">
                                    <span className=" w-5 h-5 rounded-full mr-2" style={{ backgroundColor: category.color }}></span>
                                    <p>{category.name}</p>
                                </div> 
                </SelectItem>
              ))}
            </SelectGroup>
          </SelectContent>
        </Select>
      </Form.Item>
      <Button type="submit" className="w-full mt-4 bg-[#29756F] hover:bg-[#29756F] text-white" disabled={isLoading}>
        {isLoading ? <LoadingOutlined spin /> : 'Salvar'}
      </Button>
    </Form>
  );
}
