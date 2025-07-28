import { useState } from "react";
import Router from "./Router/Router";
import publicRoutes from "./Router/Routes/PublicRoutes";

function App() {
  const [allRoutes, setAllRoutes] = useState([...publicRoutes]);
  return <Router allRoutes={allRoutes} />;
}

export default App;
