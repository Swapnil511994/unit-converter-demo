import { Dialog } from "primereact/dialog";
import { useFormik } from "formik";
import { useEffect, useRef } from "react";
import * as Yup from "yup";
import { Dropdown } from "primereact/dropdown";
import { useUnits } from "./contexts/UnitsContext/useUnits";
import { InputText } from "primereact/inputtext";
import { InputNumber } from "primereact/inputnumber";
import { Checkbox } from "primereact/checkbox";
import { Button } from "primereact/button";

export default function AddEditUnitDialog(props) {
  const { units, updateUnits } = useUnits();
  const unit = props.unit;
  const selectedUnit = useRef(null);

  const formik = useFormik({
    initialValues: {
      unitId: Date.now(),
      name: "",
      parentUnitId: null,
      isFractionable: false,
      value: 0,
    },
    validationSchema: Yup.object().shape({}),
    onSubmit: async (values) => {
      const existingUnitIndex = units.findIndex(
        (unitObj) => unitObj.unitId === formik.values.unitId
      );

      const unitsToAdd = [...units];

      if (existingUnitIndex >= 0) {
        //update
        unitsToAdd[existingUnitIndex].value = values.value;
        unitsToAdd[existingUnitIndex].name = values.name;
        unitsToAdd[existingUnitIndex].isFractionable = values.isFractionable;
        unitsToAdd[existingUnitIndex].parentUnitId = values.parentUnitId;
      } else {
        //add
        unitsToAdd.push({
          unitId: Date.now(),
          parentUnitId: values.parentUnitId,
          value: values.value,
          name: values.name,
          isFractionable: values.isFractionable,
        });
      }
      updateUnits(unitsToAdd);
      handleClose({ unitId: values.unitId });
    },
  });

  useEffect(() => {
    if (unit?.unitId >= 0) {
      selectedUnit.current = unit;
    }
    if (selectedUnit.current?.unitId >= 0) {
      formik.setValues({
        ...selectedUnit.current,
      });
    }
  }, [unit]);

  const handleClose = (unit = null) => {
    props.handleClose(unit);
  };

  return (
    <Dialog
      visible={props.isVisible ? props.isVisible : false}
      header={unit?.unitId >= 0 ? "Update Unit" : "Add New Unit"}
      className="w-5"
      onHide={handleClose}
    >
      <div>
        <form onSubmit={formik.handleSubmit}>
          <div className="flex flex-column">
            <div className="w-full mt-1 mb-3">
              <span className="p-float-label w-full">
                <Dropdown
                  id="parentSelector"
                  options={units}
                  optionValue="unitId"
                  optionLabel="name"
                  value={formik.values.parentUnitId}
                  className="w-full"
                  onChange={(e) => {
                    formik.setFieldValue("parentUnitId", e.target.value);
                  }}
                  showClear
                  filter
                ></Dropdown>
                <label htmlFor="parentSelector">Select Parent Unit</label>
              </span>
            </div>

            <div className="w-full mt-2 mb-3">
              <span className="p-float-label">
                <InputText
                  id="name"
                  value={formik.values.name}
                  onChange={(e) => formik.setFieldValue("name", e.target.value)}
                  className="w-full"
                />
                <label htmlFor="name">Name</label>
              </span>
            </div>

            <div className="w-full mt-2">
              <span className="p-float-label">
                <InputNumber
                  id="value"
                  value={formik.values.value}
                  onValueChange={(e) =>
                    formik.setFieldValue("value", e.target.value)
                  }
                  className="w-full"
                />
                <label htmlFor="value">Value</label>
              </span>
            </div>

            <div className="w-full m-1 mt-4 flex align-items-center">
              <Checkbox
                name="fractionalble"
                value={formik.values.isFractionable}
                onChange={(e) => {
                  formik.setFieldValue("isFractionable", e.target.checked);
                }}
                checked={formik.values.isFractionable}
              />
              <label htmlFor="fractionalble" className="ml-2">
                Is Fractionable
              </label>
            </div>

            <div className="w-full mt-3 align-items-end">
              <Button
                size="small"
                icon="pi pi-save"
                label="Save"
                severity="success"
                type="submit"
                className="ml-auto"
              ></Button>
            </div>
          </div>
        </form>
      </div>
    </Dialog>
  );
}
