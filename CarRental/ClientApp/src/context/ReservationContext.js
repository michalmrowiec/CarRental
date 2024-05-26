import React, { createContext, useState } from 'react';

export const ReservationContext = createContext();

export const ReservationProvider = ({ children }) => {
  const [selectedDate, setSelectedDate] = useState(null);

  return (
    <ReservationContext.Provider value={{ selectedDate, setSelectedDate }}>
      {children}
    </ReservationContext.Provider>
  );
};
