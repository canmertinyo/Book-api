import express, { Application } from 'express';
import cors from 'cors';
import { AuthorRouters, bookRouter, registerRouter } from './routers/index';
import { Injectable } from 'magnodi';
import helmet from 'helmet';
import compression from 'compression';
import { Options } from './common/interfaces/server.options';

@Injectable()
export class Server extends Options {
  protected server: Application;

  constructor(public authorRouters: AuthorRouters) {
    super();
    this.server = express();
  }

  public createServer(): void {
    this.server.listen(this.PORT);
    console.log(`server listening on: ${this.PORT}`);
  }

  public initializeMiddlewares(): void {
    this.server.use(cors({}));
    this.server.use(express.json());
    this.server.use(
      helmet({
        referrerPolicy: { policy: 'no-referrer' },
        contentSecurityPolicy: true,
      })
    );
    this.server.use(compression({ level: 6 }));
  }
  public routers(): void {
    this.server.use(`${this.PREFIX}authors`, this.authorRouters.authorRouter);
    this.server.use(`${this.PREFIX}books`, bookRouter);
    this.server.use(`${this.PREFIX}signup`, registerRouter);
  }
}

@Injectable()
export class Run {
  constructor(private readonly server: Server) {}

  public executeAll(): void {
    this.server.initializeMiddlewares();
    this.server.routers();
    this.server.createServer();
  }
}
