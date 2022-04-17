import React, { FC, useState } from "react";
import update from "immutability-helper";
import TimeRow from "./Row";

const csv: TimeSheetRow[] = [
  [0, 0, 0, 0, 0],
  [100, 1, 30, 1, 40],
  [200, 0, 30, 0, 40],
  [300, 1, 30, 1, 40],
  [400, 0, 30, 0, 40],
  [500, 1, 30, 1, 40],
  [600, 0, 30, 0, 40],
  [700, 1, 30, 1, 40],
  [800, 0, 30, 0, 40],
];


const CsvTable: FC = () => {

  const [timesheet, setTimesheet] = useState<Array<[number, number, number, number, number]>>(csv);
  const [selected, setSelected] = useState<CellSelector>({ col: null, index: null });
  const handleChange = (rowIndex: number) => (index: number) => (val: number) => {
    setTimesheet((s) => {
      const row = s[rowIndex];
      const newRow = Array(...row) as TimeSheetRow;
      newRow[index] = val;
      const updated = update(s, { $splice: [[rowIndex, 1, newRow]] });
      updated.sort((a, b) => a[0] - b[0]);
      return updated;
    });
  };
  const insert = () => {
    setTimesheet((s) => {
      const row = s[s.length - 1];
      const newRow = Array(...row) as TimeSheetRow;
      const updated = update(s, { $push: [newRow] });
      updated.sort((a, b) => a[0] - b[0]);
      return updated;
    });
  }
  return (<table onClick={() => setSelected({ col: null, index: null })}>
    <thead>
      <tr>
        <th>--</th>
        <th>10ms</th>
        <th>L dir</th>
        <th>L value</th>
        <th>R dir</th>
        <th>R value</th>
      </tr>
    </thead>
    <tbody>
      {timesheet.map((data, i) => (
        <TimeRow
          key={i}
          index={i}
          data={data}
          selected={selected}
          onSelect={setSelected}
          onChange={handleChange(i)}
        />
      ))}
      <tr><button onClick={insert}>add</button></tr>
    </tbody>
  </table>)
}

export default CsvTable;
