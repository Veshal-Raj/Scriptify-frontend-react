export interface UserOTP {
  otp: string;
}

export interface IncreaseReadCountData {
  userId: string | undefined;
  blogId: string | undefined;
}

export interface FollowUserData {
  authorId: string;
  userId: string | undefined;
}

export interface BlogData {
  title?: string;
  activity?: any;
  blogId: string | boolean;
  userId: string | undefined;
}

export interface CommentData {
  commentData: {
    userId: string;
    authorId: string;
    blogId: string;
    _id: string;
  };
  comment?: string[];
}

export interface Data {
  notificationId: string;
}

export interface GoogleAuthData {
  uid: string;
}

export interface ChangePasswordData {
  newPassword: string;
  confirmPassword: string;
  token: string | null | undefined;
}

export interface ForgotPasswordData {
  email: string;
  token: string | null | undefined;
}

export interface changePasswordLoggedData {
  userId: string | undefined;
  newPassword: string;
  confirmPassword: string;
  token: string | null | undefined;
}

export interface PersonalInfo {
  username: string;
  email: string;
  bio?: string;
  profile_img?: string;
  // Add any other properties if needed
}

export interface SocialLinks {
  youtube?: string;
  instagram?: string;
  facebook?: string;
  twitter?: string;
  github?: string;
  website?: string;
  // Add any other properties if needed
}

export interface UpdatedUserData {
  userId: string | undefined;
  uploaded_image?: string | undefined;
  personal_info:
    | {
        username: string | undefined;
        email: string | undefined;
        bio: string | undefined;
      }
    | undefined;
  social_links:
    | {
        youtube?: string | undefined;
        instagram?: string | undefined;
        facebook?: string | undefined;
        twitter?: string | undefined;
        github?: string | undefined;
        website?: string | undefined;
      }
    | undefined;
}

export interface SubscriptionData {
  userId: string;
  subscriptionType: string;
}

export interface reportBlogData {
  blog_id: string | boolean;
  reportedBy: string | undefined;
  reason: string;
}
