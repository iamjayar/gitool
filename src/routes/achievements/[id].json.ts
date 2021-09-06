import { resolve } from "path";
import { dev } from "$app/env";
import type { RequestHandler } from "@sveltejs/kit";

export const get: RequestHandler = async (request) => {
  const { default: data } = await import(
    dev ? resolve(`./src/routes/achievements/lib/${request.params.id}.json`) : `./lib/${request.params.id}.json`
  );
  return { body: data };
};
