export abstract class Options {
  constructor(protected PORT: number, protected PREFIX: string) {
    this.PORT = Number(process.env.PORT);
    this.PREFIX = process.env.PREFIX as string;
  }
}
