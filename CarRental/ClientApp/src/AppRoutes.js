import { AboutUs } from "./components/AboutUs";
import { Vehicles } from "./components/Vehicles";
import { Home } from "./components/Home";
import { Join } from "./components/Join";


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
  },
  {
    path: '/Join',
    element: <Join />
  }
];

export default AppRoutes;
