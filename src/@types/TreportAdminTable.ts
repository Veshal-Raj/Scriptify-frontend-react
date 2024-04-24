interface Report {
    blogId(blogId: any): void;
    reportId: string;
    blogBanner: string;
    blogTitle: string;
    reportedByUsername: string;
    isBlocked: boolean;
    reason: string;
    publishedAt: string; // Assuming this is a string, adjust the type as necessary
    authorEmail: string;
   }
  
export interface ReportTableProps {
    reports: Report[];
   }
   