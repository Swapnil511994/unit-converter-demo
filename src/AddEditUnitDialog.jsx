import { Dialog } from "primereact/dialog";
import { useFormik } from "formik";
import { useEffect, useRef } from "react";
import { Yup } from "yup";
import { Dropdown } from "primereact/dropdown";

export default function AddEditUnitDialog(props) {
  const units = props.baseUnits;
  const unit = props.unit;
  const selectedUnit = useRef(null);
  const handleClose = (unit = null) => {
    props.handleClose(unit);
  };

  if (unit?.unitId >= 0) {
    selectedUnit.current = unit;
  }
  if (selectedUnit.current?.unitId >= 0) {
    formik.setValues({
      ...selectedUnit.current,
    });
  }

  const formik = useFormik({
    initialValues: {
      unitId: Date.now(),
      name: "",
      parentUnitId: -1,
      isFractionable: false,
      value: 0,
    },
    validationSchema: Yup.object().shape({}),
    onSubmit: async (values) => {
      console.log(values);
    },
  });

  return (
    <Dialog
      visible={props.isVisible ? props.isVisible : false}
      onHide={handleClose}
    >
      <div>
        <form onSubmit={formik.handleSubmit}>
          <Dropdown
            values={units}
            optionValue="unitId"
            optionLabel="name"
          ></Dropdown>
        </form>
      </div>
    </Dialog>
  );
}
