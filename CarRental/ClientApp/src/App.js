import React from 'react';
import { Route, Routes } from 'react-router-dom';
import AppRoutes from './AppRoutes';
import { Layout } from './components/Layout';
import './custom.css';
import { UserProvider } from './context/UserContext'; // Zaimportuj UserProvider
import { VehicleProvider } from './context/VehicleContext'; // Zaimportuj VehicleProvider
import { ReservationProvider } from './context/ReservationContext'; 



const App = () => {
  return (
    <UserProvider> {/* Dodaj UserProvider */}
    <ReservationProvider>
      <VehicleProvider> 
        <Layout>
          <Routes>
            {AppRoutes.map((route, index) => {
              const { element, ...rest } = route;
              return <Route key={index} {...rest} element={element} />;
            })}
          </Routes>
        </Layout>
      </VehicleProvider>
      </ReservationProvider>
    </UserProvider> 
  );
};

export default App;
