import {UserDto} from "@/dtos/user-dto";
import axios from "axios";
import {notify} from "@kyvg/vue3-notification";

export class UserService {
    
    async getAllUsers(): Promise<UserDto[]> {
        const response = await axios.get(`${import.meta.env.VITE_API_URL}v1/User`);
        return response.data;
    }

    async getUserById(id: string): Promise<UserDto> {
        const response = await axios.get(`${import.meta.env.VITE_API_URL}v1/User/${id}`);
        return response.data;
    }
    
    async createUser(user: UserDto): Promise<UserDto> {
        const response = await axios.post(`${import.meta.env.VITE_API_URL}v1/User`, user);
        return response.data;
    }
    
    async login(username: string, password: string): Promise<UserDto | null> {
        const user = {
            username: username,
            password: password
        }
        try {
            const response = await axios.post(`${import.meta.env.VITE_API_URL}v1/login`, user);
            return response.data;
        } catch (e) {
            let errorMessage = `${e}`
            if (e.response.status == 401) {
                errorMessage = 'Incorrect username or password'
            }
            notify({
                title: `Unable to login`,
                text: errorMessage,
                type: 'error',
                duration: 5000
            })
            return null;
        }

    }
}