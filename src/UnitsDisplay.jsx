import { Dropdown } from "primereact/dropdown";
import { InputNumber } from "primereact/inputnumber";
import { useState } from "react";
import { useUnits } from "./contexts/UnitsContext/useUnits";
import { convert } from "arbitary_unit_converter/dist/unit_converter";
import { InputText } from "primereact/inputtext";

export default function UnitsDisplay() {
  const [inputVal, setInputVal] = useState(0);
  const [selectedUnitId, setSelectedUnitId] = useState(null);
  const { units } = useUnits();

  const result = convert(units, selectedUnitId, inputVal);

  return (
    <div className="grid">
      <div className="sm:col-12 lg:col-3 col-12 pt-2 mt-2">
        <span className="p-float-label">
          <InputNumber
            id="name"
            value={inputVal}
            onChange={(e) => (e.value >= 0 ? setInputVal(e.value) : 0)}
            className="w-full"
          />
          <label htmlFor="name">Input Value</label>
        </span>
      </div>

      <div className="sm:col-12 lg:col-4 col-12 pt-2 mt-2">
        <span className="p-float-label">
          <Dropdown
            id="parentSelector"
            options={units}
            optionValue="unitId"
            optionLabel="name"
            value={selectedUnitId}
            className="w-full"
            onChange={(e) => {
              setSelectedUnitId(e.target.value);
            }}
            showClear
            filter
          ></Dropdown>
          <label htmlFor="parentSelector">Input Unit</label>
        </span>
      </div>

      <div className="sm:col-12 md:col-5 lg:col-5 col-12 pt-2 mt-2">
        <span className="p-float-label">
          <InputText
            id="output"
            value={result}
            className="w-full"
            readOnly
            disabled
          />
          <label htmlFor="out">Output Value</label>
        </span>
      </div>
    </div>
  );
}
