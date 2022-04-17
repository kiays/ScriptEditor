import React, { FC } from "react";
import WaveForm from "./WaveForm";
import CsvTable from "./CsvTable/Inxdex";



const CsvEditor: FC = () => {

  return (
    <div>
      <CsvTable />
      <WaveForm />
    </div>
  );
};

export default CsvEditor;
