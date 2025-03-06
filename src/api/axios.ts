import axios from 'axios';

export const HOST_URL: string = import.meta.env.VITE_HOST_URL || 'http://localhost:8000';

export const getData = async (url: string) => {
    const { data } = await axios.get(url);
    return data;
}

export const saveData = async (url: string, data: object) => {
    await axios.post(url, data, {
        headers: {
          'Content-Type': 'application/json',
        },
      });
}