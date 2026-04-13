import React, { useState, useEffect, useCallback } from 'react';

function isNumberValid(value: number|'', max: number, min: number): boolean {
    if (value === '') {
        return false
    }
    return value >= min && value <= max;
}

export function InputFieldForm({
    inputLabel,
    buttonLabel,
    maximum,
    defaultValue,
    changeHandler,
    idPrefix,
    children,
}: {
    inputLabel: string,
    buttonLabel?: string,
    maximum: number,
    defaultValue?: number,
    changeHandler: (newValue: number) => void,
    idPrefix: string,
    children?: React.ReactNode
}) {
    const [enteredValue, setEnteredValue] = useState<''|number>(defaultValue ?? maximum);

    const showButton = !!buttonLabel;

    const isValid = isNumberValid(enteredValue, maximum, 1);

    function handleNumberChanged (evt: React.ChangeEvent<HTMLInputElement>) {
        const inputValue = evt.target.value;
        const numberValue = Number.parseInt(`${inputValue}`);
        const value = isNaN(numberValue) ? '' : numberValue
        setEnteredValue(value);
        if (!showButton && isNumberValid(value, maximum, 1)) {
            // if valid, then it's a number
            changeHandler(value as number);
        }
    }

    function handleButtonClick() {
        if (isValid) {
            // if valid, then it's a number
            changeHandler(enteredValue as number);
        }
    }

    return (
        <div className="form">
            <label htmlFor={`${idPrefix}-number`}>{inputLabel} (1-{maximum}): </label>
            <input className={isValid ? 'number' : 'number invalid'} type="number" id={`${idPrefix}-number`} value={enteredValue} onChange={handleNumberChanged} aria-valuemin={1} aria-valuemax={maximum} />
            {showButton && (
                <button type='button' onClick={handleButtonClick} disabled={!isValid}>{buttonLabel}</button>
            )}
            {children}
        </div>
    );
}