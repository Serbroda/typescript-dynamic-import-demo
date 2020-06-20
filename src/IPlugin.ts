export abstract class IPlugin {
  abstract log(msq: string): void;
}

export const isPlugin = (obj: any): obj is IPlugin => {
  const p = obj as IPlugin;
  return p.log !== undefined;
};
