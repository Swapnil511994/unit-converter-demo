import { Button } from "primereact/button";
import { Column } from "primereact/column";
import { TreeTable } from "primereact/treetable";
import { memo } from "react";

const UnitsContainer = memo((props) => {
  const units = props?.units ? props.units : [];
  const baseUnits = props?.baseUnits || [];
  console.log(baseUnits);

  //template functions
  const parentValueTemplate = (rowData) => {
    let parentName = "";

    if (rowData.value) {
      for (let i = 0; i < baseUnits.length; i++) {
        const unit = baseUnits[i];
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

  return (
    <>
      <h2>Units</h2>
      <TreeTable value={units} size="small">
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
        <Column
          header="Action"
          body={actionButtonsTemplate}
          style={{ width: "150px", maxWidth: "150px" }}
        ></Column>
      </TreeTable>
    </>
  );
});
UnitsContainer.displayName = "UnitsContainer";

export default UnitsContainer;
