import { useEffect, useState } from "react";
import "./App.css";
import Start from "./Start";
import Game from "./Game";
import { checkScreenSize } from "./assets/lib/getSizeScreen";
import MobileAccessBanner from "./DesktopBanner";

function App() {
  const [isStarted, setIsStarted] = useState(false);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const screenWidth = checkScreenSize();
    if (screenWidth < 768) setIsMobile(true);

    window.addEventListener("resize", () => {
      const screenWidth = checkScreenSize();
      if (screenWidth < 768) setIsMobile(true);
      else setIsMobile(false);
    });
    return () => {
      window.removeEventListener("resize", () => {});
    };
  }, []);
  if(!isMobile) return <MobileAccessBanner />

  return (
    <>
      <div className="container">
        {isStarted ? <Game /> : <Start setIsStarted={setIsStarted} />}
      </div>
    </>
  );
}

export default App;
