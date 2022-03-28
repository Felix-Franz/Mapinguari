import ServiceInterface from "./ServiceInterface";
import { Request, Response } from "express";
import Config from "../libraries/Config";
import ServiceEnum from "../core/types/ServiceEnum";
import {Languages} from "../core/Languages";
import fs from "fs";

export default class Legal implements ServiceInterface {
    path = ServiceEnum.PrivacyPolicy;

    private buildFilePath(base: string, language: string){
        return `${base}privacy-policy_${language}.html`
    }

    handleGet(req: Request, res: Response) {
        if (!Config.privacyPolicy){
            res.sendStatus(404)
            return;
        }

        const buildFilePath =(base: string, language: string) => 
            `${base}privacy-policy_${language}.html`;

        let lang = req.query.language as string | undefined
        if (!lang || !Languages.includes(lang))
            lang = Languages[0];
        if (!fs.existsSync(buildFilePath(Config.privacyPolicy, lang)))
            lang = Languages[0];
        if (!fs.existsSync(buildFilePath(Config.privacyPolicy, lang))){
            res.sendStatus(500)
            return;
        }
        
        const data = fs.readFileSync(buildFilePath(Config.privacyPolicy, lang));
        res.send(data);
    }
}