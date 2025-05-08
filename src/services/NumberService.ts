import axios from 'axios';
import { numberTypeEndpoints } from '../types';

export class NumberService {
    private baseUrl: string;

    constructor(baseUrl: string) {
        this.baseUrl = baseUrl;
    }

    async getAccessToken(): Promise<string> {
        try {
            const response = await axios.post(`${this.baseUrl}/auth`, {
                clientID: process.env.CLIENT_ID,
                clientSecret: process.env.CLIENT_SECRET,
                name: process.env.NAME,
                accessCode: process.env.ACCESS_CODE,
                email: process.env.EMAIL,
                rollNo: process.env.ROLL_NO
            });
            return response.data.access_token;
        } catch (error) {
            console.error('Error getting access token:', error);
            throw error;
        }
    }

    async fetchNumbers(type: string): Promise<number[]> {
        try {
            const accessToken = await this.getAccessToken();
            const response = await axios.get(`${this.baseUrl}${numberTypeEndpoints[type]}`, {
                headers: {
                    'Authorization': `Bearer ${accessToken}`
                }
            });
            return response.data.numbers;
        } catch (error) {
            console.error('Error fetching numbers:', error);
            throw error;
        }
    }
} 