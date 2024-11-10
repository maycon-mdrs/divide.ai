import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { IGroupTransaction } from "@/interfaces/IGroupTransactions";
import { IGroupTransactionRequest } from "@/interfaces/IGroupTransaction";

interface StepOneProps {
  formData: IGroupTransactionRequest;
  setFormData: React.Dispatch<React.SetStateAction<IGroupTransactionRequest>>;
}

export function StepOne({ formData, setFormData }: StepOneProps) {

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prevFormData => ({
      ...prevFormData,
      [name]: name === 'amount' ? parseFloat(value) || 0 : value,
    }));
  };

  return (
    <div className="flex flex-col space-y-4">
      <div className="flex flex-col space-y-1">
        <Label htmlFor="description">Descrição</Label>
        <Input
          type="text"
          id="description"
          name="description"
          value={formData.description}
          onChange={handleInputChange}
        />
      </div>

      <div className="flex flex-col space-y-1">
        <Label htmlFor="amount">Valor</Label>
        <Input
          type="number"
          id="amount"
          name="amount"
          value={formData.amount || ""}
          onChange={handleInputChange}
          min="0"
          step="0.01"
        />
      </div>
    </div>
  );
}
