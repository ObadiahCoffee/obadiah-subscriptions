import React, { createContext, useContext, useState } from 'react';

export const ThemeContext = createContext();

export function ThemeProvider({ children }) {
  const [cart, setCart] = useState(
    {
      boxes: '1',
      frequency: 'Weekly',
      location: 'United Kingdom',
      total: 12
    },
  );

  const values = {
    cart,
    setCart,
  };

  return <ThemeContext.Provider value={values}>{children}</ThemeContext.Provider>;
}
