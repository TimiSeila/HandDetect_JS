import React, { useState, useEffect, useRef } from "react";
import "./Cursor.css";
import { useDispatch, useSelector } from "react-redux";
import { selectCursor, updateIsClicked } from "./cursorSlice";
import { selectHandTrack } from "../HandTrack/handTrackSlice";
import { findDistance } from "../../utils/HandTrackUtils";

const Cursor = ({ cursorPosition }) => {
  const [smoothedPosition, setSmoothedPosition] = useState({ x: 0, y: 0 });
  const cursorRef = useRef(null);

  const cursorRedux = useSelector(selectCursor);
  const handTrack = useSelector(selectHandTrack);
  const dispatch = useDispatch();

  const minWidth = 0;
  const maxWidth = window.innerWidth;
  const minHeight = 0;
  const maxHeight = window.innerHeight;
  const smoothingFactor = 0.2;

  useEffect(() => {
    const updateSmoothedPosition = () => {
      const newX = maxWidth - cursorPosition.x * (maxWidth - minWidth);
      const newY = minHeight + cursorPosition.y * (maxHeight - minHeight);

      setSmoothedPosition((prev) => ({
        x: prev.x + smoothingFactor * (newX - prev.x),
        y: prev.y + smoothingFactor * (newY - prev.y),
      }));
    };

    updateSmoothedPosition();
  }, [cursorPosition, maxWidth, minWidth, minHeight, maxHeight]);

  useEffect(() => {
    let valueZ = handTrack?.lmList[0]?.z;
    if (
      findDistance(handTrack.lmList[4], handTrack.lmList[8]) /
        (valueZ * 1000000) <
      0.13
    ) {
      if (!cursorRedux.isClicked) {
        dispatch(updateIsClicked(true));
        cursorRef.current.className = "custom-cursor-active";
      }
    } else if (cursorRedux.isClicked) {
      dispatch(updateIsClicked(false));
      cursorRef.current.className = "custom-cursor";
    }
  }, [handTrack.lmList]);

  return (
    <div
      className="custom-cursor"
      ref={cursorRef}
      style={{ left: smoothedPosition.x, top: smoothedPosition.y }}
    />
  );
};

export default Cursor;
