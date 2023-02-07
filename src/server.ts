import express, { Application } from 'express';
import cors from 'cors';
import { authorRouter } from './author/index';
import { bookRouter } from './book/index';
import { Injectable } from 'magnodi';
import helmet from 'helmet';
import compression from 'compression';

@Injectable()
export class Server {
  server: Application;
  PORT: number;
  constructor() {
    this.server = express();
    this.PORT = parseInt(process.env.PORT as string, 10);
  }

  public createServer(): void {
    this.server.listen(this.PORT);
    console.log(`server listening on: ${this.PORT}`);
  }

  public initializeMiddlewares(): void {
    this.server.use(cors());
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
    this.server.use('/api/authors', authorRouter);
    this.server.use('/api/books', bookRouter);
  }
}

@Injectable()
export class Run {
  constructor(private server: Server) {}

  public executeAll(): void {
    this.server.initializeMiddlewares();
    this.server.routers();
    this.server.createServer();
  }
}
