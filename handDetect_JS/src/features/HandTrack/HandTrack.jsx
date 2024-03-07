import React, { useEffect, useRef, useState } from "react";
import * as mp from "@mediapipe/tasks-vision";
import { useDispatch, useSelector } from "react-redux";
import HandTrackVisuals from "../HandTrackVisuals";
import {
  selectHandTrack,
  updateHandedness,
  updateLmList,
} from "./handTrackSlice";

import { isSelectedHand } from "../../utils/HandTrackUtils";

const HandTrack = ({ videoEnabled, trackerEnabled, visualsEnabled }) => {
  let handLandmarker;
  const [lastVideoTime, setLastVideoTime] = useState(-1);
  const [loaded, setLoaded] = useState(false);
  const videoRef = useRef(null);
  const handTrack = useSelector(selectHandTrack);
  const dispatch = useDispatch();

  //Camera setup useEffect
  useEffect(() => {
    console.log("Setting up camera...");
    const setupCamera = async () => {
      try {
        const video = videoRef.current;

        const stream = await navigator.mediaDevices.getUserMedia({
          video: { width: 640, height: 480 },
        });

        video.srcObject = stream;
        video.style.display = videoEnabled ? "inline" : "none";
        video.addEventListener("loadedmetadata", () => initTracking(video));
        console.log("Camera setup successful");
      } catch (err) {
        console.error("Camera setup failed", err);
      }
    };

    setupCamera();
  }, []);

  //Initializes hand tracking
  const initTracking = async (video) => {
    if (trackerEnabled) {
      try {
        await handTrackTaskSetup();

        predictWebcam(video);
      } catch (error) {
        console.error("Error tracking hand:", error);
      }
    }
  };

  //Creates a new task for hand tracking
  const handTrackTaskSetup = async () => {
    try {
      console.log("Setting up hand task...");
      const vision = await mp.FilesetResolver.forVisionTasks(
        "https://cdn.jsdelivr.net/npm/@mediapipe/tasks-vision@latest/wasm"
      );

      handLandmarker = await mp.HandLandmarker.createFromOptions(vision, {
        baseOptions: {
          modelAssetPath: `https://storage.googleapis.com/mediapipe-models/hand_landmarker/hand_landmarker/float16/1/hand_landmarker.task`,
          delegate: "GPU",
        },
        numHands: 1,
        runningMode: "VIDEO",
      });
      console.log("Hand task setup successful");
      setLoaded(true);
    } catch (err) {
      console.error("Hand task setup failed", err);
    }
  };

  //Run the hand tracking task
  const predictWebcam = (video) => {
    const nowInMs = Date.now();
    if (lastVideoTime !== video.currentTime) {
      setLastVideoTime(video.currentTime);
      let results = handLandmarker.detectForVideo(video, nowInMs);

      if (isSelectedHand(0, results)) {
        dispatch(updateLmList(results?.landmarks[0]));
        dispatch(updateHandedness(results?.handedness[0]));
      } else {
        dispatch(updateLmList({}));
        dispatch(updateHandedness({}));
      }
      window.requestAnimationFrame(() => predictWebcam(video));
    }
  };

  return (
    <>
      <video
        ref={videoRef}
        id="video"
        style={{ position: "absolute", left: "0px", top: "0px" }}
        autoPlay
      ></video>
      {loaded ? (
        <>
          {visualsEnabled && (
            <HandTrackVisuals
              results={handTrack.lmList}
              video={videoRef.current}
            />
          )}
        </>
      ) : (
        <p
          style={{
            position: "absolute",
            top: innerHeight / 2,
            left: innerWidth / 2,
            fontSize: "3vw",
          }}
        >
          Loading...
        </p>
      )}
    </>
  );
};

export default HandTrack;
