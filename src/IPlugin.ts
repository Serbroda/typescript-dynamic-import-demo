export abstract class IPlugin {
  abstract log(msq: string): void;
  abstract loadFile(): string;
}

export const isPlugin = (obj: any): obj is IPlugin => {
  const p = obj as IPlugin;
  return p.log !== undefined && p.loadFile !== undefined;
};
