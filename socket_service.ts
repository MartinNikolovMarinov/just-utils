import * as autobahn from 'autobahn';
import { NetworkTransport, ConnectionProvider } from '@models/enums/ConnectionTypes';
import { User } from '@models/User';
import { SocketSession } from '@services/network/SocketSession';
import { AuthService } from '@services/auth/AuthService';
import connectionConfig from '@services/network/connection-config';
import { IdentityService } from '@services/auth/IdentityService';

declare global {
  namespace snow {
    interface ISocketService {
      open(props?: any): Promise<any>;
      close(): void;
      send?(type: 'publish', command: PublishCommand): Promise<ISocketResponse>;
      send?(type: 'call', command: CallCommand): Promise<ISocketResponse>;
      send?(type: 'subscribe' | 'subscribe-by-user', command: SubscribeCommand): Promise<ISocketResponse>;
      send?(type: 'unsubscribe' | 'unsubscribe-by-user', command: UnsubscribeCommand): Promise<ISocketResponse>;
    }

    interface ISocketResponse {
      isSuccessful: boolean;
      resp: any;
    }

    interface IRetryConnectionPolicy {
      retryCount: number;
      retryInterval: number;
    }

    interface IOpenConnectionOpts {
      url: string;
      realm: string;
      retryPolicy: snow.IRetryConnectionPolicy;
    }

    interface SubscribeCommand {
      topic: string;
      onResult: (args: any[], kwargs?: any) => void;
    }

    interface UnsubscribeCommand {
      topic: string;
    }

    interface PublishCommand {
      topic: string;
      data: any[];
    }

    interface CallCommand {
      procedure: string;
      params: any[];
      noSessionId?: boolean;
    }
  }
}

const ALREADY_OPENED = 'There is an already opened session. Close the current one before opening another.';
const NO_SESSION = 'Back-end connection has not been established yet. No session defined.';

export class SocketService implements snow.ISocketService {
  public session: SocketSession;
  public isConnected: boolean = false;

  private logger: snow.ILogger;
  private connection: autobahn.Connection;
  private authService: AuthService;
  private guard: snow.IGuard;
  private identity: IdentityService;

  constructor(core: jc.Core) {
    this.authService = core.getService('auth');
    this.logger = core.getService('logger');
    this.guard = core.getService('guard');
    this.identity = core.getService('identity');
  }

  public get getTransportInfo(): NetworkTransport { return NetworkTransport.WebSockets; }

  public get getName(): ConnectionProvider { return ConnectionProvider.Autobahn; }

  private get user(): User {
    return this.identity.currentUser;
  }

  public close(): void { this.connection.close(); }

  public open(): Promise<any> {
    this.guard.isUndefined(this.session, ALREADY_OPENED);
    const ret = this._open(<snow.IOpenConnectionOpts> {
      url: connectionConfig.buildUrl(window.location),
      realm: connectionConfig.realm,
      retryPolicy: { retryCount: 6, retryInterval: 1000 }
    });
    return ret;
  }

  public send(type: string, command: any): Promise<snow.ISocketResponse> {
    this.guard.isDefined(this.session, NO_SESSION);
    switch (type) {
      case 'publish': return this.handlePublish(command);
      case 'call': return this.handleCall(command);
      case 'subscribe': return this.handleSubscribe(command);
      case 'subscribe-by-user': return this.handleSubscribeByUser(command);
      case 'unsubscribe': return this.handleUnsubscribe(command);
      case 'unsubscribe-by-user': return this.handleUnsubscribeByUser(command);
      default: throw new Error('Invalid socket operation');
    }
  }

  private handleSubscribe(command: any): Promise<snow.ISocketResponse> {
    const subCommand = command as snow.SubscribeCommand;
    const ret = new Promise<snow.ISocketResponse>((resolve, reject) => {
      this.session.subscribe(subCommand.topic, subCommand.onResult)
        .then((value) => resolve(wrapResponse(value)))
        .catch((err) => {
          this.logger.error(err);
          reject(wrapError(err));
        });
    });
    return ret;
  }

  private handleSubscribeByUser(command: any): Promise<snow.ISocketResponse> {
    const subCommandWithUser = command as snow.SubscribeCommand;
    const ret = new Promise<snow.ISocketResponse>((resolve, reject) => {
      this.session.subscribe(`${this.user.sessionId}.${subCommandWithUser.topic}`, subCommandWithUser.onResult)
        .then((value) => resolve(wrapResponse(value)))
        .catch((err) => {
          this.logger.error(err);
          reject(wrapError(err));
        });
    });
    return ret;
  }

