import "./App.css";
import "./assets/font/font.css";
import Intro from "./pages/intro";
import MainScreen from "./pages/mainScreen";
import SelectPlate from "./pages/selectPlate";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";

function App() {
  return (
    <Router>
      <div className="mainBG">
        <Route exact path="/" render={() => <Intro />} />
        <Route exact path="/selectPlate" render={() => <SelectPlate />} />
        <Route exact path="/mainPlate/:plateId" render={() => <MainScreen />} />
      </div>
    </Router>
  );
}

export default App;
