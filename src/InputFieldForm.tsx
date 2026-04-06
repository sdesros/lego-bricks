import React, { useState, useEffect } from 'react';

export function InputFieldForm({
    inputLabel,
    buttonLabel,
    maximum,
    defaultValue,
    changeHandler,
    children,
}: {
    inputLabel: string,
    buttonLabel?: string,
    maximum: number,
    defaultValue?: number,
    changeHandler: (newValue: number) => void,
    children?: Element
}) {
    const [enteredValue, setEnteredValue] = useState(defaultValue ?? maximum)

    const isValid = enteredValue <= maximum && enteredValue > 0;

    function handleNumberChanged (evt: { target: { value: number }}) {
        const value = evt.target.value;
        setEnteredValue(value);
        if (!buttonLabel && value <= maximum && !!value) {
            changeHandler(value);
        }
    }

    function handleButtonClick() {
        if (isValid) {
            changeHandler(enteredValue);
        }
    }

    return (
        <div className="form">
            <label htmlFor="number">{inputLabel} (1-{maximum}): </label>
            <input className={isValid ? 'number' : 'number invalid'} type="number" id="inputNumber" value={enteredValue} onChange={handleNumberChanged} isValid={isValid}></input>
            {buttonLabel && (
                <button type='button' onClick={handleButtonClick} disabled={!isValid}>{buttonLabel}</button>
            )}
            {children}
        </div>
    );
}
  