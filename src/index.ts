import * as fs from "fs";
import * as path from "path";
import { isPlugin, IPlugin } from "./IPlugin";

//https://quachcuong.com/2019/09/26/typescipt-how-to-dynamic-import-anything-in-typescript/

async function getPlugns(): Promise<string[]> {
  return new Promise<string[]>((resolve, reject) => {
    let plugins: string[] = [];
    const pluginsRoot = path.join(__dirname, "/plugins");
    fs.readdirSync(pluginsRoot).forEach((f) => {
      const file = path.join(pluginsRoot, f);
      if (!fs.lstatSync(file).isDirectory()) {
        plugins.push(file);
      }
    });
    resolve(plugins);
  });
}

(async () => {
  (await getPlugns()).forEach(async (p) => {
    const modules = await import(p);
    const module = new modules.default();
    if (isPlugin(module)) {
      const plugin = module as IPlugin;
      plugin.log("Test");
    }
  });
})();
