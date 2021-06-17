import React from "react";
import Split from 'react-split';
import MeetingType from "../../../core/types/MeetingType";
import Meeting from "./Meeting";
import "./MeetingSplitter.scss";

const MeetingSplitter: React.FC<{
    children: JSX.Element,
    meeting?: MeetingType,
    me?: string,
}> = ({ children, meeting: meeting, me }) => {

    if (meeting)
        return <Split className="split">
            {children}
            <Meeting meeting={meeting} me={me} />
        </Split>
    else
    return children;
}

export default MeetingSplitter;