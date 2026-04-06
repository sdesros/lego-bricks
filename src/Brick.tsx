import React from 'react';
import { LegoBrick } from "./types";

function Stud({
    brickNumber, index
}: { brickNumber: number, index: number }) {
    return ( 
        <div className="stud" key={`stud${brickNumber}-${index}`}>O</div>
    )
}
  
export function Brick(props: {
    brickNumber: number,
    brick: LegoBrick,
    key: string,
}) {
    function buildStuds() {
        let studs: Element[] = [];
        for(let i = 0; i < props.brick.getNumberOfStuds(); i++) {
            studs.push(
                <Stud brickNumber={props.brickNumber} index={i}/>
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
  