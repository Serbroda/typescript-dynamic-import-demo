import { IPlugin } from "../IPlugin";

export default class Plugin1 extends IPlugin {
  log(msq: string): void {
    console.log("Plugin1 " + msq);
  }

  log2(msq: string): void {
    console.log("Plugin1 " + msq);
  }
}

export class Plugin2 extends IPlugin {
  log(msq: string): void {
    console.log("Plugin1" + msq);
  }

  log2(msq: string): void {
    console.log("Plugin1" + msq);
  }
}

export function log(msg: string) {
  console.log(msg);
}
