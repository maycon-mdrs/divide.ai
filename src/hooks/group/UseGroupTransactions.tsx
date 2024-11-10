import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { deleteGroupTransaction, getAllGroupTransactions } from "@/services/GroupTransactionsService";

export function useGroupTransactions(groupId: number) {
  if (!groupId) throw new Error("groupId is required");

  const query = useQuery({
    queryFn: () => getAllGroupTransactions(groupId),
    queryKey: ["group-transactions", groupId],
  });

  return query;
}

export function useGroupTransactionDelete(groupId: number) {
  const queryClient = useQueryClient();
  const mutate = useMutation({
    mutationFn: deleteGroupTransaction,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['group-transactions', groupId] });
    }
  });

  return mutate;
}