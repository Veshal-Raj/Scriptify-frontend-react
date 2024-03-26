import { Checkbox, FormControlLabel } from "@mui/material";


const ChecklistContent = ({ items }) => {
    return (
        <div >
            {items.map((item, index) => (
                <FormControlLabel
                    key={index}
                    control={<Checkbox color="primary" checked={item.checked} />}
                    label={item.text}
                />
            ))}
        </div>
    );
};

export default ChecklistContent