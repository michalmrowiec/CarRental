import { AboutUs } from "./components/AboutUs";
import { Vehicles } from "./components/Vehicles";
import { Home } from "./components/Home";

const AppRoutes = [
  {
    index: true,
    element: <Home />
  },
  {
    path: '/AboutUs',
    element: <AboutUs />
  },
  {
    path: '/vehicles',
    element: <Vehicles />
  }
];

export default AppRoutes;
