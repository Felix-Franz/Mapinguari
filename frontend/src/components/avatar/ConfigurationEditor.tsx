import { FC } from "react";
import { useTranslation } from "react-i18next";
import { Form, FormGroup, Input, Label } from "reactstrap";
import { AvatarConfiguration, AvatarConfigurationOptions } from "./Avatar";

const ConfigurationEditor: FC<{ configuration: AvatarConfiguration, onChange: (configuration: AvatarConfiguration) => void }> = ({ configuration, onChange }) => {
    const { t } = useTranslation();

    const change = (key: string, value: string) => {
        const config = Object.assign({}, configuration);
        // @ts-ignore
        config[key] = value;
        onChange(config);
    }

    const generateSelect = (key: string, hide: boolean = false) => {
        return <FormGroup className="mb-1">
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
        {generateSelect("accessoriesType")}
        {generateSelect("hatColor")}
        {generateSelect("hairColor")}
        {generateSelect("facialHairType")}
        {generateSelect("facialHairColor")}
        {generateSelect("clotheType")}
        {generateSelect("clotheColor")}
        {generateSelect("graphicType")}
        {generateSelect("eyeType")}
        {generateSelect("eyebrowType")}
        {generateSelect("mouthType")}
        {generateSelect("skinColor")}
    </Form>
}

export default ConfigurationEditor;