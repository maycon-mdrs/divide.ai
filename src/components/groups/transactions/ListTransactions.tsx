import { useGroupTransactions } from "@/hooks/group/UseGroupTransactions";

export function ListTransaction({ groupId }: { groupId: number }) {
  const { data } = useGroupTransactions(groupId);
console.log("groupId: ", groupId);
  return (
    <div>
      {data?.map((transaction) => (
        <div key={transaction.id}>
          <h1>{transaction.description}</h1>
          <p>{transaction.amount} conto</p>
        </div>
      ))}
    </div>
  );
}