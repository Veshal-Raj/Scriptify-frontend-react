import { ReactNode } from "react";
import TuserType from "./TuserType";

export interface IUserList {
    _id: string;
    userId: string;
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
  content: ReactNode;
  id: number;
  sender: {
    personal_info?: any;
    _id?: string;
    id?: number;
    name?: string;
    profile_img?: string;
  };
  receiver: {
    personal_info?: any;
    _id?: string | undefined;
    id?: number;
    name?: string;
    profile_img?: string;
  };
  message: string;
  time: string;
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
