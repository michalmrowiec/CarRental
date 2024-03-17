import { AboutUs } from "./components/AboutUs";
import { Vehicles } from "./components/Vehicles";
import { Home } from "./components/Home";
import { Join } from "./components/Join";
import { SignIn } from "./components/SignIn";
import User from "./components/User";

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
  },
  {
    path: '/SignIn',
    element: <SignIn />
  },
  {
    path: '/User',
    element: <User />
  }
];

export default AppRoutes;
