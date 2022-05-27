import { IncomingMessage, ServerResponse } from "http";

type AllowedMethods = "GET" | "POST" | "PUT" | "DELETE" | "PATCH" | "HEAD" | "OPTIONS";

export type Interceptor = (
  buffer: Buffer,
  proxyRes: IncomingMessage,
  req: IncomingMessage,
  res: ServerResponse,
) => Promise<Buffer | string>;

export type AssignToBody = Record<string, any>;

export interface IResolver {
  paramAmountFilter: number;
}

export interface IRequestTarget {
  endpoint: string;
  method: AllowedMethods;
  assign: AssignToBody;
  resolveByStart?: IResolver;
}

export type RequestTargets = IRequestTarget[];
