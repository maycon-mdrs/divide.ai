import { useDebtDataGroupTransaction } from "@/hooks/debt/debtHook";
import { formatMoney, formatDate} from '@/utils/Formatter';
export function valueFormatter(value: number | null) {
    return formatMoney(value);
  }
export function DetailTransactions({ groupTransactionId }: { groupTransactionId: number }) {
  const { data } = useDebtDataGroupTransaction(groupTransactionId);
    //console.log("useDebtTransaction: ", groupTransactionId);
  return (
    <div>
      {data?.map((debt) => (
        <div className="bg-white rounded-md p-2 mt-2" key={debt.id}>
          <p className="text-[#29756F] bold text-lg ">{valueFormatter(debt.amount)}</p>
          <p>Por: {debt.user.firstName}</p>
          <p>{debt.paidAt != null ? 'pago em: ' + formatDate(debt.paidAt) : "não pago"}</p>
        </div>
      ))}
    </div>
  );
}