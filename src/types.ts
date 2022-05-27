import { IncomingMessage, ServerResponse } from "http";

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
  method: string;
  assign: AssignToBody;
  resolveByStart?: IResolver;
}

export type RequestTargets = IRequestTarget[];
