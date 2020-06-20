import * as fs from "fs";
import * as path from "path";
import { isIPlugin, IPlugin } from "./IPlugin";

export interface PluginFile {
  name: string;
  entry: string;
}

function isConstructor(f: any) {
  try {
    new f();
  } catch (err) {
    return false;
  }
  return true;
}

export const getPlugins = async (root: string): Promise<IPlugin[]> => {
  return new Promise<IPlugin[]>((resolve, reject) => {
    const pluginFiles = getPluginFiles(root);
    const plugins: IPlugin[] = [];

    pluginFiles.forEach(async (p) => {
      const modules = await import(p.entry);

      if (isConstructor(modules.default)) {
        const module = new modules.default();
        if (isIPlugin(module)) {
          plugins.push(module as IPlugin);
        }
      }
    });

    resolve(plugins);
  });
};

export const getPluginFiles = (root: string): PluginFile[] => {
  let pluginFiles: PluginFile[] = [];
  loadPluginFilesRecursive(root, 0, pluginFiles);
  return pluginFiles;
};

const loadPluginFilesRecursive = (
  filePath: string,
  level: number,
  pluginsFiles: PluginFile[]
) => {
  if (fs.existsSync(filePath)) {
    fs.readdirSync(filePath).forEach((file, index) => {
      if (level > 1) {
        return;
      }

      const curPath = path.join(filePath, file);
      const isDirectory = fs.lstatSync(curPath).isDirectory();

      if (isDirectory && level == 0) {
        loadPluginFilesRecursive(curPath, level + 1, pluginsFiles);
      } else if (!file.endsWith(".js")) {
        return;
      } else if (level == 0 && file.endsWith(".js")) {
        pluginsFiles.push({
          name: file.slice(0, -3),
          entry: curPath,
        });
      } else if (level == 1 && file == "index.js") {
        pluginsFiles.push({
          name: path.basename(path.dirname(curPath)),
          entry: curPath,
        });
      }

      /*if (fs.lstatSync(curPath).isDirectory() && level == 0) {
        loadPluginFilesRecursive(curPath, level++, pluginsFiles);
      } else if (level == 0 && file.endsWith(".js")) {
        pluginsFiles.push({
          name: file,
          entry: curPath,
        });
      } else if (level == 1 && file == "index.js") {
        pluginsFiles.push({
          name: file,
          entry: curPath,
        });
      } else if (level > 1) {
        return;
      }*/
    });
  }
};
