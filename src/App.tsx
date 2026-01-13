import { formatNumberInput } from "./utils/formatNumber";
import { InputNumber } from "./components/form/inputNumber";
import { useState } from "react";
import { DecrementIcon } from "./components/icons/decrementIcon";
import { IncrementIcon } from "./components/icons/incrementIcon";
import { Tabs } from "./components/base/tabs";
import { Tooltip } from "./components/base/tooltip";
import { Button } from "./components/base/button";

enum UnitEnum {
  Percent = "percent",
  Pixel = "pixel",
}

const App = () => {
  const STEP_VALUE = 0.1;
  const MAX_VALUE_OF_PERCENT = 100;

  const [unit, setUnit] = useState<UnitEnum>(UnitEnum.Percent);
  const [value, setValue] = useState<string>("0");

  const handleUnitClick = (newUnit: UnitEnum) => {
    const isResetValue =
      unit === UnitEnum.Pixel &&
      newUnit === UnitEnum.Percent &&
      Number(value) > MAX_VALUE_OF_PERCENT;
    if (isResetValue) {
      setValue(formatNumberInput(100));
    }

    setUnit(newUnit);
  };

  const handleIncrement = () => {
    const currentValue = Number(value) || 0;
    const newValue = formatNumberInput(currentValue + STEP_VALUE);
    setValue(newValue);
  };

  const handleDecrement = () => {
    const currentValue = Number(value) || 0;
    const newValue = formatNumberInput(currentValue - STEP_VALUE);
    setValue(newValue);
  };

  const isDecrementDisabled = (Number(value) || 0) <= 0;
  const isIncrementDisabled =
    unit === UnitEnum.Percent
      ? (Number(value) || 0) >= MAX_VALUE_OF_PERCENT
      : false;

  return (
    <div className="w-screen h-screen bg-neutral-800 flex items-center justify-center">
      <div className="w-70 bg-neutral-950 p-4">
        <div className="flex items-center gap-2 mb-4">
          <label htmlFor="" className="text-xs text-neutral-400 w-25">
            Unit
          </label>
          <Tabs
            items={[
              { value: UnitEnum.Percent, label: "%" },
              { value: UnitEnum.Pixel, label: "px" },
            ]}
            value={unit}
            onChange={handleUnitClick}
          />
        </div>

        <div className="flex items-center gap-2">
          <label htmlFor="" className="text-xs text-neutral-400 w-25">
            Value
          </label>
          <div className="relative flex-1">
            <div className="input-number-container flex rounded-lg bg-neutral-900">
              <Tooltip
                message={
                  isDecrementDisabled ? "Value must greater than 0" : null
                }
              >
                <Button
                  onClick={handleDecrement}
                  disabled={isDecrementDisabled}
                  position="left"
                  aria-label="decrement"
                  icon={
                    <DecrementIcon
                      className={isDecrementDisabled ? "opacity-40" : ""}
                    />
                  }
                />
              </Tooltip>

              <InputNumber
                value={value}
                onChange={setValue}
                maxValue={unit === UnitEnum.Percent ? 100 : undefined}
                minValue={0}
              />

              <Tooltip
                message={
                  isIncrementDisabled ? "Value must smaller than 100" : null
                }
              >
                <Button
                  onClick={handleIncrement}
                  disabled={isIncrementDisabled}
                  position="right"
                  aria-label="increment"
                  icon={
                    <IncrementIcon
                      className={isIncrementDisabled ? "opacity-40" : ""}
                    />
                  }
                />
              </Tooltip>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default App;
