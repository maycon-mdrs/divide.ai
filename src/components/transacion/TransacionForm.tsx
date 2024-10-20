import { Form } from "antd";
import { useEffect, useState } from 'react';
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { LoadingOutlined } from '@ant-design/icons';
import { ICategory } from "@/interfaces/ICategory";
import { MinusIcon, PlusIcon } from "@radix-ui/react-icons"
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
import { Switch } from "@/components/ui/switch"
import { ITransacion } from "@/interfaces/ITransacion";

interface TransacionFormProps {
  initialData?: ITransacion | null;
  onSubmit: (values: ITransacion) => void;
  isLoading: boolean;
}


export function TrasacionForm({ initialData, onSubmit, isLoading }: TransacionFormProps) {
  const [form] = Form.useForm();
  const [toggleGroup, setToggleGroup] = useState<string | null>(null);
  const { data } = useCategoryDataByUser();
  const auth = useAuth();

  const [money, setMoney] = useState<number>(0);
  useEffect(() => {
    if (initialData) {
      form.setFieldsValue({
        description: initialData.description,
        amount: money,
        categoryId: initialData.categoryId,
        userId: Number(auth.id!),
        paidAt: isPaid ? new Date() : null,
      });
    }
  }, [initialData, form]);


  function onClick(adjustment: number) {
    let newMoney = parseFloat((money + adjustment).toFixed(2));
    if (newMoney < 0) {
      newMoney = 0;
    }
    form.setFieldsValue({ money: newMoney });
    setMoney(newMoney);
  }
  const [isPaid, setIsPaid] = useState(false);

  const handleSwitchChange = () => {
    setIsPaid((prev) => !prev); // Inverte o valor ao clicar no Switch
  };

  const handleSubmit = (values: ITransacion) => {
    console.log()
    const data: ITransacion = {
      description: values.description,
      amount: money,
      categoryId: values.categoryId,
      userId: Number(auth.id!),
      paidAt: isPaid ? new Date() : null,
    };
    onSubmit(data);
  };
  const handleMoneyChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;

    if (value === '') {
      form.setFieldsValue({ money: 0 });
      setMoney(0);
    } else {
      const numValue = parseFloat(value);
      if (!isNaN(numValue) && numValue >= 0) {
        form.setFieldsValue({ money: numValue });
        setMoney(numValue);
      }
    }
  };

  return (
    <Form
      form={form}
      name="edit-category-form"
      onFinish={handleSubmit}
      layout="vertical"
      initialValues={{
        description: initialData?.description || ''
      }}
    >
      <Label htmlFor="description" className="font-medium">Descrição</Label>
      <Form.Item
        name="description"
        className="text-primary m-0 mt-1 mb-2"
        rules={[{ required: true, message: 'Por favor, insira uma descrição!' }]}
      >
        <Input id="description" />
      </Form.Item>

      <Label htmlFor="money" className="font-medium">Valor</Label>
      <Form.Item
        name="value"
        className="text-primary m-0 mt-1 mb-2"
        rules={[{ required: true, message: 'Por favor, insira uma valor!' }]}
      >
        <div className="flex items-center justify-center space-x-2 mt-5 text-primary">
          <Button
            variant="outline"
            size="icon"
            className="h-8 w-8 shrink-0 rounded-full"
            onClick={() => onClick(-50)}
            disabled={money <= 0}
            type="button"
          >
            <MinusIcon className="h-4 w-4" />
            <span className="sr-only">-</span>
          </Button>
          <div className="flex-1 text-center">
            <div className="text-[1rem] uppercase text-muted-foreground">R$</div>

            <input
              type="number"
              step={0.01}
              min={0}
              style={{
                background: 'none',
                border: 'none',
                outline: 'none',
                boxShadow: 'none',
                padding: 0,
                margin: 0,
                appearance: 'none', // Remove estilos padrão em navegadores modernos
                height: 80,
                lineHeight: 80,
                paddingBottom: 20
              }}
              className="flex text-center text-7xl text-[#29756f] font-bold tracking-tighter w-full"
              value={money}
              onChange={handleMoneyChange}
            />
          </div>
          <Button
            variant="outline"
            size="icon"
            className="h-8 w-8 shrink-0 rounded-full"
            onClick={() => onClick(50)}
            type="button"
          >
            <PlusIcon className="h-4 w-4" />
            <span className="sr-only">+</span>
          </Button>
        </div>
      </Form.Item>

      <Label htmlFor="tipo_transacoao" className="font-medium">Tipo de transação</Label>
      <Form.Item
        name="toggleGroup"
        rules={[{ required: true, message: 'Por favor, selecione uma opção!' }]}
        className="mt-1 mb-2"
      >
        <ToggleGroup
          onValueChange={(value: string | null) => {

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
      {toggleGroup != null  && (
        <>
      <Label htmlFor="category" className="font-medium">Categoria</Label>
      <Form.Item
        name="categoryId"
        rules={[{ required: true, message: 'Por favor, selecione uma categoria!' }]}
        className="mt-1 mb-2"
      >
         
        <Select
          onValueChange={(value: string) => {
            form.setFieldsValue({ categoryId: value }); // Atualizar valor do formulário ao selecionar uma categoria
          }}
        >
          <SelectTrigger className="w-full">
            <SelectValue placeholder="Selecione uma categoria" />
          </SelectTrigger>
          <SelectContent>
            <SelectGroup>
              <SelectLabel>Categorias</SelectLabel>
              {data
                ?.filter((category: ICategory) => {
                  if (toggleGroup === "inflow") {
                    return category.expense === false;
                  } else if (toggleGroup === "outflow") {
                    return category.expense === true;
                  }
                  return false;
                })
                .map((category: ICategory) => (
                  <SelectItem key={category.id} value={category.name}>
                    <div className="flex justify-center">
                      <span className="w-5 h-5 rounded-full mr-2" style={{ backgroundColor: category.color }}></span>
                      <p>{category.name}</p>
                    </div>
                  </SelectItem>
                ))}
            </SelectGroup>
          </SelectContent>
        </Select>
        
      </Form.Item>
      </>
      )}
      {toggleGroup === "outflow" && (
        <>
          <Label htmlFor="isPaid" className="font-medium">Essa transação foi paga?</Label>
          <Form.Item
            name="isPaid"
            rules={[{ required: true, message: 'Por favor, selecione se foi pago!' }]}
            className="mt-1 mb-2"
          >
            <div className="flex items-center space-x-2">
              <Switch id="airplane-mode bg-[#29756f]" checked={isPaid} onCheckedChange={handleSwitchChange} />
              <Label htmlFor="airplane-mode">{isPaid ? "Sim, foi paga." : "Não foi pago."}</Label>
            </div>
          </Form.Item>
        </>
      )}
      <Button type="submit" className="w-full mt-4 bg-[#29756F] hover:bg-[#29756F] text-white" disabled={isLoading}>
        {isLoading ? <LoadingOutlined spin /> : 'Salvar'}
      </Button>
    </Form>
  );
}
