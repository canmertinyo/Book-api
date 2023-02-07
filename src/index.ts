import * as dotenv from 'dotenv';
import { Container } from 'magnodi';
import { Run } from './server';

const server = Container.resolve<Run>(Run);

dotenv.config();

if (!process.env.PORT) {
  process.exit(1);
}
server.executeAll();
