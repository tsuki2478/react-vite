import dayjs from 'dayjs';
import path from 'path';
import type { ConfigEnv, UserConfig } from 'vite';
import { defineConfig } from 'vite';

import { BASE_PATH, DROP_CONSOLE, PORT } from './config';
import { createVitePlugins } from './config/plugins';
import { createProxy } from './config/proxy';
import { themeVariables } from './config/theme';
import pkg from './package.json';

const { dependencies, devDependencies, name, version } = pkg;
const __APP_INFO__ = {
    pkg: { dependencies, devDependencies, name, version },
    lastBuildTime: dayjs().format('YYYY-MM-DD HH:mm:ss'),
};

// https://vitejs.dev/config/
export default ({ command, mode }: ConfigEnv): UserConfig => {
    const isBuild = command === 'build';
    console.log({ command, mode });

    return {
        plugins: createVitePlugins(mode, isBuild),
        base: BASE_PATH,
        // 默认解析样式--
        css: {
            preprocessorOptions: {
                less: {
                    javascriptEnabled: true,
                    modifyVars: themeVariables,
                },
            },
        },
        //  快捷别名
        resolve: {
            alias: [
                { find: '@', replacement: path.resolve(__dirname, 'src') },
                { find: '@config', replacement: path.resolve(__dirname, 'config') },
                { find: '@servers', replacement: path.resolve(__dirname, 'src/servers') },
                { find: '@hooks', replacement: path.resolve(__dirname, 'src/hooks') },
                { find: '@components', replacement: path.resolve(__dirname, 'src/components') },
                { find: '@style', replacement: path.resolve(__dirname, 'src/style') },
                { find: '@assets', replacement: path.resolve(__dirname, 'src/assets') },
                { find: '@utils', replacement: path.resolve(__dirname, 'src/utils') },
            ],
        },
        // 服务配置
        server: {
            host: true,
            port: PORT, // 开发环境启动的端口
            proxy: createProxy(),
        },
        // 构建配置
        build: {
            terserOptions: {
                compress: {
                    keep_infinity: true,
                    drop_console: DROP_CONSOLE,
                },
            },
            cssCodeSplit: true,
            // 构建最大限制
            chunkSizeWarningLimit: 2000,
            outDir: 'dist', //指定输出路径
            rollupOptions: {
                output: {
                    // manualChunks(id) {
                    //     if (id.includes('node_modules')) {
                    //         return id.toString().split('node_modules/')[1].split('/')[0].toString();
                    //     }
                    // },
                    manualChunks: {
                        antd: ['antd'],
                        react: ['react'],
                        lodash: ['lodash'],
                        'react-dom': ['react-dom'],
                        '@ant-design/icons': ['@ant-design/icons'],
                    },
                    chunkFileNames: 'static/[name]-[hash].js',
                    entryFileNames: 'static/[name]-[hash].js',
                    assetFileNames: 'static/[name]-[hash].[ext]',
                },
            },
        },
        define: {
            'process.env': {},
            // 设置应用信息
            __APP_INFO__: JSON.stringify(__APP_INFO__),
        },
    };
};
