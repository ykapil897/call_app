declare module "modesl" {
  export class Connection {
    constructor(
      host: string,
      port: number,
      password: string,
      callback?: () => void
    );

    api(command: string, cb?: (res: any) => void): void;

    bgapi(command: string, cb?: (res: any) => void): void;

    disconnect(): void;

    on(event: string, handler: (data: any) => void): void;
  }
}