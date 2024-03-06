export const baseUnits = [
  {
    name: "Litre",
    isFractionable: false,
    parentUnitId: 3,
    unitId: 4,
    value: 1,
  },
  {
    name: "Bottle",
    isFractionable: false,
    parentUnitId: 2,
    unitId: 3,
    value: 2,
  },
  {
    name: "Box",
    isFractionable: false,
    parentUnitId: 1,
    unitId: 2,
    value: 10,
  },
  {
    name: "Carton",
    isFractionable: false,
    parentUnitId: 0,
    unitId: 1,
    value: 24,
  },
  {
    name: "Container",
    isFractionable: false,
    parentUnitId: -1,
    unitId: 0,
    value: 200,
  },
];

export const createTreeStructureFromUnits = (units) => {
  let treeObj = [];
  if (!units) return treeObj;
  for (let i = 0; i < units.length; i++) {
    const unit = findLineage(units, i);
    unit.value = null;
    treeObj.push(unit);
  }
  return treeObj;
};

const findLineage = (() => {
  let counter = 0;
  const findLineageClosure = (units, currentIndex) => {
    if (currentIndex > -1 && currentIndex < units.length) {
      const unitObj = units[currentIndex];
      const currentUnit = {
        name: unitObj.name,
        isFractionable: unitObj.isFractionable,
        parentUnitId: unitObj.parentUnitId,
        unitId: unitObj.unitId,
        value: unitObj.value,
      };

      currentUnit.data = {
        name: unitObj.name,
        isFractionable: unitObj.isFractionable,
        parentUnitId: unitObj.parentUnitId,
        unitId: unitObj.unitId,
        value: unitObj.value,
      };
      currentUnit.children = [];
      currentUnit.key = counter++;

      for (let i = 0; i < units.length; i++) {
        const unit = units[i];
        if (unit.parentUnitId === currentUnit.unitId) {
          // debugger;
          currentUnit.children.push(findLineage(units, i));
        }
      }
      return currentUnit;
    } else {
      return null;
    }
  };
  return findLineageClosure;
})();
