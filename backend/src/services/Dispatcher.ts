import ServiceInterface from "./ServiceInterface";
import {Request, Response} from "express";

export default class Dispatcher implements ServiceInterface {
    path: string = "/";

    handleGet(req: Request, res: Response){
        res.send('<html>'+ 
        '<head><title>Mapinguari API</title></head>' +
        '<body><h1>Mapinguari API</h1><p>Visit the <a href="https://gitlab.com/FelixFranz/mapinguari">Gitlab Project</a> for more information!</p></body>' +
        '</html>');
    }
}