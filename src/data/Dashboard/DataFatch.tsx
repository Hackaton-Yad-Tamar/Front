import axios from 'axios';
import {HOST_URL} from "../../api/axios.ts";


const DASHBOARD_ENDPOINT = HOST_URL + '/admin/dashboard/';

export const tableData = [
    {id: 1, name: "Item 1", price: 100, city: "New York", category: "Electronics", value: 30},
    {id: 2, name: "Item 2", price: 150, city: "Los Angeles", category: "Clothing", value: 40},
    {id: 3, name: "Item 3", price: 200, city: "New York", category: "Books", value: 60},
    {id: 4, name: "Item 4", price: 120, city: "Los Angeles", category: "Electronics", value: 90},
    {id: 5, name: "Item 5", price: 80, city: "Chicago", category: "Books", value: 50},
    {id: 6, name: "Item 6", price: 90, city: "Chicago", category: "Clothing", value: 20},
];

export type PieParameters = 'city' | 'request_type' | 'status';

export interface PieData {
    start_date: Date;
    end_date: Date;
    city?: string;
    status?: string;
    request_type?: string;
}

export const fetchPieData = async (function_name: string, params: PieData) => {
    const response = await axios.get(DASHBOARD_ENDPOINT + function_name, {params});
    console.log("response", response)
    if (response.status !== 200) {
        throw new Error('Failed to fetch data');
    }
    const pieData = Object.keys(response.data).map((category) => ({
        category,
        value: response.data[category] as number,
    }));
    return pieData
}

export const fetcheTableData = async (function_name: string, params: PieData) => {
    const response = await axios.get(DASHBOARD_ENDPOINT + function_name, {params});
    console.log("response", response)
    if (response.status !== 200) {
        throw new Error('Failed to fetch data');
    }
    const pieData = response.data;
    return pieData
}
