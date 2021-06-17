import { faGamepad, faInfo, faPhone, faPowerOff, faUserFriends } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { FC, useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { Collapse, Nav, Navbar, NavbarToggler, NavItem, NavLink } from "reactstrap";
import AlertModal from "../../../components/AlertModal";
import PlayerType from "../../../core/types/PlayerType";
import { SocketClientEvents, SocketServerEvents } from "../../../core/types/SocketEventsEnum";
import SocketClient from "../../../libraries/SocketClient";
import TabInfo from "./TabInfo";
import TabPlayers from "./TabPlayers";
import { toast } from "react-toastify";
import MeetingSplitter from "../meeting/MeetingSplitter";
import MeetingType from "../../../core/types/MeetingType";
import Meeting from "../meeting/Meeting";

const Tabs: FC<{
    children: JSX.Element,
    players: PlayerType[],
    me: string,
    roomCode: string,
    allowKick: boolean,
    allowStop: boolean,
    meeting?: MeetingType
}> = ({ children, players, me, roomCode, allowKick, allowStop, meeting }) => {
    const { t } = useTranslation();
    const [isOpen, setIsOpen] = useState(false);
    const [tab, setTab] = useState<"game" | "meeting" | "players" | "info">("game");

    useEffect(() => {
        SocketClient.on(SocketServerEvents.StopGameFailed, () => toast.error(t("Game.Tabs.Stop.Error")));

        return () => {
            SocketClient.off(SocketServerEvents.StopGameFailed);
        }
    });

    let tabPage = <>
        <div className={tab === "game" ? "" : "d-none"}>{children}</div>
        <Meeting className={tab === "meeting" ? "" : "d-none"} meeting={meeting!} me={me} />
        <TabPlayers className={tab === "players" ? "" : "d-none"} players={players} me={me} roomCode={roomCode} allowKick={allowKick} />
        <TabInfo className={tab === "info" ? "" : "d-none"} />
    </>;
    // switch (tab) {
    //     case "game":
    //         tabPage = children;
    //         break;
    //     case "meeting":
    //         tabPage = <Meeting meeting={meeting!} me={me} />
    //         break;
    //     case "players":
    //         tabPage = <TabPlayers players={players} me={me} roomCode={roomCode} allowKick={allowKick} />;
    //         break;
    //     case "info":
    //         tabPage = <TabInfo />;
    //         break;
    // }

    const onStopClick = () => {
        AlertModal.show({
            header: t("Game.Tabs.Stop.Header"),
            message: t("Game.Tabs.Stop.Message"),
            buttons: [{
                text: t("General.Yes"),
                color: "secondary",
                handler: () => SocketClient.emit(SocketClientEvents.StopGame)
            }, {
                text: t("General.No"),
                color: "primary"
            }]
        });
    }

    return (<div>
        <Navbar color="secondary" dark expand={true} className="p-0">
            <NavbarToggler onClick={() => setIsOpen(!isOpen)} />
            <Collapse isOpen={isOpen} navbar>
                <Nav className="w-100" style={{ marginRight: "8em" }} navbar>
                    <NavItem className="mx-auto">
                        <NavLink onClick={() => setTab("game")} active={tab === "game"} className="text-center pointer">
                            <FontAwesomeIcon icon={faGamepad} size="2x" />
                        </NavLink>
                    </NavItem>
                    <NavItem className={`mx-auto d-md-none ${meeting ? "" : "d-none"}`}>
                        <NavLink onClick={() => setTab("meeting")} active={tab === "meeting"} className="text-center pointer">
                            <FontAwesomeIcon icon={faPhone} size="2x" />
                        </NavLink>
                    </NavItem>
                    <NavItem className="mx-auto">
                        <NavLink onClick={() => setTab("players")} active={tab === "players"} className="text-center pointer">
                            <FontAwesomeIcon icon={faUserFriends} size="2x" />
                        </NavLink>
                    </NavItem>
                    <NavItem className="mx-auto">
                        <NavLink onClick={() => setTab("info")} active={tab === "info"} className="text-center pointer">
                            <FontAwesomeIcon icon={faInfo} size="2x" />
                        </NavLink>
                    </NavItem>
                    <NavItem className={`mx-auto ${allowStop ? "" : "d-none"}`}>
                        <NavLink onClick={onStopClick} className="text-center pointer">
                            <FontAwesomeIcon icon={faPowerOff} size="2x" />
                        </NavLink>
                    </NavItem>
                </Nav>
            </Collapse>
        </Navbar>
        <MeetingSplitter meeting={meeting} me={me} className="d-sm-none d-md-flex">
            <div>{tabPage}</div>
        </MeetingSplitter>
        <div className="d-md-none">{tabPage}</div>
    </div>);
};

export default Tabs;