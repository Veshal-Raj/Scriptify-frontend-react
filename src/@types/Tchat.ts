import { ReactNode } from "react";

export interface IUserList {
    _id?: string;
    userId?: string | null;
    username?: string;
    lastMessage?: string;
    time?: string | null;
    online?: boolean;
    profileImage?: string;
  }

export interface IDummyUser {
    _id: string,
    name: string,
    message: string
}

export interface IConversation {
  content?: ReactNode;
  id?: number | string | undefined;
  sender: {
    personal_info?: any;
    _id?: string | string | undefined;
    id?: number |  string | undefined;
    name?: string;
    profile_img?: string;
  };
  receiver: {
    personal_info?: any;
    _id?: string | undefined;
    id?: number |  string | undefined;
    name?: string;
    profile_img?: string;
  };
  message: string;
  time: string | Date;
}

export interface INewConversation {
  sender: {
    id: string;
    name: string;
    profile_img: string;
  };
  receiver: {
    id: string;
    name: string;
    profile_img: string;
  };
  message: string;
  time: Date;
}
