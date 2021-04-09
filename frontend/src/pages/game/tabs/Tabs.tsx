import { faGamepad, faInfo, faUserFriends } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { FC, useState } from "react";
import { Collapse, Nav, Navbar, NavbarToggler, NavItem, NavLink } from "reactstrap";
import PlayerType from "../../../core/types/PlayerType";
import TabInfo from "./TabInfo";
import TabPlayers from "./TabPlayers";

const Tabs: FC<{ children: JSX.Element, players: PlayerType[], me: string, roomCode: string, allowKick: boolean }> = ({ children, players, me, roomCode, allowKick }) => {

    const [isOpen, setIsOpen] = useState(false);
    const [tab, setTab] = useState<"game" | "players" | "info">("game");

    let tabPage;
    switch (tab) {
        case "game":
            tabPage = children;
            break;
        case "players":
            tabPage = <TabPlayers players={players} me={me} roomCode={roomCode} allowKick={allowKick}/>;
            break;
        case "info":
            tabPage = <TabInfo />;
            break;
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
                </Nav>
            </Collapse>
        </Navbar>
        {tabPage}
    </div>);
};

export default Tabs;