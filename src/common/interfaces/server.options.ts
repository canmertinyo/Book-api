export abstract class Options {
  protected PORT: number;
  protected PREFIX: string;
  constructor() {
    this.PORT = Number(process.env.PORT);
    this.PREFIX = process.env.PREFIX as string;
  }
}
