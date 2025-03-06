import { useQuery } from "react-query";
import axiosInstance from "../axios";
import { Request } from "../types/requestType";

export const useFamilyRequests = (familyId?: string) => {
  const getFamilyRequests = async () => {
    const response = await axiosInstance.get<Request[]>(`request/${familyId}`);

    return response.data;
  };

  return useQuery({
    queryKey: ["getFamilyRequests", familyId],
    queryFn: getFamilyRequests,
    enabled: familyId !== undefined,
  });
};
