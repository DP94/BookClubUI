import {UserDto} from "@/dtos/user-dto";
import axios from "axios";
import {notify} from "@kyvg/vue3-notification";
import {AbstractService} from "@/services/abstract-service";

export class UserService extends AbstractService {
    
    async getAllUsers(): Promise<UserDto[]> {
        const response = await axios.get(`v1/User`);
        return response.data;
    }

    async getUserById(id: string): Promise<UserDto> {
        const response = await axios.get(`v1/User/${id}`);
        return response.data;
    }
    
    async createUser(user: UserDto): Promise<UserDto> {
        const response = await axios.post(`v1/User`, user);
        return response.data;
    }
    
    async login(username: string, password: string): Promise<UserDto | null> {
        const user = {
            username: username,
            password: password
        }
        try {
            const response = await axios.post(`${import.meta.env.VITE_API_URL}v1/login`, user);
            this.store.$patch({loggedIn: true})
            this.store.$patch({user: response.data})
            this.store.$patch({token: response.headers["authorization"]})
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