import React,{FC} from "react";

type NumCellProps = {
  value: number;
  editing: boolean;
  onSelect: () => void;
  onBlur: () => void;
  onChange: (val: number) => void;
};

const NumCell: FC<NumCellProps> = ({ value, editing, onSelect, onChange, onBlur }) => {
  return (
    <td
      onClick={(e) => {
        e.stopPropagation();
        onSelect();
      }}>
      {!editing ? (
        value
      ) : (
        <input
          type="number"
          defaultValue={value}
          style={{ width: "3rem" }}
          onKeyDown={(e) => {
            if (e.key == "Enter") e.currentTarget.blur();
          }}
          onBlur={(e) => {
            onChange(Number(e.target.value));
            onBlur();
          }}
        />
      )}
    </td>
  );
};

export default NumCell;
