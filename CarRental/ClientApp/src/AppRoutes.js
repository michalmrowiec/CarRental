import { AboutUs } from "./components/LandingPage/AboutUs";
import VehiclesList  from "./components/VehiclesPage/VehiclesList"
import { Home } from "./components/LandingPage/Home";
import { Join } from "./components/Join";
import { SignIn } from "./components/SignIn";
import User from "./components/User";
import AddVehicle  from "./components/VehiclesPage/AddVehicle";
import AddVehicleImage  from "./components/VehiclesPage/AddVehicleImage";
import MenageVehiclesList from "./components/VehiclesPage/MenageVehiclesList";
import VehicleMain from "./components/VehiclesPage/VehicleMain";
import EditVehicle from "./components/VehiclesPage/EditVehicle";
import RentalSummary from "./components/RentalsPage/RentalSummary";
import RentalList  from "./components/RentalsPage/RentalList";


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
    },
    {
        path: '/AddVehicleImage',
        element: <AddVehicleImage />
    },{
        path: '/MenageVehiclesList',
        element: <MenageVehiclesList />
    },{
        path: '/VehicleMain',
        element: <VehicleMain />
    },{
        path: '/EditVehicle',
        element: <EditVehicle />
    }, {
        path: '/RentalSummary',
        element: <RentalSummary />
    }, {
        path: '/RentalList',
        element: <RentalList />
    }
];

export default AppRoutes;
