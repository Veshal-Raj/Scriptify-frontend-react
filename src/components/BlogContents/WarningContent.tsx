import { Alert } from "@mui/material";


const WarningContent = ({ title, message }) => {
    return (
        <Alert severity="warning">
            <strong>{title}</strong> - {message}
        </Alert>
    );
};


export default WarningContent