  private handleUnsubscribe(command: any): Promise<snow.ISocketResponse> {
    const unSubCommand = command as snow.UnsubscribeCommand;
    const ret = new Promise<snow.ISocketResponse>((resolve, reject) => {
      this.session.unsubscribe(unSubCommand.topic)
        .then((value) => resolve(wrapResponse(value)))
        .catch((err) => {
          this.logger.error(err);
          reject(wrapError(err));
        });
    });
    return ret;
  }

  private handleUnsubscribeByUser(command: any): Promise<snow.ISocketResponse> {
    const unSubCommand = command as snow.UnsubscribeCommand;
    const ret = new Promise<snow.ISocketResponse>((resolve, reject) => {
      this.session.unsubscribe(`${this.user.sessionId}.${unSubCommand.topic}`)
        .then((value) => resolve(wrapResponse(value)))
        .catch((err) => {
          this.logger.error(err);
          reject(wrapError(err));
        });
    });
    return ret;
  }

  private handlePublish(command: any): Promise<snow.ISocketResponse> {
    const pubCommand = command as snow.PublishCommand;
    const ret = new Promise<snow.ISocketResponse>((resolve, reject) => {
      this.session.publish(pubCommand.topic, pubCommand.data)
        .then((value) => resolve(wrapResponse(value)))
        .catch((err) => {
          this.logger.error(err);
          reject(wrapError(err));
        });
    });
    return ret;
  }

  private handleCall(command: any): Promise<snow.ISocketResponse> {
    const callCommand = command as snow.CallCommand;
    if (!callCommand.noSessionId) {
      if (!callCommand.params) callCommand.params = [this.user.sessionId];
      else callCommand.params.push(this.user.sessionId);
    }

    const ret = new Promise<snow.ISocketResponse>((resolve, reject) => {
      this.session.call(callCommand.procedure, callCommand.params)
        .then((value) => resolve(wrapResponse(value)))
        .catch((err) => {
          this.logger.error(err);
          reject(wrapError(err));
        });
    });
    return ret;
  }

  private _open(opts: snow.IOpenConnectionOpts): Promise<any> {
    this.logger.info('open connection is called', this);
    if (!opts.retryPolicy) {
      opts.retryPolicy = { retryCount: 6, retryInterval: 1000 };
    }

    this.connection = new autobahn.Connection({
      url: opts.url,
      realm: opts.realm,
      authmethods: ['ticket'],
      authid: this.user.sessionId,
      onchallenge: (session, method, extra) => this.onchallenge(session, method, extra),
    });

    // Notify BE that the browser window/tab was closed :
    addEventListener('beforeunload', (event) => this.close());
    const afterConnectionOpen = this.afterOpen(opts);
    this.connection.open();
    return afterConnectionOpen;
  }

  private onchallenge(session: autobahn.Session, method: string, extra: any): When.Promise<string> {
    if (method === 'ticket') {
      return this.authService.getToken();
    } else {
      return When.promise<string>((resolve, reject) => {
        this.logger.info("don't know how to authenticate with method: '" + method + "'");
        reject("don't know how to authenticate with method: '" + method + "'");
      });
    }
  }

  private afterOpen(opts: snow.IOpenConnectionOpts): Promise<any> {
    let attempts = 0;
    const ret = new Promise((resolve, reject) => {
      this.connection.onopen = (session: autobahn.Session, details) => {
        resolve();
        this.isConnected = true;
        this.session = new SocketSession(session);
        this.logger.info(`Connected to Crossbar ${details}`, this);
        attempts = opts.retryPolicy.retryCount; // Stop attempting after connection is opened.
      };
      this.connection.onclose = (reason: string, details: any): boolean => {
        this.isConnected = false;
        this.logger.info(`Crossbar connection closed ${reason}, ${details}.`, this);
        if (opts.retryPolicy.retryCount > attempts) {
          attempts++;
          setTimeout(() => this.connection.open(), opts.retryPolicy.retryInterval);
        } else {
          reject();
        }
        return true;
      };
    });

    return ret;
  }
}

function wrapResponse(value: any): snow.ISocketResponse {
  return <snow.ISocketResponse> {
    isSuccessful: true,
    resp: value
  };
}

function wrapError(err: any): snow.ISocketResponse {
  return <snow.ISocketResponse> {
    isSuccessful: false,
    resp: err
  };
}