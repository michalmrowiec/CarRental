import { AboutUs } from "./components/AboutUs";
import { Vehicles } from "./components/Vehicles";
import { VehiclesList } from "./components/VehiclesPage/VehiclesList"
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
        path: '/vehiclesList',
        element: <VehiclesList />
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
