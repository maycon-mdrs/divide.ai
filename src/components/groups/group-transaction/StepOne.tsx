import { Form } from "antd";
import { useEffect } from "react";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { LoadingOutlined } from '@ant-design/icons';

interface StepOneProps {
  form: any;
  onNext: (values: { description: string; amount: number }) => void;
  isLoading: boolean;
  initialValues?: { description: string; amount: number };
}

interface StepOneFormValues {
  description: string;
  amount: string;
}

export function StepOne({ form, onNext, isLoading, initialValues }: StepOneProps) {
  const handleSubmit = () => {
    form.validateFields().then((values: StepOneFormValues) => {
      const amount = parseFloat(values.amount);
      onNext({ description: values.description, amount });
    });
  };

  return (
    <Form
      form={form}
      name="edit-group-transaction-form"
      onFinish={handleSubmit}
      layout="vertical"
      initialValues={{
        description: initialValues?.description ?? '',
        amount: initialValues?.amount !== undefined ? initialValues.amount.toString() : '',
      }}
    >
      <Label htmlFor="description" className="font-medium">
        Descrição da despesa
      </Label>
      <Form.Item
        name="description"
        className="text-primary m-0 mt-1 mb-2"
        rules={[{ required: true, message: 'Por favor, insira a descrição da despesa!' }]}
      >
        <Input id="description" />
      </Form.Item>
      <Label htmlFor="amount" className="font-medium">
        Total
      </Label>
      <Form.Item
        name="amount"
        className="text-primary m-0 mt-1 mb-2"
        rules={[
          { required: true, message: 'Por favor, insira o total da despesa!' },
          {
            validator: (_, value) => {
              if (value !== '' && value !== undefined) {
                const numberValue = parseFloat(value);
                if (isNaN(numberValue) || numberValue < 0.01) {
                  return Promise.reject('O valor deve ser maior que zero!');
                }
                return Promise.resolve();
              } else {
                return Promise.resolve();
              }
            },
          },
        ]}
      >
        <Input
          type="number"
          id="amount"
          min="0.01"
          step="0.01"
          style={{ width: '100%' }}
          placeholder="Digite o valor total"
        />
      </Form.Item>

      <Button type="submit" variant="divideDark" className="w-full mt-4" disabled={isLoading}>
        {isLoading ? <LoadingOutlined spin /> : 'Próximo'}
      </Button>
    </Form>
  );
}
