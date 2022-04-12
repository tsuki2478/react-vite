// import react from "@vitejs/plugin-react";
import legacy from "@vitejs/plugin-legacy"; // 支持旧浏览器
import reactRefresh from "@vitejs/plugin-react-refresh";
import type { Plugin } from "vite";
import viteCompression from "vite-plugin-compression";
import {
  APP_ANALYZE,
  APP_COMPRESS_GZIP,
  APP_COMPRESS_GZIP_DELETE_FILE,
  APP_LEGACY,
  APP_MOCK,
} from "../index";
import configMockPlugin from "./mock";
import configStyleImportPlugin from "./styleImport";
import configVisualizerPlugin from "./visualizer";

export function createVitePlugins(_: string, isBuild: boolean) {
  const vitePlugins: (Plugin | Plugin[])[] = [
    // react(),
    reactRefresh(),
  ];

  // vite-plugin-style-import
  vitePlugins.push(configStyleImportPlugin(isBuild));
  // @vitejs/plugin-legacy
  APP_LEGACY && isBuild && vitePlugins.push(legacy());
  // vite-plugin-mock
  APP_MOCK && vitePlugins.push(configMockPlugin(isBuild));
  // rollup-plugin-visualizer
  APP_ANALYZE && vitePlugins.push(configVisualizerPlugin());

  //vite-plugin-theme
  // vitePlugins.push(configThemePlugin(isBuild));

  if (isBuild) {
    APP_COMPRESS_GZIP &&
      vitePlugins.push(
        viteCompression({ deleteOriginFile: APP_COMPRESS_GZIP_DELETE_FILE })
      );
  }

  return vitePlugins;
}
