import { Alert } from "@mui/material";

interface WarningContentProps {
    title: string;
    message: string;
   }

const WarningContent = ({ title, message }: WarningContentProps) => {
    return (
        <Alert severity="warning">
            <strong>{title}</strong> - {message}
        </Alert>
    );
};


export default WarningContent