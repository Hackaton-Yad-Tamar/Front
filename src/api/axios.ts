import axios from "axios";

// Define API base URL
const API_BASE_URL = "http://localhost:8000/api"; // Adjust as needed

// Create an Axios instance
export const api = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    "Content-Type": "application/json",
  },
});

// Define response type for fetching data
interface ApiResponse<T> {
  data: T;
}

// Function to fetch data with a generic type
export const fetchData = async <T>(endpoint: string): Promise<T> => {
  try {
    const response = await api.get<ApiResponse<T>>(endpoint);
    return response.data.data;
  } catch (error) {
    console.error("Error fetching data:", error);
    throw new Error("Failed to fetch data");
  }
};

// Function to send data with type safety
export const postData = async <T, R>(endpoint: string, data: T): Promise<R> => {
  try {
    const response = await api.post<ApiResponse<R>>(endpoint, data);
    return response.data.data;
  } catch (error) {
    console.error("Error posting data:", error);
    throw new Error("Failed to post data");
  }
};
