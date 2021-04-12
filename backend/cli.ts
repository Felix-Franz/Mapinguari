#!/usr/bin/env node

import yargs from "yargs";
import { hideBin } from "yargs/helpers";
import { Logger } from "./index";
import Config from "./src/libraries/Config";
import { LEVELS } from "./src/libraries/Logger";
import Server from "./src/libraries/Server";

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
    .option("legal", {
        type: 'boolean',
        description: "Enable legal page",
        default: false
    })
    .option("legal-name", {
        type: 'string',
        description: "Name on legal page",
    })
    .option("legal-address", {
        type: 'string',
        description: "Address on legal page",
    })
    .option("legal-mail", {
        type: 'string',
        description: "Mail on legal page",
    })
    .option("legal-phone", {
        type: 'string',
        description: "Phone number on legal page",
    })
    .option("legal-web", {
        type: 'string',
        description: "Web site on legal page",
    })
    .example("$0", "Starts the mapinguari server")
    .example("$0 -p 80", "Starts server on port 80")
    .epilogue("You can also use environment variables instead of parameters (eg. PORT=80 instead of --port 80).\nVisit https://gitlab.com/FelixFranz/mapinguari/-/wikis/configuration for more information!\n")
    .epilogue("Also checkout the source on https://gitlab.com/FelixFranz/mapinguari")
    .argv

try {
    Logger.configure(args.loglevel);
} catch (e) {
    console.error(e)
}

try {
    if (args.legal)
        Config.legal = {
            enabled: args.legal,
            name: args["legal-name"],
            address: args["legal-address"],
            mail: args["legal-mail"],
            phone: args["legal-phone"],
            web: args["legal-web"]
        }
    else
        Config.legal.enabled = args.legal

    Server.start({
        port: args.port
    });
} catch (e) {
    Logger.log(LEVELS.error, e.message, e);
}
