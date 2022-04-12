import styleImport from 'vite-plugin-style-import';

export default function configStyleImportPlugin(isBuild: boolean) {
  if (!isBuild) return [];
  return styleImport({
    libs: [
      {
        libraryName: 'antd',
        esModule: true,
        resolveStyle: (name) => {
          return `antd/es/${name}/style/index`;
        },
      },
    ],
  });
}
