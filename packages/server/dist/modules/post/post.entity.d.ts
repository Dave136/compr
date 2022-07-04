declare class Social {
    reference: string;
    instagram?: string;
    twitter?: string;
    telegram?: string;
}
export declare class Post {
    id: string;
    title: string;
    content: string;
    phone: string;
    links: Social;
    price: number;
}
export {};
