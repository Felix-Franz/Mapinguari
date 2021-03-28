#!/usr/bin/env node

import Server, { ServerConfigType } from "./src/libraries/Server";
import { Logger } from "./index";

Logger.configure();

const serverConfig : ServerConfigType = {
    port: 8080,
};

if (process.env.PORT)
serverConfig.port = parseInt(process.env.PORT);

Server.start(serverConfig);
