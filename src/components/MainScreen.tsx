import { FC } from "react";
import TopNavBar from "./TopNavBar.tsx";
import TilesCanvas from "./TilesCanvas.tsx";

type MainScreenProps = {
  //
};

const MainScreen: FC<MainScreenProps> = () => {
  return (
    <>
      <TopNavBar />
      <TilesCanvas />
    </>
  );
};

export default MainScreen;
