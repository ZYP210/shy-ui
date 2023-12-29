import { Meta2d, Pen } from "@meta2d/core";
declare global {
  var meta2d: Meta2d;
  var C2S: any;
  declare type Nullable<T> = T | null;
  declare type Recordable<T = any> = Record<string, T>;
  declare type Pen = Pen;
  declare type Meta2d = Meta2d;
}

