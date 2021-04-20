import { faArrowLeft, faArrowRight } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { FC } from "react";
import { useTranslation } from "react-i18next";
import { Button, Form, FormGroup, Input, InputGroup, InputGroupAddon, Label } from "reactstrap";
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
        // @ts-ignore
        const currentConfig: string = configuration[key];
        // @ts-ignore
        const configOptions: string[] = AvatarConfigurationOptions[key];
        const currentConfigIndex = configOptions.findIndex(s => s === currentConfig);
        const prevConfig = configOptions[(currentConfigIndex - 1 + configOptions.length) % configOptions.length];
        const nextConfig = configOptions[(currentConfigIndex + 1) % configOptions.length];
        return <FormGroup className={`mb-1 ${hide ? "d-none" : ""}`}>
            <Label for={key} className="mb-0">{t(`AvatarEditor.${key.replace(/^(.)(.*)$/, (a, b, c) => `${b.toUpperCase()}${c}`)}`)}</Label>
            <InputGroup>
                <InputGroupAddon addonType="prepend">
                    <Button color="primary" outline onClick={() => change(key, prevConfig)}>
                        <FontAwesomeIcon icon={faArrowLeft} />
                        </Button>
                </InputGroupAddon>
                <Input type="select" name={key} value={currentConfig} onChange={e => change(key, e.target.value)}>
                    {configOptions.map((o, i) => <option key={i}>{o}</option>)}
                </Input>
                <InputGroupAddon addonType="append">
                    <Button color="primary" outline onClick={() => change(key, nextConfig)}>
                        <FontAwesomeIcon icon={faArrowRight} />
                        </Button>
                </InputGroupAddon>
            </InputGroup>
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