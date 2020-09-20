# @tkesgar/ariadoa

[![Build Status](https://travis-ci.org/tkesgar/ariadoa.svg?branch=master)](https://travis-ci.org/tkesgar/ariadoa)

> See? No problem, right?

ariadoa provides a utility function `createTestResponse` that can be used for
testing Express apps, routers, or middlewares:

```ts
import { createTestResponse } from "@tkesgar/ariadoa";

it("should send data from fn", async () => {
  const { status, payload } = await createTestResponse([
    (req, res) => {
      res.send({ foo: "bar" });
    },
  ]);

  expect(status).toBe(200);
  expect(JSON.parse(payload)).toEqual({
    status: "success",
    data: { foo: "bar" },
  });
});
```

It is a convenience wrapper with typings for the excellent [hecks][hecks]
library.

## Installation

```
npm install @tkesgar/ariadoa --save-dev
```

## Usage

### createTestResponse

Given a list of middlewares, create an app with the middlewares and inject with
a request.

Please refer to [hapi Server.inject() docs][hapi-inject] for further
details of the request options and response object. Note that
`createTestResponse` sets the request URL to `/` by default.

```ts
import { createTestResponse } from "@tkesgar/ariadoa";

const response = await createTestResponse([
  (req, res) => {
    res.send({ foo: "bar", baz: 123 });
  },
]);

console.log(response.status);
// > 200

console.log(response.payload);
// > '{"foo":"bar","baz":123}'
```

### createTestServer

Given a list of middlewares, create a hapi `Server` instance with the Express
middlewares mounted. The resulting server then can be injected with different
requests each time.

This is the same function used by `createTestResponse` to create a server. You
might want to use this function to manually create the server instance, if
creating the server is particularly expensive.

Please refer to [hapi Server docs][hapi-server] for further details of the
server object.

## Contribute

Feel free to [send issues][issues] or [create pull requests][pulls].

## License

Licensed under MIT License.

[hapi-inject]: https://hapi.dev/api/#-await-serverinjectoptions
[hapi-server]: https://hapi.dev/api/#server
[hecks]: https://github.com/hapipal/hecks
[issues]: https://github.com/tkesgar/ariadoa/issues
[pulls]: https://github.com/tkesgar/ariadoa/pulls
