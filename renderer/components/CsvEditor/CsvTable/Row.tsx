import React, { FC } from "react";
import NumCell from "./NumCell"
import DirCell from "./DirCell"
import { EDITABLES } from "./constants"

type RowProps = {
  data: TimeSheetRow;
  index: number;
  selected: CellSelector;
  onSelect: (cell: CellSelector) => void;
  onChange: (index: number) => (value: number) => void;
};
const TimeRow: FC<RowProps> = ({
  data: [time, leftDir, leftVal, rightDir, rightVal],
  index,
  selected,
  onSelect,
  onChange,
}) => {
  const blur = () => onSelect({ col: null, index: null });
  return (
    <tr onClick={blur}>
      <td></td>
      <NumCell
        value={time}
        editing={selected.col === EDITABLES.TIME && selected.index === index}
        onSelect={() => onSelect({ col: EDITABLES.TIME, index })}
        onChange={onChange(0)}
        onBlur={blur}
      />
      <DirCell
        value={leftDir}
        editing={selected.col === EDITABLES.LEFT_DIR && selected.index === index}
        onSelect={() => onSelect({ col: EDITABLES.LEFT_DIR, index })}
        onChange={onChange(1)}
      />
      <NumCell
        value={leftVal}
        editing={selected.col === EDITABLES.LEFT_VAL && selected.index === index}
        onSelect={() => onSelect({ col: EDITABLES.LEFT_VAL, index })}
        onChange={onChange(2)}
        onBlur={blur}
      />
      <DirCell
        value={rightDir}
        editing={selected.col === EDITABLES.RIGHT_DIR && selected.index === index}
        onSelect={() => onSelect({ col: EDITABLES.RIGHT_DIR, index })}
        onChange={onChange(3)}
      />
      <NumCell
        value={rightVal}
        editing={selected.col === EDITABLES.RIGHT_VAL && selected.index === index}
        onSelect={() => onSelect({ col: EDITABLES.RIGHT_VAL, index })}
        onChange={onChange(4)}
        onBlur={blur}
      />
    </tr>
  );
};

export default TimeRow
