interface Blog {
    _id: string;
    banner: string;
    title: string;
    author: {
       personal_info: {
         username: string;
         email: string;
       };
    };
    isBlocked: boolean;
    publishedAt: Date;
   }
   
  export interface BlogTableProps {
    blogs: Blog[];
   }