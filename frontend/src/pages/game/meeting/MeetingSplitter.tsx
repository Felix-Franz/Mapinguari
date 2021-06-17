import React from "react";
import Split from 'react-split';
import MeetingType from "../../../core/types/MeetingType";
import Meeting from "./Meeting";
import "./MeetingSplitter.scss";

const MeetingSplitter: React.FC<{
    children: JSX.Element,
    meeting?: MeetingType,
    me?: string,
    className?: string
}> = ({ children, meeting, me, className }) => {

    if (!meeting)
        return children
    else
        return <Split className={`split ${className}`}>
            {children}
            <Meeting meeting={meeting} me={me} />
        </Split>

}

export default MeetingSplitter;