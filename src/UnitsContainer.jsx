import { Button } from "primereact/button";
import { Column } from "primereact/column";
import { TreeTable } from "primereact/treetable";
import { memo, useRef, useState } from "react";
import AddEditUnitDialog from "./AddEditUnitDialog";
import { useUnits } from "./contexts/UnitsContext/useUnits";
import { Toast } from "primereact/toast";

const UnitsContainer = memo((props) => {
  const [selectedUnit, setSelectedUnit] = useState(null);
  const [isAddEditUnitDialogVisible, setIsAddEditUnitDialogVisible] =
    useState(false);

  const unitsToDisplay = props?.units ? props.units : [];
  const { units } = useUnits();
  const toast = useRef(null);

  //template functions
  const parentValueTemplate = (rowData) => {
    let parentName = "";

    if (rowData.value) {
      for (let i = 0; i < units.length; i++) {
        const unit = units[i];
        if (unit.unitId === rowData.parentUnitId) {
          parentName = unit.value;
          break;
        }
      }
    } else parentName = rowData.value;
    return parentName;
  };

  const actionButtonsTemplate = (rowData) => {
    if (rowData?.unitId >= 0) {
      return (
        <>
          <Button
            severity="danger"
            size="small"
            icon="pi pi-trash"
            className="m-1"
            onClick={() => {}}
            text
          ></Button>
          <Button
            severity="primary"
            size="small"
            icon="pi  pi-file-edit"
            className="m-1"
            onClick={() => {}}
            text
          ></Button>
        </>
      );
    }
  };

  //functions
  const handleAddEditUnitDialogClose = (unit = null) => {
    setSelectedUnit(null);
    setIsAddEditUnitDialogVisible(false);
    if (unit?.unitId >= 0) {
      showAlert("success", "Information", "Operation Success", 1500);
    }
  };

  const showAlert = (severity, summary, message = "", lifetime = 3000) => {
    toast.current.show({
      severity: severity,
      summary: summary,
      detail: message,
      lifetime: lifetime,
    });
  };

  return (
    <>
      <Toast ref={toast}></Toast>
      <div className="flex flex-row mb-1">
        <h2 className="m-0 p-0">Units</h2>
      </div>

      <AddEditUnitDialog
        unit={selectedUnit}
        isVisible={isAddEditUnitDialogVisible}
        handleClose={handleAddEditUnitDialogClose}
      ></AddEditUnitDialog>

      <TreeTable value={unitsToDisplay} size="small">
        <Column
          field="name"
          header="Name"
          style={{ width: "150px", maxWidth: "150px" }}
          expander
        ></Column>
        <Column
          field="value"
          header="Value"
          body={parentValueTemplate}
          style={{ width: "120px", maxWidth: "120px" }}
        ></Column>
        <Column
          field="isFractionable"
          header="Fractionable"
          style={{ width: "100px", maxWidth: "100px" }}
        ></Column>
      </TreeTable>
    </>
  );
});
UnitsContainer.displayName = "UnitsContainer";

export default UnitsContainer;
