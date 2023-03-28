import axios, { AxiosInstance } from 'axios';

const printifyClient = (apiKey: string): AxiosInstance =>
    axios.create({
        headers: {
            'Content-Type': 'application/json;charset=utf-8',
            Authorization: `Bearer ${apiKey}`
        },
        baseURL: 'https://api.printify.com/v1'
    });

export default printifyClient;
