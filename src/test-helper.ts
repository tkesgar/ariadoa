import Hapi, {
  Server,
  ServerInjectOptions,
  ServerInjectResponse,
} from "@hapi/hapi";
import Hecks from "hecks";
import express, { RequestHandler, ErrorRequestHandler } from "express";

export type Middleware = RequestHandler | ErrorRequestHandler;

export async function createTestServer(
  ...middlewares: Middleware[]
): Promise<Server> {
  const app = express();

  app.use(middlewares);

  const server = new Hapi.Server();
  await server.register(Hecks.toPlugin(app, "express-app"));

  return server;
}

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
