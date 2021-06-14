import { useTranslation } from "react-i18next";
import "./Menu.scss";
import { DropdownItem, DropdownMenu, DropdownToggle, UncontrolledDropdown } from "reactstrap";
import { Languages } from "../../i18n";
import Flag from 'react-world-flags';

const Menu = () => {
    const { i18n } = useTranslation();
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
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 8 4" className="menu-svg">
                <path d="M 0 0 C 1 0 1 1 1 1 C 1 1 1 3 3 3 L 7 3 C 8 3 8 4 8 4 L 8 0 L 0 0"/>
            </svg>
            <div className="menu-content">
                <UncontrolledDropdown size="sm" className="mt-2">
                    <DropdownToggle caret color="secondary">
                        <Flag code={countryMapper(i18n.language.slice(0, 2) || "en")} style={{ width: "1.5em" }} />
                    </DropdownToggle>
                    <DropdownMenu style={{ minWidth: "auto" }}>
                        {Languages.map((l, i) =>
                            <DropdownItem key={i} onClick={() => changeLanguage(l)}>
                                <Flag code={countryMapper(l)} style={{ width: "1.5em" }} />
                            </DropdownItem>
                        )}
                    </DropdownMenu>
                </UncontrolledDropdown>
            </div>
        </div>

    );
}

export default Menu;
