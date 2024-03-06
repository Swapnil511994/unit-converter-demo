//Styling
import "primereact/resources/themes/bootstrap4-light-purple/theme.css";
import "/node_modules/primeflex/primeflex.css";
import "primeicons/primeicons.css";
import "./App.css";

//Imports
import { Card } from "primereact/card";
import Menu from "./Menu";
import { useState } from "react";
import UnitsContainer from "./UnitsContainer";
import { createTreeStructureFromUnits } from "../helpers/baseUnits";
import { useUnits } from "./contexts/UnitsContext/useUnits";

function App() {
  //state functions and other variables
  const { units } = useUnits();

  const trees = createTreeStructureFromUnits(units);

  return (
    <Card header={<Menu />} className="min-h-screen">
      <UnitsContainer units={trees}></UnitsContainer>
    </Card>
  );
}

export default App;
