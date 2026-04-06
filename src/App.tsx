import React, { useState } from 'react';
import './App.css';
import { LegoBrick } from "./types";

function Stud({
  brickNumber, index
}: { brickNumber: number, index: number }) {
  return ( 
    <div className="stud" key={`stud${brickNumber}-${index}`}>O</div>
  )
}

function Brick(props: {
  brickNumber: number,
  brick: LegoBrick,
  key: string,
}) {
  function buildStuds() {
    let studs: Element[] = [];
    for(let i = 0; i < props.brick.getNumberOfStuds(); i++) {
      studs.push(
          Stud({ brickNumber: props.brickNumber, index: i})
      );
    }
    return studs;
  }

  function buildStyle() {
    return (
      {
        border: `1px solid ${props.brick.getColor().border}`,
        backgroundColor: `${props.brick.getColor().background}`,
        color: `${props.brick.getColor().border}`,
        gridTemplateColumns: `repeat(${props.brick.getWidth()}, 20px)`,
        gridTemplateRows: `repeat(${props.brick.getHeight()}, 20px)`
      }
    );
  }

  return (
    <div className='brick' style={buildStyle()}>
      {buildStuds()}
    </div>
  )
}

// This seems vaguely familiar to the other form, maybe make it common?
function BrickSortForm(props) {
  function handleNumberChanged (evt: { target: { value: number }}) {
    props.minimumStudChange(evt.target.value);
  }

  function handleButtonClick() {
    props.filterAndSortPressed();
  }

  return (
    <div className="sortform">
      <form>
        <label htmlFor="number">Enter minimum amount of studs (1-100): </label>
        <input className={props.minimumStudValid ? 'number' : 'number invalid'} type="number" id="numberOfBricks" value={props.minimumStuds} onChange={handleNumberChanged}></input>
        {props.minimumStudValid ? <button type='button' onClick={handleButtonClick}>Filter and Sort</button> : <button type='button' disabled>Filter and Sort</button>}
      </form>
    </div>
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

  function generateBricks() {
    const collection = createCollection(numberOfBricks);
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
      <LegoCreateForm 
        bricks={numberOfBricks}
        changeNumberOfBricks={numberOfBricksChange}
        onGeneratePressed={generateBricks}
        numberValid={numberValid}
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
