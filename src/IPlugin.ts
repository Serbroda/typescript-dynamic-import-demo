export abstract class IPlugin {
  abstract log(msq: string): void;
}

export const isPlugin = (obj: any): obj is IPlugin => {
  return (obj as IPlugin).log !== undefined;
};
