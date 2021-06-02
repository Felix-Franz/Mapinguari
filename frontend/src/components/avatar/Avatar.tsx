import Avataaar, { AvatarStyle } from "avataaars";
import { CSSProperties, FC } from "react";
import AvatarConfigurationType from "../../core/types/AvatarConfigurationType";
import PlayerMindEnum from "../../core/types/PlayerMindEnum";
import "./Avatar.scss";
import ConfigurationEditor from "./ConfigurationEditor";
import Options from "./Options";

const Avatar: FC<{
    mind?: PlayerMindEnum,
    configuration: AvatarConfigurationType,
    className?: string,
    style?: CSSProperties
}> = ({ mind, configuration, className, style }) => {
    let mindClass = "";
    if (mind === PlayerMindEnum.GOOD)
        mindClass = "avatar-good"
    if (mind === PlayerMindEnum.BAD)
        mindClass = "avatar-bad"

    return <div className={mindClass + " " + (className || "")} style={style}>
        <Avataaar avatarStyle={AvatarStyle.Circle} style={{ width: "100%", height: "100%" }} {...configuration as any} />
    </div>
}

export default Avatar;
export const AvatarConfigurationOptions = Options;
export const AvatarConfigurationEditor = ConfigurationEditor;