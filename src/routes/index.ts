import { useRoutes } from 'react-router-dom';

import routeList from '@/routes/route';

const useRouteList = () => {
    const routes = useRoutes(routeList);
    return routes;
};

export default useRouteList;
