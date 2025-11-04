declare module "bcryptjs" {
  export function compare(s: string, hash: string): Promise<boolean>;

  export function compareSync(s: string, hash: string): boolean;

  export function hash(s: string, salt: number): Promise<string>;

  export function hashSync(s: string, salt: number): string;
}
