export abstract class IPlugin {
  abstract log(): void;
}

export const isIPlugin = (obj: any): obj is IPlugin => {
  const p = obj as IPlugin;
  return p.log !== undefined;
};
