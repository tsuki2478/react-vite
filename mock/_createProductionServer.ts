import { createProdMockServer } from 'vite-plugin-mock/es/createProdMockServer';

import data from './data';
export function setupProdMockServer() {
  createProdMockServer([...data]);
}
