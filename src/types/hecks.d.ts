import { Plugin } from "@hapi/hapi";
import { Application } from "express";

declare module "hecks" {
  export function toPlugin(
    handler: Application,
    name: string
  ): Plugin<Application>;
}
