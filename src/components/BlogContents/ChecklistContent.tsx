import { Checkbox, FormControlLabel } from "@mui/material";

interface ChecklistItem {
    checked: boolean;
    text: string;
   }
   
   interface ChecklistContentProps {
    items: ChecklistItem[];
   }

const ChecklistContent: React.FC<ChecklistContentProps> = ({ items }) => {
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