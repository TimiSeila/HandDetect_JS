import * as mp from "@mediapipe/tasks-vision";
import * as mpd from "@mediapipe/drawing_utils";

let video;
let canvasElement;
let canvasCtx;

let handLandmarker;
let results;
let lastVideoTime = -1;

export const handTrackSetup = async () => {
  const vision = await mp.FilesetResolver.forVisionTasks(
    "https://cdn.jsdelivr.net/npm/@mediapipe/tasks-vision@latest/wasm"
  );

  handLandmarker = await mp.HandLandmarker.createFromOptions(vision, {
    baseOptions: {
      modelAssetPath: "/src/shared/models/hand_landmarker.task",
      delegate: "GPU",
    },
    numHands: 1,
    runningMode: "VIDEO",
  });

  video = document.getElementById("video");
  canvasElement = document.getElementById("output_canvas");
  canvasCtx = canvasElement.getContext("2d");

  navigator.mediaDevices
    .getUserMedia({
      video: { width: 640, height: 480 },
    })
    .then((stream) => {
      video.srcObject = stream;
      video.addEventListener("loadeddata", predictWebcam);
    });
};

async function predictWebcam() {
  canvasElement.width = video.videoWidth;
  canvasElement.height = video.videoHeight;

  const nowInMs = Date.now();
  if (lastVideoTime !== video.currentTime) {
    lastVideoTime = video.currentTime;
    results = handLandmarker.detectForVideo(video, nowInMs);
  }
  canvasCtx.save();
  canvasCtx.clearRect(0, 0, canvasElement.width, canvasElement.height);
  if (results.landmarks) {
    for (const landmarks of results.landmarks) {
      mpd.drawConnectors(
        canvasCtx,
        landmarks,
        mp.HandLandmarker.HAND_CONNECTIONS,
        {
          color: "#FF0000",
          lineWidth: 2,
        }
      );
      mpd.drawLandmarks(canvasCtx, landmarks, {
        color: "#FF0000",
        lineWidth: 2,
      });
    }
  }
  canvasCtx.restore();

  window.requestAnimationFrame(predictWebcam);
}
