#!/usr/bin/env node

import { Logger } from "./index";
import Server, { ServerConfigType } from "./src/libraries/Server";

Logger.configure();

const serverConfig: ServerConfigType = {
    port: 8080,
};

if (process.env.PORT)
    serverConfig.port = parseInt(process.env.PORT);

//ToDo remove following line
serverConfig.port = 80;

Server.start(serverConfig);
