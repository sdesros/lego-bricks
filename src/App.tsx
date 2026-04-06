import React, { useState } from 'react';
import './App.css';
import { LegoBrick } from "./types";
import { Brick } from './Brick';
import { InputFieldForm } from './InputFieldForm';

// This seems vaguely familiar to the other form, maybe make it common?
function BrickSortForm(props) {
  function handleButtonClick(value: number) {
    props.minimumStudChange(value)
    props.filterAndSortPressed();
  }

  return (
    <InputFieldForm
      inputLabel="Enter minimum amount of studs"
      buttonLabel="Filter and Sort"
      maximum={100}
      changeHandler={handleButtonClick}
    />
  );
}

function BrickCollection(props) {
 if (props.collection.length < 1) {
    return (
      <div className='brickcollection'>
      </div>
    );
  }
  return (
    <div className='brickcollection'>
      <h3>There are {props.collection.length} bricks in the collection</h3>
      <BrickSortForm 
        minimumStuds={props.minimumStuds}
        minimumStudChange={props.minimumStudChange}
        minimumStudValid={props.minimumStudValid}
        filterAndSortPressed={props.filterAndSortPressed}
      />
      {props.collection.map((brick: LegoBrick, index: number) => {
        return (
          <Brick brick={brick} brickNumber={index} key={`collectionentry-${index}`}/>
        );
      })}
    </div>
  );
}

function LegoCreateForm(props) {
  function handleNumberChanged (evt) {
    props.changeNumberOfBricks(evt.target.value);
  }

  function handleButtonClick(evt) {
    props.onGeneratePressed();
  }

  return (
    <div className="createform">
      <form>
        <label htmlFor="number">Please enter the number of lego bricks to create (1-25): </label>
        <input className={props.numberValid ? 'number' : 'number invalid'} type="number" id="numberOfBricks" value={props.bricks} onChange={handleNumberChanged}></input>
        {props.numberValid ? <button type='button' onClick={handleButtonClick}>Generate Bricks</button> : <button type='button' disabled>Generate Bricks</button>}
      </form>
    </div>
  );
}

function App() {
  const [numberOfBricks, setNumberOfBricks] = useState(10);
  const [numberValid, setNumberValid] = useState(true);
  const [constructedBricks, setConstructedBricks] = useState([])
  const [minimumStuds, setMinimumStuds] = useState(12)
  const [minimumValid, setMinimumValid] = useState(true);
  const [visibleBricks, setVisibleBricks] = useState(constructedBricks)

  function filterAndSortBricks() {
    setVisibleBricks((prev: LegoBrick[]) => {
        if( minimumStuds && minimumValid ) {
          return constructedBricks.filter((brick: LegoBrick )=> { return brick.getNumberOfStuds() >= minimumStuds }).sort((brick1: LegoBrick, brick2: LegoBrick) => brick1.getNumberOfStuds() - brick2.getNumberOfStuds())
        }
        return constructedBricks;
      }
    )
  }
  
  function numberOfBricksChange(value: number) {
    setNumberOfBricks(value);
    setNumberValid(value > 0 && value <= 25)
  }

  function generateBricks(number: number) {
    setNumberOfBricks(number)
    const collection = createCollection(number);
    setConstructedBricks(collection);
    setVisibleBricks(collection);
  }

  function minimumStudChange(value: number) {
    setMinimumStuds(value);
    setMinimumValid(value >= 0 && value <= 100);
  }

  function createCollection(totalNumberOfBricks: number) {
    let bricks: LegoBrick[] = [];
    for (let i=0; i < totalNumberOfBricks; i++) {
      bricks.push(LegoBrick.buildRandomBrick())
    }
    return bricks
  }

  return (
    <div className="App">
      <InputFieldForm
        inputLabel="Please enter the number of lego bricks to create"
        buttonLabel="Generate Bricks"
        maximum={25}
        changeHandler={generateBricks}
      />
      <BrickCollection 
        collection={visibleBricks}
        minimumStuds={minimumStuds}
        minimumStudChange={minimumStudChange}
        minimumStudValid={minimumValid}
        filterAndSortPressed={filterAndSortBricks}
      />
    </div>
  );
}

export default App;
