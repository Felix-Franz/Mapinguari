import logSymbols from "log-symbols";
import * as winston from "winston";
import {Colorizer} from "logform"

export enum LEVELS {
    success = "success",
    error = "error",
    warn = "warn",
    info = "info",
    http = "http",
    verbose = "verbose",
    debug = "debug",
    silly = "silly"
}

const winstonLevels: any = {};
Object.keys(LEVELS).forEach((l, i) => winstonLevels[l] = i);

export class Logger {
    public readonly LEVEL = LEVELS;
    public static readonly LEVEL = LEVELS;

    private static colorizer : Colorizer;
    private static logger: winston.Logger;

    public static configure(level: string = LEVELS.debug) {
        if (!!this.logger)
            return;

        this.colorizer = winston.format.colorize({colors: {success: "green", info: "blue"}});

        this.logger = winston.createLogger({
            level: level,
            levels: winstonLevels,
            format: winston.format.combine(
                // winston.format.colorize({colors: }),
                winston.format.timestamp(),
                // winston.format.prettyPrint({colorize: true}),
                winston.format.printf(
                    info => {
                        return info.level.replace(LEVELS.info, logSymbols.info).replace(LEVELS.warn, logSymbols.warning).replace(LEVELS.error, logSymbols.error).replace(LEVELS.success, logSymbols.success)
                            + " "
                            + "[" + info.timestamp.replace('T', ' ').replace('Z', '') + "]"
                            + " "
                            + this.colorizer.colorize(info.level, info.message)
                    }),
            ),
            transports: [
                new winston.transports.Console,
            ]
        });
        this.log(LEVELS.info, "Logger initialized!");
    }

    public static log(level: LEVELS, message: string, metadata: any = {}) {
        if (!this.logger)
            return;
        this.logger.log(level, message, metadata);
    }
}
