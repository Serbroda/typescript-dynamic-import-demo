export abstract class IPlugin {
  abstract log(msq: string): void;
  abstract log2(msq: string): void;
}

export const isPlugin2 = (obj: any): boolean => {
  return obj instanceof IPlugin;
};

export const isPlugin = (obj: any): obj is IPlugin => {
  return (obj as IPlugin).log !== undefined;
};
