import type { ProxyOptions } from "vite";
import { PROXY_HTTP } from "./index";

type ProxyTargetList = Record<
  string,
  ProxyOptions & { rewrite?: (path: string) => string }
>;

const httpsRE = /^https:\/\//;

export function createProxy() {
  const ProxyList: ProxyTargetList = {
    "/api": {
      target: PROXY_HTTP,
      changeOrigin: true,
      rewrite: (pre) => pre.replace(/^\/api/, ""), // 将 /api 重写为空
      // https is require secure=false
      ...(httpsRE.test(PROXY_HTTP) ? { secure: false } : {}),
    },
  };
  return ProxyList;
}
