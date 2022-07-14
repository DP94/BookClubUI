import axios from "axios";
import {BookDto} from "@/dtos/book-dto";
import {userStore} from "@/stores/user-store";
import {AbstractService} from "@/services/abstract-service";

export class BookService extends AbstractService {
    
    async getAllBooks(): Promise<BookDto[]> {
        const response = await axios.get(`v1/Book`, {
            headers : this.getRequestHeaders()
        });
        return response.data;
    }

    async getBookById(id: string): Promise<BookDto> {
        const response = await axios.get(`v1/Book/${id}`, {
            headers : this.getRequestHeaders()
        });
        return response.data;
    }
    
    async getBookMemes(id: string): Promise<any> {
        const response = await axios.get(`v1/Book/${id}/meme`, {
            headers: this.getRequestHeaders()
        });
        return response.data;
    }
    
    async createMemeForBook(id: string, formData: FormData): Promise<any> {
        const response = await axios.post(`${import.meta.env.VITE_API_URL}v1/Book/${id}/meme`, formData, {
            headers: {
                "Content-Type": "application/x-www-form-urlencoded",
                "Authorization": this.store.token
            }
        });
        return response.data;
    }
}