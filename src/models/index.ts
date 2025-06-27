export interface Blog {
    _id?: string;
    title?: string;
    content?: string;
    author?: {
        name?: string;
    };
    createdAt?: string;
    thumbnail?: string;
}