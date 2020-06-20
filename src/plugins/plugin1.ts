import { IPlugin } from "../IPlugin";
import { readFileSync } from "fs";
import { join } from "path";

export default class Plugin1 extends IPlugin {
  loadFile(): string {
    return readFileSync(join(__dirname, "/test.txt"), {
      encoding: "utf8",
      flag: "r",
    });
  }
  log(msq: string): void {
    console.log("Plugin1 " + msq);
  }
}
