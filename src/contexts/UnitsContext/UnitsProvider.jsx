import { createContext, useState, useContext } from "react";
import { baseUnits } from "../../../helpers/baseUnits";

export const UnitsContext = createContext();

export default function UnitsProvider({ children }) {
  const [units, setUnits] = useState(baseUnits);

  const updateUnits = (newUnits) => {
    setUnits(newUnits);
  };

  return (
    <UnitsContext.Provider value={{ units, updateUnits }}>
      {children}
    </UnitsContext.Provider>
  );
}
