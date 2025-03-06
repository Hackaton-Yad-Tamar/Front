import { useMutation, useQuery, useQueryClient } from "react-query";
import { approveRequest, declineRequest, fetchAllRequests } from "./functions";

export const UseGetRequests = () =>
  useQuery({
    queryKey: "GetAllUsersQueryKey",
    queryFn: fetchAllRequests,
  });

export const UseApproveRequest = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: approveRequest,
    onSuccess: () => queryClient.refetchQueries(["GetAllUsersQueryKey"]),
  });
};

export const UseDeclineRequest = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: declineRequest,
    onSuccess: () => queryClient.refetchQueries(["GetAllUsersQueryKey"]),
  });
};
