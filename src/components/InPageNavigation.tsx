import { ReactNode, useState } from "react";
import { Button,  Typography } from "@mui/material"; 

type Props = {
    routes: string[];
    defaultHidden: string[];
    children: ReactNode;
}

const InPageNavigation: React.FC<Props> = ({ routes, defaultHidden = [], children }) => {
    const [inPageNavIndex, setInPageNavIndex] = useState(0);

    const changePageState = ( i: number) => {
        setInPageNavIndex(i);
    };

    return (
        <>
            <section className="mx-10 my-5">
                <div className="relative mb-8 text-lg  flex flex-nowrap overflow-x-auto">
                    {routes.map((route, i) => (
                        <Button
                            key={i}
                            className={"p-4 px-5 capitalize " + (defaultHidden.includes(route) ? "md:hidden" : "")}
                            onClick={() => { changePageState( i) }} style={{  color: (inPageNavIndex === i ? 'black' : 'gray') , padding: '1rem',paddingLeft: '1.25rem', borderBottom: inPageNavIndex === i ? '1px solid black' : 'none'}}
                        >
                            {route}
                        </Button>
                    ))}
                </div>
                <Typography variant="body1">{Array.isArray(children) ? children[inPageNavIndex] : children}</Typography>
            </section>
        </>
    );
};

export default InPageNavigation;
