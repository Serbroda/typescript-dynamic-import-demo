import * as fs from "fs";
import * as path from "path";
import { isPlugin, IPlugin } from "./IPlugin";

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
    // console.log(plugin);
    /*for (let bla in plugin) {
      console.log("bla", bla == "Plugin2");
      if (bla == "Plugin2") {
        console.log("Plugin2", plugin[bla]);
        console.log("Plugin2 test", new plugin[bla]().log("AAAAA"));
      }
    }*/
    //console.log(pluginult, isPlugin(plugin.default));
    //console.log(plugin.log);
  });
})();
