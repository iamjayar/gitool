import { resolve } from "path";
import type { RequestHandler } from "@sveltejs/kit";

export const get: RequestHandler = async (request) => {
  const { default: data } = await import(resolve("./src/routes/achievements/lib", `${request.params.id}.json`));
  return { body: data };
};
