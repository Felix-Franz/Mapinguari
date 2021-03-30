import {Request, Response} from "express";

export default interface ServiceInterface {
    readonly path: string;
    handleGet?(req: Request, res: Response) : void;
}
