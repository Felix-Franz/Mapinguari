import ServiceInterface from "./ServiceInterface";
import { Request, Response } from "express";
import Config from "../libraries/Config";
import ServiceEnum from "../core/types/ServiceEnum";

export default class Legal implements ServiceInterface {
    path = ServiceEnum.Meeting;

    handleGet(req: Request, res: Response) {
        res.send(Config.jitsi);
    }
}