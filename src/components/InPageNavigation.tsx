import { useRef, useState } from "react";

const InPageNavigation = ({ routes, defaultHidden = [], children }) => {
    const activateTablineRef = useRef();
    const [inPageNavIndex, setInPageNavIndex] = useState(0);

    const changePageState = (btn, i) => {
        const { offsetWidth, offsetLeft } = btn;
        if (activateTablineRef.current) {
            const newStyle = {
                width: offsetWidth + 'px',
                left: offsetLeft + 'px'
            };
            activateTablineRef.current.style.cssText = Object.entries(newStyle)
                .map(([key, value]) => `${key}: ${value}`)
                .join(';');
        }
        setInPageNavIndex(i);
    };

    return (
        <><section className="mx-10 my-5">

            <div className="relative mb-8 text-lg border-b border-gray-200 flex flex-nowrap overflow-x-auto">
                {
                    routes.map((route, i) => {
                        return (
                            <button key={i} className={"p-4 px-5 capitalize " + (inPageNavIndex === i ? "text-black border-b-2 border-black " : "text-gray-500 ") + ( defaultHidden.includes(route) ? " md:hidden ": ' ' )}

                            onClick={(e) => { changePageState(e.target, i) }}
                            >
                                {route}
                            </button>
                        );
                    })
                }
                <hr ref={activateTablineRef} className="absolute bottom-0 duration-300" />
            </div>
            {Array.isArray(children)?children[inPageNavIndex] : children}
                </section>
        </>
    );
};

export default InPageNavigation;
