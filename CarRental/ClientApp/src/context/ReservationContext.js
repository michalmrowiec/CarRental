import React, { createContext, useState } from 'react';

export const ReservationContext = createContext();

export const ReservationProvider = ({ children }) => {
  const [selectedDate, setSelectedDate] = useState(null);
  const [reservations, setReservations] = useState([]);

  return (
    <ReservationContext.Provider value={{ selectedDate, setSelectedDate, reservations, setReservations }}>
      {children}
    </ReservationContext.Provider>
  );
};
