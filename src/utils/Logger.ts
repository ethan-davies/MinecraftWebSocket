import chalk from 'chalk';

export default class Logger {
    private static prefix = chalk.blueBright('Minecraft-WebSocket |');

    private static log(...args: any[]): void {
        args.forEach(arg => {
            if (typeof arg === 'string') {
                const lines = arg.split('\n');
                lines.forEach(line => {
                    console.log(Logger.prefix, chalk.green(line));
                });
            } else {
                console.log(Logger.prefix, chalk.green(arg));
            }
        });
    }

    public static info(...args: any[]): void {
        Logger.log(...args);
    }

    public static warn(...args: any[]): void {
        Logger.log(...args);
    }

    public static error(...args: any[]): void {
        Logger.log(...args);
    }

    public static debug(...args: any[]): void {
        Logger.log(...args);
    }
}
