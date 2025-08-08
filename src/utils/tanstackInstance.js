import { useMutation, useQuery, useQueries, useInfiniteQuery } from "@tanstack/react-query";
import { useEffect } from "react";
import { toast } from "sonner";

/** -------------------------------
 * 🔧 Shared Error Handler (Mutation)
 ---------------------------------- */
export const useMutationWithToast = ({ mutationFn, successMsg, errorMsg, onSuccess }) =>
    useMutation({
        mutationFn,
        onSuccess: (data) => {
            toast.success(successMsg);
            if (onSuccess) onSuccess(data);
        },
        onError: (error) => {
            toast.error(errorMsg, {
                description: error.message,
            });
        },
    });

/** -------------------------------
 * 🔧 Shared Error Handler (Query)
 ---------------------------------- */
export const useQueryWithErrorToast = (options, errorMessage) => {
    const query = useQuery({ retry: false, ...options });

    useEffect(() => {
        if (query.isError && query.error) {
            toast.error(errorMessage, {
                description: query.error.message,
            });
        }
    }, [query.isError, query.error]);

    return query;
};

/** -------------------------------
 * 🔧 Shared Error Handler for useQueries
 ---------------------------------- */
export const useMultiQueryWithErrorToast = (queriesConfig = [], errorLabels = []) => {
    const queries = useQueries({ queries: queriesConfig });

    useEffect(() => {
        queries.forEach((q, index) => {
            if (q.isError) {
                toast.error(`Failed to fetch ${errorLabels[index] || "data"}`, {
                    description: q.error?.message,
                });
            }
        });
    }, [queries]);

    return queries;
};
/** -------------------------------------
 * 🔧 Shared Error Handler (InfiniteQuery)
 -------------------------------------- */
export const useInfiniteQueryWithErrorToast = (options, errorMessage = "Failed to fetch data") => {
    const query = useInfiniteQuery({ retry: false, ...options });

    useEffect(() => {
        if (query.isError && query.error) {
            toast.error(errorMessage, {
                description: query.error.message,
            });
        }
    }, [query.isError, query.error]);

    return query;
};