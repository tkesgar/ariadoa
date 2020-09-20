import * as Hapi from "@hapi/hapi";
import Hecks from "hecks";
import express, { RequestHandler, ErrorRequestHandler } from "express";

export type Server = Hapi.Server;

export type ServerInjectOptions = Hapi.ServerInjectOptions;

export type ServerInjectResponse = Hapi.ServerInjectResponse;

export type Middleware = RequestHandler | ErrorRequestHandler;

/**
 * Given a list of middlewares, create a hapi `Server` instance with
 * the express middlewares mounted. The resulting server then can be injected
 * with different requests each time.
 *
 * @param  middlewares  A list of middlewares to be added into the server.
 */
export async function createTestServer(
  ...middlewares: Middleware[]
): Promise<Server> {
  const app = express();

  app.use(middlewares);

  const server = new Hapi.Server();
  await server.register(Hecks.toPlugin(app, "express-app"));

  return server;
}

/**
 * Given a list of middlewares, create an app with the middlewares and inject
 * with a request. The returned object is a `ServerInjectResponse` that
 *
 * By default the request `url` is `/`.
 *
 * @param  middlewares    A list of middlewares to be added into the app.
 * @param  injectRequest  The request to be injected.
 */
export async function createTestResponse(
  middlewares: Middleware[],
  injectRequest: Partial<ServerInjectOptions> = {}
): Promise<ServerInjectResponse> {
  const server = await createTestServer(...middlewares);
  return server.inject({
    url: "/",
    ...injectRequest,
  });
}
