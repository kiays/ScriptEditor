import React, { FC, useState } from "react";
import WaveForm from "./WaveForm";
import update from "immutability-helper"

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
  TIME: "TIME",
  RIGHT_DIR: "RIGHT_DIR",
  RIGHT_VAL: "RIGHT_VAL",
  LEFT_DIR: "LEFT_DIR",
  LEFT_VAL: "LEFT_VAL",
}

type DirCellProps = {
  value: number,
  editing: boolean,
  onSelect: () => void,
  onChange: (val: number) => void
};
const DirCell: FC<DirCellProps> = ({ value, editing, onChange, onSelect }) => {
  return (<td onClick={(e) => { e.stopPropagation(); onSelect() }}>
    {!editing ?
      (value === 0 ? "left" : "right") :
      (<select defaultValue={value} onChange={e => onChange(Number(e.target.value))}>
        <option value={0}>left : 0</option>
        <option value={1}>right : 1</option>
      </select>)}</td>)
};

type NumCellProps = {
  value: number,
  editing: boolean,
  onSelect: () => void,
  onChange: (val: number) => void
};

const NumCell: FC<NumCellProps> = ({ value, editing, onSelect, onChange }) => {
  return (<td onClick={(e) => { e.stopPropagation(); onSelect() }}>
    {!editing ? (value) : <input type="number" defaultValue={value} style={{ width: "3rem" }} onChange={e => { e.stopPropagation(); onChange(Number(e.target.value)) }} />}
  </td>)
}

type TimeSheetRow = [number, number, number, number, number];

type RowProps = {
  data: TimeSheetRow,
  index: number,
  selected: CellSelector,
  onSelect: (cell: CellSelector) => void,
  onChange: (index: number) => (value: number) => void
}
const TimeRow: FC<RowProps> = ({ data: [time, leftDir, leftVal, rightDir, rightVal], index, selected, onSelect, onChange }) => {
  return (<tr onClick={() => onSelect({ col: null, index: null })}>
    <td></td>
    <NumCell value={time} editing={selected.col === EDITABLES.TIME && selected.index === index} onSelect={() => onSelect({ col: EDITABLES.TIME, index })} onChange={onChange(0)} />
    <DirCell value={leftDir} editing={selected.col === EDITABLES.LEFT_DIR && selected.index === index} onSelect={() => onSelect({ col: EDITABLES.LEFT_DIR, index })} onChange={onChange(1)} />
    <NumCell value={leftVal} editing={selected.col === EDITABLES.LEFT_VAL && selected.index === index} onSelect={() => onSelect({ col: EDITABLES.LEFT_VAL, index })} onChange={onChange(2)} />
    <DirCell value={rightDir} editing={selected.col === EDITABLES.RIGHT_DIR && selected.index === index} onSelect={() => onSelect({ col: EDITABLES.RIGHT_DIR, index })} onChange={onChange(3)} />
    <NumCell value={rightVal} editing={selected.col === EDITABLES.RIGHT_VAL && selected.index === index} onSelect={() => onSelect({ col: EDITABLES.RIGHT_VAL, index })} onChange={onChange(4)} />
  </tr>)
}

type CellSelector = {
  col: Keyof<EDITABLES>, index: number
} | { col: null, index: null }

const CsvEditor: FC = () => {
  const [timesheet, setTimesheet] = useState<Array<[number, number, number, number, number]>>(csv);
  const [selected, setSelected] = useState<CellSelector>({ col: null, index: null })
  const handleChange = (rowIndex: number) => (index: number) => (val: number) => {
    setTimesheet(s => {
      const row = s[rowIndex]
      const newRow = Array(...row);
      newRow[index] = val;
      const updated = update(s, { $splice: [[rowIndex, 1, newRow]] })
      updated.sort((a,b) => a[0] - b[0])
      return updated;
    });
  }
  return (<div>
    <table onClick={() => setSelected({ col: null, index: null })}>
      <thead>
        <tr>
          <th>--</th>
          <th>time (x10msec)</th>
          <th>left dir</th>
          <th>left value</th>
          <th>right dir</th>
          <th>right value</th>
        </tr>
      </thead>
      <tbody>
        {timesheet.map((data, i) => (<TimeRow key={i} index={i} data={data} selected={selected} onSelect={setSelected} onChange={handleChange(i)} />))}
      </tbody>
    </table>
    <WaveForm />
  </div>)
}

export default CsvEditor;
