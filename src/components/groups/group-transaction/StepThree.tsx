import { getUserLocalStorage } from "@/context/AuthProvider/util";
import { Form, Input } from "antd";
import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import {
    Card,
    CardContent,
    CardDescription,
    CardHeader,
    CardTitle,
  } from "@/components/ui/card";
import { IUserResponse } from "@/interfaces/IUser";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { generateColor } from "../listGroup/GroupAvatars";

interface StepThreeProps {
  form: any;
  onSubmit: () => void;
  goBack: () => void;
  isLoading: boolean;
  selectedMembers: IUserResponse[];
}

export function StepThree({
  form,
  onSubmit,
  goBack,
  isLoading,
  selectedMembers,
}: StepThreeProps) {
  useEffect(() => {
    const initialValues: { [key: string]: number } = {};
    selectedMembers.forEach((member) => {
      initialValues[`member-${member.id}`] = form.getFieldValue(`member-${member.id}`) || 0;
    });
    form.setFieldsValue(initialValues);
  }, [selectedMembers, form]);

  const handleSubmit = () => {
    form.validateFields().then(() => {
      onSubmit();
    });
  };

  return (
    <Form form={form} layout="vertical" onFinish={handleSubmit}>
      <Card>
        <CardHeader>
          <CardTitle>Valores</CardTitle>
          <CardDescription>Atribua um valor para cada membro selecionado.</CardDescription>
        </CardHeader>

        <CardContent className="space-y-4">
          {selectedMembers.map((member) => (
            <div
              key={member.id}
              className="flex flex-col md:flex-row md:items-center md:justify-between pb-4"
            >
              <div className="flex items-center space-x-3">
                <Avatar>
                  <AvatarFallback className={generateColor(member.id)}>
                    {member.firstName.charAt(0)}
                    {member.lastName.charAt(0)}
                  </AvatarFallback>
                </Avatar>
                <div>
                  <p className="text-sm font-medium">
                    {member.firstName} {member.lastName}
                  </p>
                  <p className="text-xs text-gray-500">{member.email}</p>
                </div>
              </div>

              <Form.Item
                name={`member-${member.id}`}
                rules={[
                  { required: true, message: 'Por favor, insira o valor!' },
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
                className="w-full md:w-1/2 lg:w-1/3 mt-3 md:mt-0 mb-0 text-right"
              >
                <Input
                  placeholder="0.00" // Placeholder para orientar o usuário
                  step="0.01"
                  className="text-right w-full"
                />
              </Form.Item>
            </div>
          ))}
        </CardContent>
      </Card>

      <div className="flex space-x-4 mt-6 pb-4">
        <Button type="button" onClick={goBack} variant="secondary" className="w-full" disabled={isLoading}>
          Voltar
        </Button>
        <Button type="submit" variant="divideDark" className="w-full" disabled={isLoading}>
          Salvar
        </Button>
      </div>
    </Form>
  );
}
