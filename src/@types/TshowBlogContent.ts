export interface BlogData {
    publishedAt: string | number | Date;
    banner: string | undefined;
    _id: boolean | string;
    blog_id?: string;
    activity?: {
        total_likes: number;
        total_comments: number;
    };
    author: {
        personal_info: any
        _id: string;
    };
    title: string;
    content: {
        blocks: any[];
    }[]
}

export interface Blog {
    title: string;
    _id: string;
    blog_id?: string;
    banner?: string;
}