import React, { useState, useMemo } from 'react';
import { LegoBrick } from "./types";
import { Brick } from './Brick';
import { InputFieldForm } from './InputFieldForm';

const DEFAULT_MINIMUM = 1

type SortOption = 'Size' | 'Height' | 'Width' | 'Color';

const SORT: SortOption[] = [
  'Size', 'Height', 'Width', 'Color'
]

type BrickListProps = {
  bricks: LegoBrick[];
  baseKey: string;
};

type BrickCollectionProps = {
  collection: LegoBrick[];
};

const BrickList: React.FC<BrickListProps> = ({ bricks, baseKey }) => {
  return bricks.map((brick: LegoBrick, index: number) => (
    <Brick brick={brick} brickNumber={index} key={`${baseKey}-${index}`} />
  ))
}

const BrickCollection: React.FC<BrickCollectionProps> = ({ collection }) => {
  const [minimum, setMinimum] = useState(DEFAULT_MINIMUM)
  const [sort, setSort] = useState<SortOption>(SORT[0])
  const [descending, setDescending] = useState(false)
  const [showFiltered, setShowFiltered] = useState(false)

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

  const filteredBricks = useMemo(() => {
    const visibleSet = new Set(visibleBricks)
    return collection.filter(brick => !visibleSet.has(brick))
  }, [collection, visibleBricks])

  if (collection.length < 1) {
    return (
      <div className='brickcollection' />
    )
  }

  function handleButtonClick(minimumStuds: number) {
    setMinimum(minimumStuds)
  }

  function handleSortChange(evt: React.ChangeEvent<HTMLSelectElement>) {
    setSort(evt?.target.value as SortOption)
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
        idPrefix="filter"
      >
        <label htmlFor="sort-select">Sort by: </label>
        <select name="sort-select" onChange={handleSortChange} id="sort-select" value={sort}>
          {SORT.map((sortLabel) => {
            return (
              <option value={sortLabel} key={`option-${sortLabel}`}>{sortLabel}</option>
            )
          })}
        </select>
        <button className={`direction ${descending ? 'descending' : 'ascending'}`} type="button" onClick={toggleDescending}><img src="./arrow-up-bold-svgrepo-com.svg" alt={`Change sort direction from {descending ? 'descending to ascending' : 'ascending to descending'}`}/></button>
      </InputFieldForm>
      <BrickList bricks={visibleBricks} baseKey="collectionentry" />
      {filteredBricks.length > 0 && (
        <div className="filtered-bricks">
          <h3 onClick={() => setShowFiltered(!showFiltered)} style={{ cursor: 'pointer' }}>
            Filtered out ({filteredBricks.length} bricks with less than {minimum} studs) <img src="./arrow-up-bold-svgrepo-com.svg" className={`direction ${showFiltered ? 'ascending' : 'descending'}`} alt="toggle" />
          </h3>
          {showFiltered && <BrickList bricks={filteredBricks} baseKey="filtered" />}
        </div>
      )}
    </div>
  )
}

const App: React.FC = () => {
  const [constructedBricks, setConstructedBricks] = useState<LegoBrick[]>([])

  function generateBricks(number: number) {
    const collection = createCollection(number)
    setConstructedBricks(collection)
  }

  function createCollection(totalNumberOfBricks: number) {
    let bricks: LegoBrick[] = []
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
        idPrefix="generate"
      />
      <BrickCollection 
        collection={constructedBricks}
      />
    </div>
  )
}

export default App;
