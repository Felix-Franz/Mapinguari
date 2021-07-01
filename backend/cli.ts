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
    .alias("version", "v")
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
    .option("jitsi", {
        alias: "j",
        type: "string",
        description: "Custom jitsi domain",
        default: "meet.jit.si"
    })
    .option("imprint-name", {
        type: 'string',
        description: "Name on imprint page",
    })
    .option("imprint-address", {
        type: 'string',
        description: "Address on imprint page",
    })
    .option("imprint-mail", {
        type: 'string',
        description: "Mail on imprint page",
    })
    .option("imprint-phone", {
        type: 'string',
        description: "Phone number on imprint page",
    })
    .option("imprint-web", {
        type: 'string',
        description: "Web site on imprint page e.g. example.com",
    })
    .option("privacy-policy", {
        type: 'boolean',
        description: "Enable privacy policy",
        default: false
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
    Config.jitsi = args.jitsi;
    if (args["imprint-name"] || args["imprint-address"] || args["imprint-mail"] || args["imprint-phone"] || args["imprint-web"])
        Config.imprint = {
            name: args["imprint-name"],
            address: args["imprint-address"],
            mail: args["imprint-mail"],
            phone: args["imprint-phone"],
            web: args["imprint-web"]
        }
    if(args["privacy-policy"])
        Config.privacyPolicy = true;
        else
        Config.privacyPolicy = false;

    Server.start({
        port: args.port
    });
} catch (e) {
    Logger.log(LEVELS.error, e.message, e);
}
