import axios from 'axios';

export const getData = async (url: string) => {
    const { data } = await axios.get(url);
    return data;
}

export const saveData = async (url: string, data: object) => {
    const { data: returnedData } = await axios.post(url, data, {
        headers: {
          'Content-Type': 'application/json',
        },
      });
      return returnedData;
}