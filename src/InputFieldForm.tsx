import React, { useState, useEffect } from 'react';

export function InputFieldForm({
    inputLabel,
    buttonLabel,
    maximum,
    changeHandler,
    children,
}: {
    inputLabel: string,
    buttonLabel: string,
    maximum: number,
    changeHandler: (newValue: number) => void,
    children?: Element
}) {

    const [enteredValue, setEnteredValue] = useState(maximum)

    const isValid = enteredValue <= maximum;

    function handleNumberChanged (evt: { target: { value: number }}) {
        setEnteredValue(evt.target.value);
    }

    function handleButtonClick() {
        if (isValid) {
            changeHandler(enteredValue)
        }
    }

    return (
        <div className="sortform">
            <form>
                <label htmlFor="number">{inputLabel} (1-{maximum}): </label>
                <input className={isValid ? 'number' : 'number invalid'} type="number" id="inputNumber" value={enteredValue} onChange={handleNumberChanged}></input>
                {isValid ? <button type='button' onClick={handleButtonClick}>{buttonLabel}</button> : <button type='button' disabled>{buttonLabel}</button>}
            </form>
            {children}
        </div>
    );
}
  