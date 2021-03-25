import * as winston from "winston";

export enum LEVEL {
    error = "error",
    warn = "warn",
    info = "info",
    http = "http",
    verbose = "verbose",
    debug = "debug",
    silly = "silly"
}

export class Logger {
    public readonly LEVEL = LEVEL;
    public static readonly LEVEL = LEVEL;

    private static logger: winston.Logger;

    public static configure(level: string = LEVEL.debug) {
        if (!!this.logger)
            return;
        this.logger = winston.createLogger({
            level: level,
            format: winston.format.combine(
                winston.format.timestamp(),
                winston.format.prettyPrint()
            ),
            transports: [
                new winston.transports.Console,
            ]
        });
        this.log(LEVEL.info, "Logger initialized!");
    }

    public static log(level: LEVEL, message: string, metadata: any = {}) {
        if (!this.logger)
            return;
        this.logger.log(level, message, metadata);
    }
}
