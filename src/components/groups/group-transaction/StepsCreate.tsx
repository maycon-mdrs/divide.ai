import { Form, message, Steps } from "antd";
import { useState } from "react";
import { StepOne } from "./StepOne";
import { StepTwo } from "./StepTwo";
import { StepThree } from "./StepThree";
import { IUser, IUserResponse } from "@/interfaces/IUser";
import { IGroupTransaction } from "@/interfaces/IGroupTransaction";
import { IGroup } from "@/interfaces/IGroup";
import { IDebt } from "@/interfaces/IDebt";
import { getUserLocalStorage } from "@/context/AuthProvider/util";

interface StepCreateProps {
  group: IGroup;
}

export function StepsCreate({ group }: StepCreateProps) {
  const [current, setCurrent] = useState(0);
  const userId = getUserLocalStorage()?.id;

  const [formStepOne] = Form.useForm();
  const [formStepTwo] = Form.useForm();
  const [formStepThree] = Form.useForm();

  const [selectedMembers, setSelectedMembers] = useState<IUserResponse[]>([]);
  const [stepOneData, setStepOneData] = useState<{ description: string; amount: number } | undefined>(undefined);

  const goBack = () => {
    setCurrent((prev) => Math.max(prev - 1, 0));
  };

  const handleStepOneNext = (values: { description: string; amount: number }) => {
    setStepOneData(values);
    setCurrent(1);
  };

  const handleStepTwoNext = () => {
    setCurrent(2);
  };

  const onFinishStepThreeForm = () => {
    if (!stepOneData) {
      message.error('Dados do passo um estão vazios.');
      return;
    }
    const { amount, description } = stepOneData;

    const stepThreeValues = formStepThree.getFieldsValue();

    const debts: IDebt[] = selectedMembers.map((member) => {
      const amountStr = stepThreeValues[`member-${member.id}`];
      const memberAmount = parseFloat(amountStr);
      return {
        amount: memberAmount,
        user: member,
      };
    });

    const totalAssignedAmount = debts.reduce((sum, debt) => sum + debt.amount, 0);

    if (totalAssignedAmount !== amount) {
      message.error(
        `A soma dos valores (${totalAssignedAmount}) deve ser igual ao total (${amount}).`
      );
      return;
    }

    const transaction: IGroupTransaction = {
      amount: amount,
      description: description,
      groupId: group.id,
      debts: debts,
      createdBy: userId,
    };
    console.log('Transação criada:', transaction);
  };

  const forms = [
    <StepOne
      form={formStepOne}
      onNext={handleStepOneNext}
      isLoading={false}
      initialValues={stepOneData}
    />,
    <StepTwo
      form={formStepTwo}
      selectedMembers={selectedMembers}
      setSelectedMembers={setSelectedMembers}
      onNext={handleStepTwoNext}
      goBack={goBack}
      isLoading={false}
      group={{ members: group.members }}
    />,
    <StepThree
      form={formStepThree}
      onSubmit={onFinishStepThreeForm}
      goBack={goBack}
      isLoading={false}
      selectedMembers={selectedMembers}
    />,
  ];

  return <div>{forms[current]}</div>;
}
