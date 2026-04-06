import React, { useState, useMemo } from 'react';
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

const DEFAULT_MINIMUM=1

const SORT = [
  'Size', 'Height', 'Width', 'Color'
]

function BrickCollection({
  collection
}: {
  collection: LegoBrick[]
}) {
  const [minimum, setMinimum] = useState(DEFAULT_MINIMUM)
  const [sort, setSort] = useState(SORT[0])
  const [descending, setDescending] = useState(false)

  const visibleBricks = useMemo(() => {
    return collection.filter(
      (brick: LegoBrick )=> { 
        return brick.getNumberOfStuds() >= minimum 
      }).sort((b1: LegoBrick, b2: LegoBrick) =>
        {
          const brick1 = descending ? b2: b1
          const brick2 = descending ? b1 : b2
          switch(sort) {
            case 'Color':
                return brick1.getColor().background.localeCompare(brick2.getColor().background)
            case 'Width':
                return brick1.getWidth() - brick2.getWidth()
            case 'Height':
              return brick1.getHeight() - brick2.getHeight()
            default: 
              return brick1.getNumberOfStuds() - brick2.getNumberOfStuds()
          }
        })
  }, [minimum, collection, sort, descending])

  if (collection.length < 1) {
    return (
      <div className='brickcollection'>
      </div>
    );
  }

  function handleButtonClick(minimumStuds: number) {
    setMinimum(minimumStuds)
  }

  function handleSortChange(evt: { target: { value: string }}) {
    setSort(evt?.target.value)
  }

  function toggleDescending() {
    setDescending(!descending)
  }

  return (
    <div className='brickcollection'>
      <h3>There are {visibleBricks.length} visible bricks in the collection out of {collection.length}.</h3>
      <InputFieldForm
        inputLabel="Filter bricks with a number of studs under"
        maximum={100}
        defaultValue={minimum}
        changeHandler={handleButtonClick}
      >
        <label for="sort-select">Sort by: </label>
        <select name="sort-select" onChange={handleSortChange}>
          {SORT.map((sortLabel) => {
            return (
              <option value={sortLabel} selected={sortLabel === sort}>{sortLabel}</option>
            )
          })}
        </select>
        <button className={`direction ${descending ? 'descending' : 'ascending'}`} type="button" onClick={toggleDescending}><img src="./arrow-up-bold-svgrepo-com.svg" alt={`Change sort direction from {descending ? 'descending to ascending' : 'ascending to descending'}`}/></button>
      </InputFieldForm>
      {visibleBricks.map((brick: LegoBrick, index: number) => {
        return (
          <Brick brick={brick} brickNumber={index} key={`collectionentry-${index}`}/>
        );
      })}
    </div>
  );
}

function App() {
  const [constructedBricks, setConstructedBricks] = useState([])

  function generateBricks(number: number) {
    const collection = createCollection(number);
    setConstructedBricks(collection);
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
        collection={constructedBricks}
      />
    </div>
  );
}

export default App;
