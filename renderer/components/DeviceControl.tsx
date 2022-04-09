import React, { FC, useEffect, useState } from "react";

type Props = {
  device: BluetoothRemoteGATTCharacteristic | null;
};

const DeviceControl: FC<Props> = ({ device }) => {
  const [leftVal, setLeftVal] = useState(0);
  const [rightVal, setRightVal] = useState(0);
  const [inverted, setInversion] = useState(false);
  const disabled = device == null;
  useEffect(() => {
    if (!device) return;
    if (inverted) {
      device.writeValue(Buffer.from([5, leftVal, rightVal]));
    } else {
      device.writeValue(Buffer.from([5, rightVal, leftVal]));
    }
  }, [device, leftVal, rightVal, inverted]);

  return (
    <div>
      <button onClick={() => setInversion(!inverted)}>invert</button>
      <div>
        <label className="slider-label">Right:{rightVal}</label>
        <input
          type="range"
          defaultValue={rightVal}
          disabled={disabled}
          onChange={(e) => setRightVal(Number(e.target.value))}
          min={0}
          max={256}
        />
      </div>
      <div>
        <label className="slider-label">Left:{leftVal}</label>
        <input
          type="range"
          defaultValue={leftVal}
          disabled={disabled}
          onChange={(e) => setLeftVal(Number(e.target.value))}
          min={0}
          max={256}
        />
      </div>
    </div>
  );
};

export default DeviceControl;
