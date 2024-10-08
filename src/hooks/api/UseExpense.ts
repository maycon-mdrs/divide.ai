import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { getExpenses } from "@/services/ExpenseService";

export function useExpense() {
  const query = useQuery({
    queryFn: getExpenses,
    queryKey: ["expnses-data"],
  });

  return query;
}