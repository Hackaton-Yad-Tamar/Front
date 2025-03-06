import axios from "axios";
import { User } from "../../../types/userType";

export const fetchAllRequests = async (): Promise<User[]> =>
  (
    await axios.get<User[]>(`${import.meta.env.VITE_HOST_URL}/admin/approval/all_users`, {
      method: "GET",
    })
  ).data;

// Approve a request (Pass `id`)
export const approveRequest = async (id: string): Promise<User> => {
  const response = await axios.post<User>(
    `${import.meta.env.VITE_HOST_URL}/admin/approval/${id}/approve`
  );
  return response.data;
};

// Decline a request (Pass `id`)
export const declineRequest = async (id: string): Promise<User> => {
  const response = await axios.post<User>(
    `${import.meta.env.VITE_HOST_URL}/admin/approval/${id}/reject`
  );
  return response.data;
};
