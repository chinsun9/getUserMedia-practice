import { useRef } from "react";
import "./App.css";

function App() {
  const videoRef = useRef<HTMLVideoElement>(null);

  const handleClick = () => {
    if (
      !("mediaDevices" in navigator && "getUserMedia" in navigator.mediaDevices)
    ) {
      alert("카메라에 접근할 수 없습니다");
      return;
    }

    navigator.mediaDevices
      .getUserMedia({
        video: true,
        audio: true,
      })
      .then((stream) => {
        const video = videoRef.current;
        if (!video) return;
        video.srcObject = stream;
        video.addEventListener("loadedmetadata", () => {
          video.play();
        });
      })
      .catch(alert);
  };
  return (
    <>
      <label>
        사진 찍기
        <input type="file" accept="image/*" capture="environment" />
      </label>

      <label>
        영상 찍기
        <input type="file" accept="video/*" capture="environment" />
      </label>

      <div>
        <div
          style={{
            display: "flex",
            background: "gray",
          }}
        >
          <video ref={videoRef} muted />
        </div>

        <button onClick={handleClick}>웹캠</button>
      </div>
    </>
  );
}

export default App;
