import Avataaar, { AvatarStyle } from "avataaars";
import { CSSProperties, FC } from "react";
import PlayerMindEnum from "../../core/types/PlayerMindEnum";
import "./Avatar.scss";
import ConfigurationEditor from "./ConfigurationEditor";
import Options from "./Options";

export type AvatarConfiguration = {
    topType?: string;
    accessoriesType?: string;
    hairColor?: string;
    facialHairType?: string;
    facialHairColor?: string;
    clotheType?: string;
    clotheColor?: string;
    graphicType?: string;
    eyeType?: string;
    eyebrowType?: string;
    mouthType?: string;
    skinColor?: string;
}

const Avatar: FC<{
    mind?: PlayerMindEnum,
    configuration: AvatarConfiguration,
    className?: string,
    style?: CSSProperties
}> = ({ mind, configuration, className, style }) => {
    let mindClass = "";
    if (mind === PlayerMindEnum.GOOD)
        mindClass = "avatar-good"
    if (mind === PlayerMindEnum.BAD)
        mindClass = "avatar-bad"

    return <div className={mindClass + (className || "")} style={style}>
        <Avataaar avatarStyle={AvatarStyle.Circle} style={{ width: "100%", height: "100%" }} {...configuration as any} />
    </div>
}

export default Avatar;
export const AvatarConfigurationOptions = Options;
export const AvatarConfigurationEditor = ConfigurationEditor;