import axios from "axios";
import {BookDto} from "@/dtos/book-dto";

export class BookService {
    async getAllBooks(): Promise<BookDto[]> {
        const response = await axios.get(`${import.meta.env.VITE_API_URL}v1/Book`);
        return response.data;
    }

    async getBookById(id: string): Promise<BookDto> {
        const response = await axios.get(`${import.meta.env.VITE_API_URL}v1/Book/${id}`);
        return response.data;
    }
}