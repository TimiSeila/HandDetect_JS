import * as mpd from "@mediapipe/drawing_utils";
import React, { useEffect, useRef } from "react";
import { useSelector } from "react-redux";
import { selectHandTrack } from "./HandTrack/handTrackSlice";

// Component used only for debugging
const HandTrackVisuals = ({ video }) => {
  const handTrack = useSelector(selectHandTrack);
  const canvasRef = useRef(null);
  const contextRef = useRef(null);

  useEffect(() => {
    if (!video || !canvasRef.current) {
      return;
    }

    if (!contextRef.current) {
      contextRef.current = canvasRef.current.getContext("2d");
      if (!contextRef.current) {
        console.error("Canvas context not available");
        return;
      }
    }

    canvasRef.current.width = video.videoWidth;
    canvasRef.current.height = video.videoHeight;

    contextRef.current.save();
    contextRef.current.clearRect(
      0,
      0,
      canvasRef.current.width,
      canvasRef.current.height
    );
    if (handTrack.lmList.length > 0) {
      mpd.drawLandmarks(contextRef.current, handTrack.lmList, {
        color: "#FF0000",
        lineWidth: 2,
      });
    }
    contextRef.current.restore();
  }, [handTrack.lmList, video]);

  return video ? (
    <canvas
      ref={canvasRef}
      className="output_canvas"
      style={{ position: "absolute", left: "0px", top: "0px" }}
    ></canvas>
  ) : null;
};

export default HandTrackVisuals;
