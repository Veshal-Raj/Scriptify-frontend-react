import WarningContent from "./BlogContents/WarningContent";
import ChecklistContent from "./BlogContents/ChecklistContent";
import TableContent from "./BlogContents/TableContent";
import RawHTMLBlock from "./BlogContents/RawHTMLBlock";
import DelimiterBlock from "./BlogContents/DelimiterBlock";
import EmbeddedContent from "./BlogContents/EmbeddedContent";
import CodeBlock from "./BlogContents/CodeBlock";
import ListComponent from "./BlogContents/List";
import Quote from "./BlogContents/Quote";
import Img from "./BlogContents/Img";
import { Typography, useMediaQuery } from "@mui/material";


const BlogContent = ({ block }) => {
    const isSmallScreen = useMediaQuery('(max-width:600px)');

    const { type, data } = block
 
    if (type === 'paragraph'){
        return <Typography variant="body1" style={{ overflowX: 'auto' }} dangerouslySetInnerHTML={{ __html: data.text }} />
    } 

    if (type === 'header') {
        let variant;
        switch (data.level) {
            case 3:
                variant = isSmallScreen ? "h6" : "h5";
                break;
            case 2:
                variant = isSmallScreen ? "h5" : "h4";
                break;
            case 1:
                variant = isSmallScreen ? "h4" : "h3";
                break;
            default:
                return null;
        }
        return <Typography variant={variant} component={`h${data.level}`} style={{ overflowX: 'auto' }} dangerouslySetInnerHTML={{ __html: data.text }} />;
    }

    if (type === 'image') {
        return <Img url={data.file.url} caption={data.caption}/>
    }

    if (type === 'quote') {
        return <Quote quote={data.text} caption={data.caption} />
    }

    if (type === 'list') {
        return <ListComponent style={data.style} items={data.items} />
    }

    if (type === 'code') {
        return <CodeBlock code={data.code} />;
    }

    if (type === 'embed') {
        return <EmbeddedContent embed={data.embed} width={data.width} height={data.height} caption={data.caption}/>;
    }
    
    if (type === 'delimiter') {
        return <DelimiterBlock />
    }

    if (type === 'raw') {
        return <RawHTMLBlock code={data.html}/>
    }

    if (type === 'table') {
        return <TableContent content={data.content} />
    }

    if (type === 'checklist') {
        return <ChecklistContent items={data.items} />
    }

    if (type === "warning") {
        return <WarningContent title={data.title} message={data.message} />
    }

    else {
        return <Typography variant="h5" className="bg-black text-white">this is not the block</Typography>
    }
}

export default BlogContent