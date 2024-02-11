import "./App.css";
import CustomCursor from "./features/customCursor/Cursor";
import HandTrack from "./features/HandTrack/HandTrack";
import { useSelector } from "react-redux";
import { selectHandTrack } from "./features/HandTrack/handTrackSlice";

function App() {
  const handTrack = useSelector(selectHandTrack);

  return (
    <>
      <div>
        <HandTrack
          videoEnabled={true}
          trackerEnabled={true}
          visualsEnabled={false}
        />
        {handTrack.lmList?.length > 0 && (
          <CustomCursor cursorPosition={handTrack.lmList[0]} />
        )}
      </div>
    </>
  );
}

export default App;
