import React from "react";
import { render } from "react-dom";
import DeviceControl from "./components/DeviceControl";
import { useBluetooth } from "./useBluetooth";

const App = () => {
  const { device, connected, connecting, requestDevice } = useBluetooth();

  return (
    <div>
      App
      <button
        onClick={() => requestDevice()}
        disabled={connected || connecting}>
        connect
      </button>
      <button
        onClick={() => {
          device.service.device.gatt.disconnect();
        }}
        disabled={!connected}>
        disconnect
      </button>
      <DeviceControl device={device} />
    </div>
  );
};

render(<App />, document.getElementById("root"));
