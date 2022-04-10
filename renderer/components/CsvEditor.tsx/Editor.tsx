import React, { FC, MutableRefObject, useEffect, useRef } from "react";
import WaveForm from "./WaveForm";

type Props = {

};

const CsvEditor: FC<Props> = ({ }) => {
    const canvas: MutableRefObject<HTMLCanvasElement> = useRef(null);

    useEffect(() => {
        if (!canvas || !canvas.current) return;
        const cvs = canvas.current;
        const ctx = cvs.getContext("2d");
        ctx.fillRect(0,0,50,100);
    })

    return (<div>
        <canvas ref={canvas}></canvas>
        <WaveForm />
    </div>)
}

export default CsvEditor;
