declare global {
  namespace snow {
    interface ILogger {
      trace(thisParam?): any;
      debug(message?: any, thisParam?: any);
      info(message?: any, thisParam?: any);
      warn(message?: any, thisParam?: any);
      error(message?: any, thisParam?: any);
      setLevel(level: 0 | 1 | 2 | 3 | 4 | 5);
    }
  }
}

export { };

enum LogLevel {
  Trace = 0,
  Debug = 1,
  Info = 2,
  Warning = 3,
  Error = 4,
  None = 5
}

export class Logger implements snow.ILogger {
  constructor(core: any, private logLevel = LogLevel.Debug) {}

  public trace = (thisParam?) => this.sink(thisParam, LogLevel.Trace, '');
  public debug = (message?: any, thisParam?: any) => this.sink(thisParam, LogLevel.Debug, message);
  public info = (message?: any, thisParam?: any) => this.sink(thisParam, LogLevel.Info, message);
  public warn = (message?: any, thisParam?: any) => this.sink(thisParam, LogLevel.Warning, message);
  public error = (message?: any, thisParam?: any) => this.sink(thisParam, LogLevel.Error, message);
  public setLevel = (level: 0 | 1 | 2 | 3 | 4 | 5) => (this.logLevel = level);

  private sink(thisParam, level, message) {
    if (this.logLevel <= level) {
      const className = thisParam ? thisParam.__proto__.constructor.name : undefined;
      const logMessage = `[${LogLevel[level].toUpperCase()}] [${className}]: ${message}`;
      switch (level) {
        case LogLevel.Error: return console.error(logMessage);
        case LogLevel.Warning: return console.warn(logMessage);
        case LogLevel.Info: return console.info(logMessage);
        default: return console.log(logMessage);
      }
    }
  }
}
