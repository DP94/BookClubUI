import {BookDto} from "@/dtos/book-dto";

export class UserDto {
    id: string;
    username: string;
    name: string;
    email: string;
    loyalty: string;
    password: string;
    booksRead: Array<BookDto>;
}