import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { deleteTransacion, getAllTransacions, createTransacion, getTransacionById, updateTransacion, getAllTransacionsByUser } from "@/services/TransacionService";

export function useCategoryData() {
    const query = useQuery({
        queryFn:  getAllTransacions,
        queryKey: ["transacions-data"],
    });

    return query;
}

export function useTransacionMutate() {
    const queryClient = useQueryClient();
    const mutate = useMutation({
        mutationFn:  createTransacion,
        onSuccess: () => {  
            queryClient.invalidateQueries({ queryKey: ['transacions-data-by-user'] });
        }
    });

    return mutate;
}
export function useTransacionDataByUser() {
    const query = useQuery({
        queryFn: () => getAllTransacionsByUser(),
        queryKey: ["transacions-data-by-user"],
    });

    return query;
}

export function useTransacionUpdate() {
    const queryClient = useQueryClient();
    const mutate = useMutation({
        mutationFn:  updateTransacion,
        onSuccess: () => {  
            queryClient.invalidateQueries({ queryKey: ['transacions-data-by-user'] });
        }
    });

    return mutate;
}

export function useTransacionDelete() {
    const queryClient = useQueryClient();
    const mutate = useMutation({
        mutationFn:  deleteTransacion,
        onSuccess: () => {  
            queryClient.invalidateQueries({ queryKey: ['transacions-data-by-user'] });
        }
    });

    return mutate;
}