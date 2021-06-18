import React from "react";
import Split from 'react-split';
import "./Splitter.scss";

const Splitter: React.FC<{
    children: JSX.Element[],
    className?: string
}> = ({ children, className }) => {

    return <Split className={`split ${className}`}>
        {children}
    </Split>

}

export default Splitter;