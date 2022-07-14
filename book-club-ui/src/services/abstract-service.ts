import {userStore} from "@/stores/user-store";
export abstract class AbstractService {
    
    protected store = userStore();
    
    protected getRequestHeaders() {
        return {
            'Content-Type': 'application/json',
            'Authorization': this.store.token
        }
    }
}