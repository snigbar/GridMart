import { useRoutes, type RouteObject } from "react-router-dom";

const Router = ({ allRoutes }: { allRoutes: RouteObject[] }) => {
  const routes = useRoutes(allRoutes);
  return routes;
};

export default Router;
