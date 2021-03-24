import {useTranslation} from "react-i18next";
import "./Menu.scss";
import {DropdownItem, DropdownMenu, DropdownToggle, UncontrolledDropdown} from "reactstrap";
import {Languages} from "../../i18n";
import Flag from 'react-world-flags';

const Menu = () => {
    const { i18n} = useTranslation();
    const changeLanguage = (lng: any) => {
        i18n.changeLanguage(lng);
    };

    const countryMapper = (lang: string) => {
        switch (lang) {
            case "en":
                return "GB";
            default:
                return lang;
        }
    }

    return (
        <div className="menu-wrapper">
            <div className="menu-box1"/>
            <div className="menu-box2"/>
            <div className="menu-box3"/>
            <div className="menu-box4"/>
            <div className="menu-box5"/>
            <div className="menu-content">
                <UncontrolledDropdown size="sm" className="mt-2">
                    <DropdownToggle caret>
                        <Flag code={countryMapper(i18n.language)} style={{width: "1.5em"}}/>
                    </DropdownToggle>
                    <DropdownMenu style={{minWidth: "auto"}}>
                        {Languages.map((l, i) =>
                            <DropdownItem key={i} onClick={() => changeLanguage(l)}>
                                <Flag code={countryMapper(l)} style={{width: "1.5em"}}/>
                            </DropdownItem>
                        )}
                    </DropdownMenu>
                </UncontrolledDropdown>
            </div>
        </div>

    );
}

export default Menu;
