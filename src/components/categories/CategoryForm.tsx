import { Form } from "antd";
import { useEffect, useState } from 'react';
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { LoadingOutlined } from '@ant-design/icons';
import { ICategory } from "@/interfaces/ICategory";
import { CirclePicker, ColorResult } from 'react-color';


interface CategoryFormProps {
  initialData?: ICategory | null; 
  onSubmit: (values: ICategory) => void;
  isLoading: boolean;
}

export function CategoryForm({ initialData, onSubmit, isLoading }: CategoryFormProps) {
  const [form] = Form.useForm();
  const [selectedColor, setSelectedColor] = useState<string>(initialData?.color || '#fff');
  
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
