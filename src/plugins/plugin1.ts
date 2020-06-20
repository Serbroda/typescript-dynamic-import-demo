import { IPlugin } from "../IPlugin";
import { readFileSync } from "fs";
import { join } from "path";

export default class Plugin1 extends IPlugin {
  log(): void {
    console.log("Plugin1 console log");
  }
}
