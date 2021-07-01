import ServiceInterface from "./ServiceInterface";
import { Request, Response } from "express";
import Config from "../libraries/Config";
import ServiceEnum from "../core/types/ServiceEnum";

export default class Legal implements ServiceInterface {
    path = ServiceEnum.Legal;

    handleGet(req: Request, res: Response) {
        res.send({
            imprint: Config.imprint,
            privacyPolicy: Config.privacyPolicy
        });
    }
}