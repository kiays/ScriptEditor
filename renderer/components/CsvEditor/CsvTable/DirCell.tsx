import React,{FC} from "react";

type DirCellProps = {
  value: number;
  editing: boolean;
  onSelect: () => void;
  onChange: (val: number) => void;
};
const DirCell: FC<DirCellProps> = ({ value, editing, onChange, onSelect }) => {
  return (
    <td
      onClick={(e) => {
        e.stopPropagation();
        onSelect();
      }}>
      {!editing ? (
        value === 0 ? (
          "left"
        ) : (
          "right"
        )
      ) : (
        <select defaultValue={value} onChange={(e) => onChange(Number(e.target.value))}>
          <option value={0}>left : 0</option>
          <option value={1}>right : 1</option>
        </select>
      )}
    </td>
  );
};

export default DirCell;
