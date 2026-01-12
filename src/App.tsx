import decrementIcon from "./components/icons/decrement.svg";
import incrementIcon from "./components/icons/increment.svg";
import { formatNumberInput } from "./utils/formatNumber";
import { InputNumber } from "./components/form/InputNumber";
import { useState } from "react";

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
          <label className="text-xs text-neutral-400 w-25">Unit</label>
          <div className="flex flex-1 rounded-lg bg-neutral-900">
            <div className="p-0.5 flex-1">
              <button
                onClick={() => handleUnitClick(UnitEnum.Percent)}
                className={`w-full py-2 px-5 rounded-lg font-medium text-xs cursor-pointer ${
                  unit === UnitEnum.Percent
                    ? "bg-neutral-700 text-gray-50"
                    : "bg-transparent text-gray-400"
                }`}
              >
                %
              </button>
            </div>
            <div className="p-0.5 flex-1">
              <button
                onClick={() => handleUnitClick(UnitEnum.Pixel)}
                className={`w-full py-2 px-5 rounded-lg font-medium text-xs cursor-pointer ${
                  unit === UnitEnum.Pixel
                    ? "bg-neutral-700 text-gray-50"
                    : "bg-transparent text-gray-400"
                }`}
              >
                px
              </button>
            </div>
          </div>
        </div>

        <div className="flex items-center gap-2">
          <label className="text-xs text-neutral-400 w-25">Value</label>
          <div className="relative flex-1">
            <div className="input-number-container flex rounded-lg bg-neutral-900">
              <div className="relative input-number-group">
                {isDecrementDisabled && (
                  <div className="validation-message-tooltip-hover">
                    Value must greater than 0
                  </div>
                )}
                <button
                  onClick={handleDecrement}
                  onMouseDown={(e) => e.preventDefault()}
                  disabled={isDecrementDisabled}
                  className={`w-9 h-full py-3 flex items-center justify-center bg-transparent rounded-l-lg text-xl font-light transition-all ${
                    isDecrementDisabled
                      ? "text-neutral-400 cursor-not-allowed"
                      : "text-[var(--text-color-base)] hover:bg-neutral-700 cursor-pointer"
                  }`}
                >
                  <img
                    src={decrementIcon}
                    alt="decrement"
                    className={isDecrementDisabled ? "opacity-40" : ""}
                  />
                </button>
              </div>

              <InputNumber
                value={value}
                onChange={setValue}
                maxValue={unit === UnitEnum.Percent ? 100 : undefined}
                minValue={0}
              />

              <div className="relative input-number-group">
                {isIncrementDisabled && (
                  <div className="validation-message-tooltip-hover">
                    Value must smaller than 100
                  </div>
                )}
                <button
                  onClick={handleIncrement}
                  onMouseDown={(e) => e.preventDefault()}
                  disabled={isIncrementDisabled}
                  className={`w-9 h-full py-3 flex items-center justify-center bg-transparent rounded-r-lg text-xl font-light transition-all ${
                    isIncrementDisabled
                      ? "text-neutral-400 cursor-not-allowed"
                      : "text-[var(--text-color-base)] hover:bg-neutral-700 cursor-pointer"
                  }`}
                >
                  <img
                    src={incrementIcon}
                    alt="increment"
                    className={isIncrementDisabled ? "opacity-40" : ""}
                  />
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default App;
