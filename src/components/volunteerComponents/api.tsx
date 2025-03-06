import axios from "axios";
const BASE_URL = "http://20.50.143.29:443"
// const BASE_URL = "http://localhost:8080"

export const getAllRequests = async () => {
    try {
        const response = await axios.get(`${BASE_URL}/api/request`, {
        });
        console.log(response.data);
        
        return response.data
    } catch (error) {
        console.error("Error sending request:", error);
    }
};

export const getAllRequestTypes = async () => {
    try {
        const response = await axios.get(`${BASE_URL}/api/request_type`, {});

        return (response.data)
    } catch (error) {
        console.error("Error sending request:", error);
    }
};

export const getAllCities = async () => {
    try {
        const response = await axios.get(`${BASE_URL}/users/cities
`, {});

        return (response.data)
    } catch (error) {
        console.error("Error sending request:", error);
    }
};

export const updateRequest = async (requestId: string) => {
    try {
        const response = await axios.put(`${BASE_URL}/api/request/${requestId}`, {
            status: 3
        });

        return response.data;
    } catch (error) {
        console.error("Error updating request:", error);
    }
};