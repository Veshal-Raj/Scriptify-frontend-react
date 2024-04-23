export interface CommentDrawerProps {
    open: boolean;
    onClose: () => void;
    title: string;
    commentData: {
        userId: string;
        authorId: string;
        blogId: string;
        _id: string;
    };

}


export interface CommentResponse {
    commentId?: string,
    commentedUser: {
        id: string;
        username: string;
    };
    comment: string;
    commentTime: string;
}