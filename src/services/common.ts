import { get } from '@/utils/request';

// eslint-disable-next-line import/prefer-default-export
export const ApiGetUserInfo = (params?: any) =>
    get({
        path: '/user/info',
        data: params,
    });
