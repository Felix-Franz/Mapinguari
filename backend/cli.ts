#!/usr/bin/env node

import { Logger } from "./index";
import Server, { ServerConfigType } from "./src/libraries/Server";
import yargs from "yargs";
import { hideBin } from "yargs/helpers";
import { LEVELS } from "./src/libraries/Logger";

const args = yargs(hideBin(process.argv))
    .env()
    .help("help").alias("help", "h")
    .option('port', {
        alias: 'p',
        type: 'number',
        description: 'Selects the port the the webserver',
        default: 8080
    })
    .option("loglevel", {
        alias: "l",
        description: "Logging level",
        default: "info",
        choices: Object.keys(LEVELS)
    })
    .example("$0", "Starts the mapinguari server")
    .example("$0 -p 80", "Starts server on port 80")
    .epilogue("You can also use environment variables instead of parameters (eg. PORT=80 instead of --port 80)\n")
    .epilogue("Also checkout the source on https://gitlab.com/FelixFranz/mapinguari")
    .argv

    Logger.configure(args.loglevel);

Server.start({
    port: args.port
});