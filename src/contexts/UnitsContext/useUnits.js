import { useContext } from "react";
import { UnitsContext } from "./UnitsProvider";

export const useUnits = () => {
  const context = useContext(UnitsContext);
  if (context === undefined) {
    throw new Error("useUnits must be defined within a UnitsProvider");
  }

  return context;
};
