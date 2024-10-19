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


interface CategoryFormProps {
  initialData?: ICategory | null;
  onSubmit: (values: ICategory) => void;
  isLoading: boolean;
}


export function CategoryForm({ initialData, onSubmit, isLoading }: CategoryFormProps) {
  const [form] = Form.useForm();
  const [selectedColor, setSelectedColor] = useState<string>(initialData?.color || '#fff');
  const [toggleGroup, setToggleGroup] = useState<string | null>(null);
  const auth = useAuth();

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
    console.log(toggleGroup);
    const data: ICategory = {
      name: values.name,
      description: values.description,
      color: selectedColor,
      expense: toggleGroup === "inflow" ? false : true,
      userId: Number(auth.id!),
    };
    console.log(data);
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
      <Label htmlFor="name" className="font-medium">Nome da Categoria</Label>
      <Form.Item
        name="name"
        className="text-primary m-0 mt-1 mb-2"
        rules={[{ required: true, message: 'Por favor, insira o nome da categoria!' }]}
      >
        <Input id="name" />
      </Form.Item>

      <Label htmlFor="description" className="font-medium">Descrição</Label>
      <Form.Item
        name="description"
        className="text-primary m-0 mt-1 mb-2"
        rules={[{ required: true, message: 'Por favor, insira uma descrição!' }]}
      >
        <Input id="description" />
      </Form.Item>

      <Label htmlFor="description" className="font-medium">Tipo da categoria</Label>
      <Form.Item
        name="toggleGroup"
        rules={[{ required: true, message: 'Por favor, selecione uma opção!' }]}
        className="mt-1 mb-2"
      >
        <ToggleGroup
          onValueChange={(value: string | null) => {
            const booleanValue = value === "inflow" ? true : false;
            setToggleGroup(value);
            form.setFieldsValue({ toggleGroup: value });
          }}
          type="single" variant="outline" size="lg" className="gap-5 text-primary"
        >
          <ToggleGroupItem
            value="inflow"
            className="w-full gap-1 data-[state=on]:bg-green-100 dark:data-[state=on]:bg-green-950"
          >
            <IoArrowUpCircleOutline size={20} color="15803d" /> Entrada
          </ToggleGroupItem>
          <ToggleGroupItem
            value="outflow"
            className="w-full gap-1 data-[state=on]:bg-rose-100 dark:data-[state=on]:bg-rose-950"
          >
            <IoArrowDownCircleOutline size={20} color="be123c" /> Saída
          </ToggleGroupItem>
        </ToggleGroup>
      </Form.Item>

      <Label htmlFor="color" className="font-medium">Selecione a Cor</Label>
      <Form.Item
        name="color"
        className="text-primary m-0 mt-1 mb-2"
        rules={[{ required: true, message: 'Por favor, selecione uma cor!' }]}
      >
        <div style={{ width: '100%' }}>
          <CirclePicker
            color={selectedColor}
            onChangeComplete={handleColorChangeComplete}
            width="100%"
          />
        </div>
      </Form.Item>

      <Button type="submit" className="w-full mt-4 bg-[#29756F] hover:bg-[#29756F] text-white" disabled={isLoading}>
        {isLoading ? <LoadingOutlined spin /> : 'Salvar'}
      </Button>
    </Form>
  );
}
