import { IPlugin } from "../IPlugin";

export default class Plugin1 extends IPlugin {
  log(msq: string): void {
    console.log("Plugin1 " + msq);
  }
}
