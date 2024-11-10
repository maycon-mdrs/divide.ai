import {
    Card,
    CardContent,
    CardDescription,
    CardHeader,
    CardTitle,
  } from "@/components/ui/card";
import { IUserResponse } from "@/interfaces/IUser";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { generateColor } from "../listGroup/GroupAvatars";
import { formatInitialName } from "@/utils/Formatter";

interface StepThreeProps {
  selectedMembers: IUserResponse[];
  memberAmounts: { [key: number]: number };
  onAmountChange: (memberId: number, amount: number) => void;
}

export function StepThree({ selectedMembers, memberAmounts, onAmountChange }: StepThreeProps) {

  const handleAmountChange = (memberId: number, value: string) => {
    const amount = parseFloat(value);
    onAmountChange(memberId, isNaN(amount) ? 0 : amount);
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>Definir Valores</CardTitle>
        <CardDescription>Atribua o valor para cada membro selecionado</CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        <ul className="space-y-4">
          {selectedMembers.map(member => (
            <li key={member.id} className="flex items-center justify-between">
              <div className="flex items-center space-x-3">
                <Avatar>
                  <AvatarFallback className={generateColor(member.id)}>
                    {formatInitialName(member.firstName.charAt(0))}
                    {formatInitialName(member.lastName.charAt(0))}
                  </AvatarFallback>
                </Avatar>
                <div>
                  <p className="text-sm font-medium">
                    {member.firstName} {member.lastName}
                  </p>
                  <p className="text-xs text-gray-500">{member.email}</p>
                </div>
              </div>
              <div className="flex items-center space-x-2">
                <Label htmlFor={`amount-${member.id}`} className="sr-only">
                  Valor
                </Label>
                <Input
                  type="number"
                  id={`amount-${member.id}`}
                  value={memberAmounts[member.id] || ''} 
                  onChange={(e) => handleAmountChange(member.id, e.target.value)}
                  min="0"
                  step="0.01"
                  className="w-24"
                />
              </div>
            </li>
          ))}
        </ul>
      </CardContent>
    </Card>
  );
}
