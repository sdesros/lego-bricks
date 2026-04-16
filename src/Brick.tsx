import React from 'react';
import { BrickColor, LegoBrick } from "./types";

type StudProps = {
  color: BrickColor
}

const Stud: React.FC<StudProps> = ({ color }) => {
    return (
        <div className="stud">
            <svg>
                <circle cx={"50%"} cy={"50%"} r={"40%"} stroke={color.border} fill={color.border} />
            </svg>
        </div>
    )
}

type BrickProps = {
  brickNumber: number,
  brick: LegoBrick,
}

export const Brick: React.FC<BrickProps> = ({ brickNumber, brick}) => {
    function buildStuds() {
        let studs: React.ReactNode[] = []
        for(let i = 0; i < brick.getNumberOfStuds(); i++) {
            studs.push(
                <Stud key={`stud${brickNumber}-${i}`} color={brick.getColor()}/>
            )
        }
        return studs
    }

    function buildStyle() {
        return (
        {
            border: `1px solid ${brick.getColor().border}`,
            backgroundColor: `${brick.getColor().background}`,
            color: `${brick.getColor().border}`,
            gridTemplateColumns: `repeat(${brick.getWidth()}, 20px)`,
            gridTemplateRows: `repeat(${brick.getHeight()}, 20px)`
        }
        )
    }

    return (
        <div className='brick' style={buildStyle()}>
            {buildStuds()}
        </div>
    )
  }
  