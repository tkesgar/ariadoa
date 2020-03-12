import { Request, Response, RequestHandler } from "express";

export type HandleFunction<T = void> = (
  req: Request,
  res: Response
) => T | Promise<T>;

export interface HandleOpts {
  isMiddleware?: boolean;
}

export default function handle<T = void>(
  fn: HandleFunction<T>,
  opts: HandleOpts = {}
): RequestHandler {
  const { isMiddleware = false } = opts;

  return (req, res, next): void => {
    (async (): Promise<void> => {
      const data = await fn(req, res);

      if (res.headersSent) {
        return;
      }

      if (isMiddleware) {
        next();
        return;
      }

      res.send(data);
    })().catch(next);
  };
}
