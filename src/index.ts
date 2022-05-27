import express, { Application } from "express";
import {
  createProxyMiddleware,
  responseInterceptor,
} from "http-proxy-middleware";
import { IResolver, Interceptor } from "./types";
import { config } from "dotenv";
import targets from "./targets";
import cors from "cors";

// get arguments from command line

config();
const port = process.env.PROXY_PORT || 3001;
const proxyBaseUrl = process.env.PROXY_BASE_URL || "http://localhost:3000";

const app: Application = express();

app.use(cors());

const interceptor: Interceptor = async (buffer, _proxyRes, req, _res): Promise<string | Buffer> => {
  console.log(`[${req.method}] ${req.url}`);

  // filter target

  const target = targets.find((t) => {
    if (t.resolveByStart !== undefined) {
      const { paramAmountFilter } = t.resolveByStart as IResolver;
      const params = (req.url as string).replace(t.endpoint, "");
      const paramAmount = params.split("/").length - 1;
      console.log(`paramAmount: ${paramAmount}`);
      return paramAmount === paramAmountFilter &&
        req.method === t.method &&
        (req.url as string).startsWith(t.endpoint);
    }
    return t.endpoint === req.url && t.method === req.method;
  });

  if (!target) return buffer;

  // end of response

  const responsePromise = new Promise<string | Buffer>((resolve) => {
    try {
      const bodyToModify = Object.assign(
        JSON.parse(buffer.toString()),
        target.assign,
      );
      resolve(JSON.stringify(bodyToModify));
    } catch (e) {
      console.log(e);
      resolve(buffer);
    }
  });

  // send modified response

  console.log("Response modified with: \n", target.assign);
  return responsePromise;
}

app.use(createProxyMiddleware({
  target: proxyBaseUrl,
  changeOrigin: true,
  selfHandleResponse: true,
  on: {
    proxyRes: responseInterceptor(interceptor),
  },
}));

app.listen(port, () => {
  console.log(`Server listening on port ${port}`);
});
