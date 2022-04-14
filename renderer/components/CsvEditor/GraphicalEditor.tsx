import React, { FC } from "react";

const csv = [
  [0, 0, 0, 0, 0],
  [100, 1, 30, 1, 40],
  [200, 0, 30, 0, 40],
  [300, 1, 30, 1, 40],
  [400, 0, 30, 0, 40],
  [500, 1, 30, 1, 40],
  [600, 0, 30, 0, 40],
  [700, 1, 30, 1, 40],
  [800, 0, 30, 0, 40],
]

const GraphicalEditor: FC = () => {
  return (<div>
    <svg
      viewBox="0 0 800 100"
      width={"100%"}
      height={"300px"}
      xmlns="<http://www.w3.org/2000/svg>"
      style={{ border: "1px solid red" }}
    >
      <circle
        cx="12" cy="12" r="8"
        strokeWidth="1" stroke="tomato"
        fill="none"
      />
      {csv.map(([duration, leftDir, leftVal, rightDir, rightVal]) => (
        <rect onClick={console.log} x={duration} y={leftVal} width={50} height={10} fill={leftDir == 0 ? "red" : "blue"} />
      ))}

    </svg>
  </div>)
}

export default GraphicalEditor;
