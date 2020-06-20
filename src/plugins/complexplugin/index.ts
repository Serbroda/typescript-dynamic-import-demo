import { IPlugin } from "../../IPlugin";
import { readFileSync } from "fs";
import { join } from "path";

export default class ComplexPlugin extends IPlugin {
  log(): void {
    console.log(
      "Im a complex plugin and I load files. Content of test.txt is:"
    );
    console.log(this.loadFile());
  }

  loadFile(): string {
    return readFileSync(join(__dirname, "/test.txt"), {
      encoding: "utf8",
      flag: "r",
    });
  }
}
