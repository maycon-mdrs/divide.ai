import { useGroupTransactions } from "@/hooks/group/UseGroupTransactions";
import { formatMoney, formatDate, truncateText } from "@/utils/Formatter";
import { GroupAvatars } from "../listGroup/GroupAvatars";
import { useMediaQuery } from 'react-responsive';

export function ListTransaction({ groupId }: { groupId: number }) {
  const { data } = useGroupTransactions(groupId);
  const isMobile = useMediaQuery({ maxWidth: 500 });

  return (
    <div className="flex flex-col gap-5">
      {data?.map((transaction) => (
        <div className="flex cursor-pointer hover:bg-muted p-5 rounded-md" key={transaction.id}>
          <div className="space-y-1">
            <p className="text-sm font-medium leading-none">
              {truncateText(transaction.description, isMobile ? 20 : 50)}
            </p>
            <GroupAvatars users={transaction.debts.map((debt) => debt.user)} />
          </div>
          <div className="ml-auto font-medium">
            {formatMoney(transaction.amount)}
            <p className="text-sm text-muted-foreground">{formatDate("05/11/2024")}</p>
          </div>
        </div>
      ))}
    </div>
  );
}