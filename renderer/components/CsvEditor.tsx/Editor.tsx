import React, { FC, useState } from "react";
import { Table, TableBody, TableCell, TableHead, TableRow, TextField } from "@mui/material";
import WaveForm from "./WaveForm";
import { Redo as ClockwiseIcon, Undo as AnticlockwiseIcon } from "@mui/icons-material"

type Props = {

};

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

const EDITABLES = {
  RIGHT_DIR: "RIGHT_DIR",
  RIGHT_VAL: "RIGHT_VAL",
  LEFT_DIR: "LEFT_DIR",
  LEFT_VAL: "LEFT_VAL",
}

const DirCell = ({ value, target, currentTarget, onChange, setTarget }) => {
  return (<TableCell onClick={(e) => { e.stopPropagation(); setTarget(target) }}>
    {currentTarget !== target ?
      (value === 0 ? "left" : "right") :
      (<select defaultValue={value} onChange={(e) => console.log(e.target.value)}>
        <option value={0}>left : 0</option>
        <option value={1}>right : 1</option>
      </select>)}</TableCell>)
};

const NumCell = ({ value, target, currentTarget, setTarget }) => {
  return (<TableCell onClick={(e) => { e.stopPropagation(); setTarget(target) }}
  >

    {currentTarget !== target ?
      (value) : <TextField type={"number"} />
    }
  </TableCell>)
}
const TimeRow = ({ data: [time, leftDir, leftVal, rightDir, rightVal] }) => {
  const [target, setTarget] = useState(null);
  console.log(target)
  return (<TableRow key={time + "right"} onClick={() => setTarget(null)}>
    <TableCell>{time}</TableCell>
    <DirCell value={leftDir} target={EDITABLES.LEFT_DIR} currentTarget={target} setTarget={setTarget} />
    <TableCell>{leftVal}</TableCell>
    <DirCell value={rightDir} target={EDITABLES.RIGHT_DIR} currentTarget={target} setTarget={setTarget} />
    <TableCell>{rightVal}</TableCell>
  </TableRow>)
}

const CsvEditor: FC<Props> = ({ }) => {
  const [timesheet, setTimesheet] = useState<Array<[number, number, number, number, number]>>(csv);

  return (<div>
    <Table >
      <TableHead>
        <TableRow>
          <TableCell>time (x10msec)</TableCell>
          <TableCell>left dir</TableCell>
          <TableCell>left value</TableCell>
          <TableCell>right dir</TableCell>
          <TableCell>right value</TableCell>
        </TableRow>
      </TableHead>
      <TableBody>
        {timesheet.map((data) => (<TimeRow key={data[0]} data={data} />))}
      </TableBody></Table>
    <WaveForm />
  </div>)
}

export default CsvEditor;
