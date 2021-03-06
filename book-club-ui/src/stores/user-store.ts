import {defineStore} from "pinia";
import {UserDto} from "@/dtos/user-dto";

export const userStore = defineStore('main', {
        state: () => {
            return {
                token: '',
                loggedIn: false,
                user: new UserDto()
            }
        },
        getters: {},
        actions: {
            hasSession() {
                return this.token && this.token != '';
            }
        },
    }
);