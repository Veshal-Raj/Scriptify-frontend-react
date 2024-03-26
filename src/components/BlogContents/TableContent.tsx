import { Typography } from "@mui/material";


const TableContent = ({ content }) => {
    return (
        <div className="table-container overflow-x-auto">
            <table className="w-full border-collapse border border-gray-400">
                <tbody>
                    {content.map((row, index) => (
                        <tr key={index}>
                            {row.map((cell, cellIndex) => (
                                <td key={cellIndex} className="border border-gray-400 p-2">
                                    <Typography variant="body1">{cell}</Typography>
                                </td>
                            ))}
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
}


export default TableContent