import React from 'react';
import { BrickColor, LegoBrick } from "./types";

function Stud(props: { color: BrickColor}) {
    return (
        <div className="stud">
            <svg>
                <circle cx={"50%"} cy={"50%"} r={"40%"} stroke={props.color.border} fill={props.color.border} />
            </svg>
        </div>
    );
}
  
export function Brick(props: {
    brickNumber: number,
    brick: LegoBrick,
    key: string,
}) {
    function buildStuds() {
        let studs: React.ReactNode[] = [];
        for(let i = 0; i < props.brick.getNumberOfStuds(); i++) {
            studs.push(
                <Stud key={`stud${props.brickNumber}-${i}`} color={props.brick.getColor()}/>
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
  