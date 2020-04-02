import React from 'react';
import './App.css';

const BRICK_COLORS = [
  {
    background: 'darkblue',
    border: 'blue'
  },
  {
    background: 'darkred',
    border: 'crimson'
  },
  {
    background: 'green',
    border: 'lightgreen'
  },
  {
    background: 'grey',
    border: 'lightgrey'
  }
]

function Brick(props) {
    function pickColor() {
      return BRICK_COLORS[props.brickNumber % BRICK_COLORS.length];
    }
    
    function buildStuds() {
    let studs = [];
    for(let i = 0; i < props.brick.numberOfStuds(); i++) {
      studs.push(
          <div className="stud" key={`stud$${props.brickNumber}-${i}`}>O</div>
      );
    }
    return studs;
  }

  function buildStyle() {
    return (
      {
        border: `1px solid ${pickColor().border}`,
        backgroundColor: `${pickColor().background}`,
        color: `${pickColor().border}`,
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
  function handleNumberChanged (evt) {
    props.minimumStudChange(evt.target.value);
  }

  function handleButtonClick(evt) {
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
      {props.collection.map((brick, index) => {
        return (
          <Brick brick={brick} brickNumber={index} key={index}/>
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
  const [numberOfBricks, setNumberOfBricks] = React.useState(10);
  const [numberValid, setNumberValid] = React.useState(true);
  const [constructedBricks, setConstructedBricks] = React.useState([])
  const [minimumStuds, setMinimumStuds] = React.useState(12)
  const [minimumValid, setMinimumValid] = React.useState(true);

  function numberOfBricksChange(value) {
    setNumberOfBricks(value);
    setNumberValid(value > 0 && value <= 25)
  }

  function generateBricks() {
    setConstructedBricks(createCollection(numberOfBricks));
  }

  function minimumStudChange(value) {
    setMinimumStuds(value);
    setMinimumValid(value >= 0 && value <= 100);
  }

  function filterAndSortBricks() {
    setConstructedBricks(filterAndSort(constructedBricks));
  }

  function filterAndSort(bricks) {
    return bricks.slice().filter(
      (brick) => {
        return brick.numberOfStuds() >= minimumStuds;
      }
    ).sort((brick1, brick2) => brick1.numberOfStuds() - brick2.numberOfStuds());
  }

  function createCollection(totalNumberOfBricks) {
    let bricks = [];
    for (let i=0; i < totalNumberOfBricks; i++) {
      bricks.push(
        createBrick(
          Math.ceil(Math.random() * 10),
          Math.ceil(Math.random() * 10)
        )
      ); 
    }
    return bricks
  }

  function createBrick(x, y) {
    // validate the inputs
    const height = x;
    const width = y;
    return {
      numberOfStuds() {
        return height * width;
      },
      getHeight() {
        return height;
      },
      getWidth() {
        return width;
      },
      toString() {
        return `${width}x${height} (${this.numberOfStuds()})`;
      }
    }
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
        collection={constructedBricks}
        minimumStuds={minimumStuds}
        minimumStudChange={minimumStudChange}
        minimumStudValid={minimumValid}
        filterAndSortPressed={filterAndSortBricks}
      />
    </div>
  );
}

export default App;
