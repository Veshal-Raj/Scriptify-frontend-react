type HeaderLevel = 1 | 2 | 3 | 4 | 5 | 6;

export const headerLevelToElement = {
    1: 'h1',
    2: 'h2',
    3: 'h3',
    4: 'h4',
    5: 'h5',
    6: 'h6',
};

export interface FileType {
    url: string;
   }

 export  interface ChecklistItem {
    text: string;
    checked: boolean;
   }


interface BlockData {
    message?: string;
    title?: string;
    content?: string[][];
    html?: string;
    height?: string | number;
    width?: string | number;
    embed?: string;
    code?: string;
    items?: string[];
    style?: "ordered" | "unordered";
    caption?: string;
    file?: FileType;
    level?: HeaderLevel;
    text?: string;
}

export interface Block {
    type: string;
    data: BlockData;
}