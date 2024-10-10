import { Form } from "antd"
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { LoadingOutlined } from '@ant-design/icons';
import { useEffect } from 'react';
import { IGroupForm } from "@/interfaces/IGroup";

interface GroupFormProps {
  initialData?: IGroupForm | null;
  onSubmit: (values: IGroupForm) => void;
  isLoading: boolean;
}

export function GroupForm({ initialData, onSubmit, isLoading }: GroupFormProps) {
  const [form] = Form.useForm();

  useEffect(() => {
    if (initialData) {
      form.setFieldsValue(initialData);
    }
  }, [initialData, form]);

  const handleSubmit = (values: IGroupForm) => {
    onSubmit(values);
  };

  return (
    <Form
      form={form}
      name="edit-group-form"
      onFinish={handleSubmit}
      layout="vertical"
      initialValues={{
        name: '',
        description: '',
      }}
    >
      <Label htmlFor="name" className="font-medium">Nome do Grupo</Label>
      <Form.Item
        name="name"
        className="text-primary m-0 mt-1 mb-2"
        rules={[{ required: true, message: 'Por favor, insira o nome do grupo!' }]}
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

      <Button type="submit" className="w-full mt-4" disabled={isLoading}>
        {isLoading ? <LoadingOutlined spin /> : 'Salvar'}
      </Button>
    </Form>
  );
}
