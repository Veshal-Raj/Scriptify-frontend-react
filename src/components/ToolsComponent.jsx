import CodeTool from '@editorjs/code';
import EmbedTool from '@editorjs/embed';
import HeaderTool from '@editorjs/header';
import ImageTool from '@editorjs/image';
import InlineCodeTool from '@editorjs/inline-code';
import ListTool from '@editorjs/list';
import MarkerTool from '@editorjs/marker';
import QuoteTool from '@editorjs/quote';
import Table from '@editorjs/table';
import RawTool from '@editorjs/raw';
import Checklist from '@editorjs/checklist';
import Delimiter from '@editorjs/delimiter';
import Warning from '@editorjs/warning';

import { uploadImage } from '../hooks/useAws';

const uploadImageByFile =  (e) => {
    return uploadImage(e).then(url => {
        if (url) {
            return {
                success: 1,
                file: { url }
            }
        }
    })
}

const uploadImageByURL = async (e) => {
    console.log('inside the uploadImageByURL')
    console.log('inside the uploadImageByURL:', e);

    const link = new Promise((resolve, reject) => {
        try {
            resolve(e)
        } catch (error) {
            reject(error)
        }
    })

    return link.then(url => {
        return {
            success: 1,
            file: { url }
        }
    })
}

export const tools = {
    embed: EmbedTool,
    list: {
        class: ListTool,
        inlineToolbar: true,
    },
    image: {
        class: ImageTool,
        config: {
            uploader: {
                uploadByUrl: uploadImageByURL,
                uploadByFile: uploadImageByFile,
            }
        }
    },
    header: {
        class: HeaderTool,
        config: {
            placeholder: "Type Heading...",
            levels: [1,2,3],
            defaultLevel: 1
        }
    },
    quote: {
        class: QuoteTool,
        inlineToolbar: true,
    },
    marker: MarkerTool,
    code: CodeTool,
    inlineCode: InlineCodeTool,
    table: Table,
    raw: RawTool,
    checklist: {
        class: Checklist,
        inlineToolbar: true,
      },
      delimiter: Delimiter,
      warning: Warning,
    
}