import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { createGroupTransaction, getAllGroupTransactions } from "@/services/GroupTransactionsService";

export function useGroupTransactions(groupId: number) {
  if(!groupId) throw new Error("groupId is required");
  
  const query = useQuery({
    queryFn: () => getAllGroupTransactions(groupId),
    queryKey: ["group-transactions", groupId],
  });

  return query;
}


export function useGroupTransactionMutate() {
  const queryClient = useQueryClient();
  const mutate = useMutation({
      mutationFn:  createGroupTransaction,
      onSuccess: () => {  
          queryClient.invalidateQueries({ queryKey: ['group-transactions'] });
      }
  });

  return mutate;
}
