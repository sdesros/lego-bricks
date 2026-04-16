import React, { isValidElement, useState } from 'react';

export function isNumberValid(value: number|'', max: number, min: number): boolean {
    if (value === '') {
        return false
    }
    return value >= min && value <= max
}

type NumberInputProps = {
  label?: string;
  value: number | '';
  min?: number;
  max: number;
  idPrefix?: string;
  onChange: (newValue: number| '', isValid: boolean) => void;
};

const NumberInput: React.FC<NumberInputProps> = ({ label, value, onChange, min = 1, max, idPrefix = '' }) => {
  const isValid = isNumberValid(value, max, min)

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const inputValue = e.target.value
    const numberValue = Number.parseInt(`${inputValue}`)
    const sanitizedValue = isNaN(numberValue) ? '' : numberValue
    onChange(sanitizedValue, isNumberValid(sanitizedValue, max, min))
  }

  return (
    <div className="number-input">
        {(label && <label htmlFor={`${idPrefix}-number`}>{label} ({min}-{max}): </label> )}
        <input className={isValid ? 'number' : 'number invalid'} type="number" id={`${idPrefix}-number`} value={value} onChange={handleInputChange} aria-valuemin={min} aria-valuemax={max} />
    </div>
  )
}

type InputFieldFormProps = {
  inputLabel?: string;
  buttonLabel?: string;
  maximum: number;
  minimum?: number;
  defaultValue?: number;
  changeHandler: (newValue: number) => void;
  idPrefix: string;
  children?: React.ReactNode;
};

export const InputFieldForm: React.FC<InputFieldFormProps> = ({
    inputLabel,
    buttonLabel,
    maximum,
    minimum = 1,
    defaultValue,
    changeHandler,
    idPrefix,
    children,
}) => {
    const [enteredValue, setEnteredValue] = useState<''|number>(defaultValue ?? maximum)
    const [isValid, setValid] = useState(true)
    const showButton = !!buttonLabel

    function handleNumberChanged (value: number|'', valid: boolean) {
        setEnteredValue(value)
        setValid(valid)
        if (!showButton && valid) {
            // if valid, then it's a number
            changeHandler(value as number)
        }
    }

    function handleButtonClick() {
        if (isValid) {
            // if valid, then it's a number
            changeHandler(enteredValue as number)
        }
    }

    return (
        <div className="form">
            <NumberInput idPrefix={idPrefix} label={inputLabel} value={enteredValue} min={minimum} max={maximum} onChange={handleNumberChanged}/>
            {showButton && (
                <button type='button' onClick={handleButtonClick} disabled={!isValid}>{buttonLabel}</button>
            )}
            {children}
        </div>
    )
}