import { Typography } from "@mui/material";

interface QuoteProps {
    quote: string;
    caption: string;
   }

const Quote = ({quote, caption }: QuoteProps) => {
    return (
        <div className="bg-blue-200 p-3 pl-5 border-l-4 border-blue-700">
            <Typography variant="h6" style={{ overflowX: 'auto' }}>{quote}</Typography>
            {caption.length ? <Typography variant="body2" className="text-blue-800">{caption}</Typography> : null}
        </div>
    );
}

export default Quote