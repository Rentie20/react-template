import { InputHTMLAttributes, useRef, useCallback } from "react";
import { formatNumberInput } from "../../../utils/formatNumber";

interface InputNumberProps
  extends Omit<InputHTMLAttributes<HTMLInputElement>, "onChange"> {
  value: string;
  maxValue?: number;
  minValue?: number;
  onChange: (value: string) => void;
}

export const InputNumber = ({
  value,
  maxValue,
  minValue,
  name = "input-number",
  onChange,
  ...props
}: InputNumberProps) => {
  const lastValueValidRef = useRef<string>(value);

  const sanitizeLastValue = useCallback(
    (value: string) => {
      const numberValue = parseFloat(value);
      if (maxValue && numberValue > maxValue) {
        return maxValue.toString();
      }
      if (minValue && numberValue < minValue) {
        return minValue.toString();
      }
      return value;
    },
    [maxValue, minValue]
  );

  const handleInputChange = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      let inputValue = e.target.value;
      inputValue = inputValue.replace(/,/g, ".");
      onChange(inputValue);
    },
    [onChange]
  );

  const handleBlur = useCallback(() => {
    const dotCount = (value.match(/\./g) || []).length;
    if (dotCount > 1) {
      onChange(sanitizeLastValue(lastValueValidRef.current));
      return;
    }

    const parsedValue = parseFloat(value);

    if (isNaN(parsedValue)) {
      onChange(sanitizeLastValue(lastValueValidRef.current));
      return;
    }

    let finalValue = parsedValue;
    if (minValue && finalValue < minValue) {
      finalValue = minValue;
    }

    if (maxValue && finalValue > maxValue) {
      onChange(lastValueValidRef.current);
      return;
    }

    const formattedValue = formatNumberInput(finalValue);
    onChange(formattedValue);

    lastValueValidRef.current = formattedValue;
  }, [value, maxValue, minValue, onChange, sanitizeLastValue]);

  return (
    <input
      {...props}
      type="text"
      name={name}
      value={value}
      onChange={handleInputChange}
      onBlur={handleBlur}
      className={`${props.className ? props.className : ""} input-number`}
    />
  );
};
