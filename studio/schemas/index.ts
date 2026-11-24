import { client } from "./client";
import { film } from "./film";
import { project } from "./project";
import { settings } from "./settings";

export const schemaTypes = [settings, project, film, client];

export const singletonTypes = new Set(["settings"]);
