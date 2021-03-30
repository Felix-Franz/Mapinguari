import {Request, Response} from "express";
import ServiceEnum from "../core/types/ServiceEnum";

export default interface ServiceInterface {
    readonly path: ServiceEnum | string;
    handleGet?(req: Request, res: Response) : void;
}
