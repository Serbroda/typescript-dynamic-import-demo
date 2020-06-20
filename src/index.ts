import * as fs from "fs";
import * as path from "path";
import { getPlugins } from "./PluginLoader";

//https://quachcuong.com/2019/09/26/typescipt-how-to-dynamic-import-anything-in-typescript/

(async () => {
  const pluginsRoot = path.join(__dirname, "/plugins");
  const plugins = await getPlugins(pluginsRoot);
  console.log("Plugins loaded: ", plugins);

  console.log("Calling log() function on each loaded plugin");
  console.log("------------------------------------------------------------");
  plugins.forEach((p) => {
    p.log();
  });
})();
