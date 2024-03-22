import { Dropdown } from "primereact/dropdown";
import { InputNumber } from "primereact/inputnumber";
import { useState } from "react";
import { useUnits } from "./contexts/UnitsContext/useUnits";
import { convert } from "arbitary_unit_converter/dist/unit_converter";

export default function UnitsDisplay() {
  const [inputVal, setInputVal] = useState(0);
  const [selectedUnitId, setSelectedUnitId] = useState(null);
  const { units } = useUnits();

  const result = convert(units, selectedUnitId, inputVal);

  return (
    <div className="flex flex-row gap-1">
      <div className="w-2 m-1">
        <span className="p-float-label">
          <InputNumber
            id="name"
            value={inputVal}
            onChange={(e) => setInputVal(e.value)}
            className="w-full"
          />
          <label htmlFor="name">Input Value</label>
        </span>
      </div>

      <div className="w-2 m-1">
        <span className="p-float-label w-full">
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

      <div className="w-full m-1 flex align-content-center align-items-center">
        <div>Result: </div>
        <div>{result}</div>
      </div>
    </div>
  );
}
