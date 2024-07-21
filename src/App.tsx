import "bootstrap/dist/css/bootstrap.min.css";
import "./App.css";
import MainScreen from "./components/MainScreen.tsx";
import { debug } from "./utils/console.ts";

function App() {
  debug("App render");

  return <MainScreen />;
}

export default App;
