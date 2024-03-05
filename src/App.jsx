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
import AddEditUnitDialog from "./AddEditUnitDialog";
import { baseUnits, createTreeStructureFromUnits } from "../helpers/baseUnits";

function App() {
  //state functions and other variables
  const [units, setUnits] = useState(baseUnits || []);
  const [selectedUnit, setSelectedUnit] = useState(null);
  const [isAddEditUnitDialogVisible, setIsAddEditUnitDialogVisible] =
    useState(false);

  //functions
  const handleAddEditUnitDialogClose = (unit = null) => {
    setSelectedUnit(null);
    setIsAddEditUnitDialogVisible(false);
    try {
      if (unit && unit.unitId > 0) {
        const unitsArr = units;
        const unitIndex = unitsArr.findIndex(
          (unitObj) => unitObj.unitId === unit.unitId
        );
        if (unitIndex > -1) {
          unitsArr[unitIndex] = unit;
        } else {
          unitsArr.push(unit);
        }
        setUnits(unitsArr);
      } else {
        //do nothing
      }
    } catch (error) {}
  };

  const trees = createTreeStructureFromUnits(units);
  console.log(trees);

  return (
    <>
      <AddEditUnitDialog
        baseUnits={units}
        unit={selectedUnit}
        isVisible={isAddEditUnitDialogVisible}
        handleClose={handleAddEditUnitDialogClose}
      ></AddEditUnitDialog>
      <Card header={<Menu />} className="min-h-screen">
        <UnitsContainer baseUnits={units} units={trees}></UnitsContainer>
      </Card>
    </>
  );
}

export default App;
