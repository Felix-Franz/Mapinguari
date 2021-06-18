import React from "react";
import Split from 'react-split';
import "./Splitter.scss";

const Splitter: React.FC<{
    children: JSX.Element[],
    className?: string
}> = ({ children, className }) => {

    return <Split className={`split ${className}`} minSize={200}>
        {children}
    </Split>

}

export default Splitter;