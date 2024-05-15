// import { AboutUs } from "./components/AboutUs";
import { AboutUs } from "./components/LandingPage/AboutUs";
import { Vehicles } from "./components/Vehicles";
import { VehiclesList } from "./components/VehiclesPage/VehiclesList"
import { Home } from "./components/LandingPage/Home";
import { Join } from "./components/Join";
import { SignIn } from "./components/SignIn";
import User from "./components/User";
import { AddVehicle } from "./components/VehiclesPage/AddVehicle";

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
    },
    {
        path: '/AddVehicle',
        element: <AddVehicle />
    }
];

export default AppRoutes;
