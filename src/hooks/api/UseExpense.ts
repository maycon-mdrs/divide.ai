import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { getExpenses } from "@/services/expense-service";

export function useExpense() {
    const query = useQuery({
        queryFn: getExpenses,
        queryKey: ["expnses-data"],
    });

    return query;
}