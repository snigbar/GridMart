import { useState } from "react";
import Router from "./Router/Router";
import publicRoutes from "./Router/Routes/PublicRoutes";

function App() {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [allRoutes, setAllRoutes] = useState([...publicRoutes]);
  return <Router allRoutes={allRoutes} />;
}

export default App;
