import logSymbols from "log-symbols";
import * as winston from "winston";
import { Colorizer } from "logform"

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

    private static colorizer: Colorizer;
    private static logger: winston.Logger;

    public static configure(level: string = LEVELS.debug) {
        if (!!this.logger)
            return;

        this.colorizer = winston.format.colorize({ colors: { success: "green", info: "blue", debug: "cyan", timestamp: "grey" } });

        this.logger = winston.createLogger({
            level: level,
            levels: winstonLevels,
            format: winston.format.combine(
                winston.format.timestamp(),
                winston.format.printf(
                    (info) => {
                        const metadata = JSON.parse(JSON.stringify(info));
                        delete metadata.level;
                        delete metadata.timestamp;
                        delete metadata.message
                        return this.colorizer.colorize(info.level, info.level.replace(LEVELS.info, logSymbols.info).replace(LEVELS.warn, logSymbols.warning).replace(LEVELS.error, logSymbols.error).replace(LEVELS.success, logSymbols.success))
                            + " "
                            + this.colorizer.colorize("timestamp", "[" + info.timestamp.replace('T', ' ').replace('Z', '') + "]")
                            + " "
                            + this.colorizer.colorize(info.level, info.message)
                            + (Object.keys(metadata).length > 0 ? `\n${JSON.stringify(metadata, undefined, 1)}` : "")
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
