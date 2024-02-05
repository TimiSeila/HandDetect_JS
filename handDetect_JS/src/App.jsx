import { useEffect } from "react";
import { handTrackSetup } from "./modules/HandTrackModule";
import "./App.css";

function App() {
  useEffect(() => {
    handTrackSetup();
  }, []);

  return (
    <>
      <p>Hand Track</p>
      <div>
        <video
          id="video"
          style={{ position: "absolute", left: "0px", top: "0px" }}
          autoPlay
          playsInline
        ></video>
        <canvas
          className="output_canvas"
          id="output_canvas"
          style={{ position: "absolute", left: "0px", top: "0px" }}
        ></canvas>
      </div>
    </>
  );
}

export default App;
