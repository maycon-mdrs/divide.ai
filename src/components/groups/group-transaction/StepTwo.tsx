import { Form, message, Select } from "antd";
import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { IUserResponse } from "@/interfaces/IUser";
import {
    Card,
    CardContent,
    CardDescription,
    CardHeader,
    CardTitle,
  } from "@/components/ui/card";
import { generateColor } from "../listGroup/GroupAvatars";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Checkbox } from "@/components/ui/checkbox";

interface StepTwoProps {
  form: any;
  selectedMembers: IUserResponse[];
  setSelectedMembers: React.Dispatch<React.SetStateAction<IUserResponse[]>>;
  onNext: () => void;
  goBack: () => void;
  isLoading: boolean;
  group: { members: IUserResponse[] };
}

export function StepTwo({
  form,
  selectedMembers,
  setSelectedMembers,
  onNext,
  goBack,
  isLoading,
  group,
}: StepTwoProps) {
  const initialValues = group.members.reduce((values, member) => {
    values[`member-${member.id}`] = selectedMembers.some(
      (m) => m.id === member.id
    );
    return values;
  }, {} as Record<string, boolean>);

  useEffect(() => {
    form.setFieldsValue(initialValues);
  }, [form, initialValues]);

  const handleCheckboxChange = (memberId: number, checked: boolean) => {
    const updatedSelectedMembers = checked
      ? [...selectedMembers, group.members.find((m) => m.id === memberId)!]
      : selectedMembers.filter((member) => member.id !== memberId);

    setSelectedMembers(updatedSelectedMembers);
    form.setFieldsValue({
      [`member-${memberId}`]: checked,
    });
  };

  const handleNext = () => {
    if (selectedMembers.length === 0) {
      message.error("Por favor, selecione pelo menos um membro para continuar.");
      return;
    }
    onNext();
  };

  return (
    <Form
      form={form}
      name="stepTwoForm"
      layout="vertical"
      initialValues={initialValues}
    >
      <Card>
        <CardHeader>
          <CardTitle>Selecione os membros</CardTitle>
          <CardDescription>
            Escolha os membros que participarão da despesa.
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          {group.members.map((member) => (
            <Form.Item
              key={member.id}
              name={`member-${member.id}`}
              valuePropName="checked"
              noStyle
            >
              <div className="flex items-center justify-between pb-4">
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
                <Checkbox
                  checked={selectedMembers.some((m) => m.id === member.id)}
                  onCheckedChange={(checked: boolean) =>
                      handleCheckboxChange(member.id, checked)
                  }
                   className="peer h-4 w-4 shrink-0 rounded-sm border border-divide shadow focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:cursor-not-allowed disabled:opacity-50 data-[state=checked]:bg-divide-dark data-[state=checked]:text-white"
                />
              </div>
            </Form.Item>
          ))}
        </CardContent>
      </Card>

      <div className="flex space-x-4 mt-6 pb-4">
        <Button
          onClick={goBack}
          variant="secondary"
          className="w-full"
          disabled={isLoading}
          type="button"
        >
          Voltar
        </Button>
        <Button
          variant="divideDark"
          className="w-full"
          disabled={isLoading}
          onClick={handleNext}
        >
          Próximo
        </Button>
      </div>
    </Form>
  );
}
