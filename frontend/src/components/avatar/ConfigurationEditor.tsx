import { FC } from "react";
import { useTranslation } from "react-i18next";
import { Form, FormGroup, Input, Label } from "reactstrap";
import AvatarConfigurationType from "../../core/types/AvatarConfigurationType";
import { AvatarConfigurationOptions } from "./Avatar";

const ConfigurationEditor: FC<{ configuration: AvatarConfigurationType, onChange: (configuration: AvatarConfigurationType) => void }> = ({ configuration, onChange }) => {
    const { t } = useTranslation();

    const change = (key: string, value: string) => {
        const config = Object.assign({}, configuration);
        // @ts-ignore
        config[key] = value;
        onChange(config);
    }

    const generateSelect = (key: string, hide: boolean = false) => {
        return <FormGroup className={`mb-1 ${hide ? "d-none" : ""}`}>
            <Label for={key} className="mb-0">{t(`AvatarEditor.${key.replace(/^(.)(.*)$/, (a, b, c) => `${b.toUpperCase()}${c}`)}`)}</Label>
            {/* @ts-ignore */}
            <Input type="select" name={key} value={configuration[key]} onChange={e => change(key, e.target.value)}>
                {/* @ts-ignore */}
                {AvatarConfigurationOptions[key].map((o, i) => <option key={i}>{o}</option>)}
            </Input>
        </FormGroup >
    }

    return <Form>
        {generateSelect("topType")}
        {generateSelect("accessoriesType", configuration.topType === "Eyepatch")}
        {generateSelect("hatColor", !["Hijab", "Turban", "WinterHat1", "WinterHat2", "WinterHat3", "WinterHat4"].includes(configuration.topType!))}
        {generateSelect("hairColor", ["NoHair", "Eyepatch", "Hat", "Hijab", "Turban", "WinterHat1", "WinterHat2", "WinterHat3", "WinterHat4", "LongHairFrida", "LongHairShavedSides"].includes(configuration.topType!))}
        {generateSelect("facialHairType", configuration.topType === "Hijab")}
        {generateSelect("facialHairColor", configuration.facialHairType === "Blank")}
        {generateSelect("clotheType")}
        {generateSelect("clotheColor", ["BlazerShirt", "BlazerSweater"].includes(configuration.clotheType!))}
        {generateSelect("graphicType", configuration.clotheType !== "GraphicShirt")}
        {generateSelect("eyeType")}
        {generateSelect("eyebrowType")}
        {generateSelect("mouthType")}
        {generateSelect("skinColor")}
    </Form>
}

export default ConfigurationEditor;