import { isIP } from "net";
const config = require("config");

export const PORT: number = config.get("network.port") || 3005;

let URL: string = `${config.get("network.protocol") ?? "http"}://`;
if (process.env.NODE_ENV === "development") {
  URL += `localhost:${PORT}`;
} else if (process.env.NODE_ENV === "production") {
  // 两种方式,以环境变量方式优先
  const ipOrDomain = process.env.IP_OR_DOMAIN || config.get("network.ipOrDomain");
  if (isIP(ipOrDomain) || ipOrDomain === "localhost") {
    URL += `${ipOrDomain}:${PORT}`;
  } else {
    URL += ipOrDomain;
  }
}

export const BASE_URL = URL;