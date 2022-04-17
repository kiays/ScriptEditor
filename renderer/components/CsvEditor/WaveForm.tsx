import React, { FC, MutableRefObject, useEffect, useRef, useState } from "react";
import WaveSurfer from "wavesurfer.js";

const WaveForm: FC<> = () => {
  const ref: MutableRefObject<HTMLDivElement> = useRef(null);
  const [wavesurfer, setWaveSurfer] = useState<WaveSurfer>(null);
  const [playing, setPlaying] = useState(false);
  useEffect(() => {
    if (!ref.current) return;
    const elem = ref.current;
    const ws = WaveSurfer.create({
      container: elem,
      waveColor: "violet",
      progressColor: "purple",
      responsive: true,
    });
    window.ws = ws;
    setWaveSurfer(ws);
  }, [ref, setWaveSurfer]);

  const handleFileOpen = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files.length == 0) return;
    const files = e.target.files;
    wavesurfer.loadBlob(files[0]);
  };

  const handlePlayPause = () => {
    setPlaying(!playing);
    wavesurfer.playPause();
  };
  return (
    <div>
      <div ref={ref}> </div>
      <button type="button" onClick={handlePlayPause}>
        {playing ? "pause" : "play"}
      </button>
      <input disabled={wavesurfer == null} type="file" onChange={handleFileOpen}></input>
    </div>
  );
};

export default WaveForm;
