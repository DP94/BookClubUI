import {BookDto} from "@/dtos/book-dto";

export class UserDto {
    id: string;
    username: string;
    name: string;
    email: string;
    loyalty: string;
    password: string;
    profilePictureS3Url: string;
    profilePicImage: string;
    booksRead: Array<BookDto>;
}