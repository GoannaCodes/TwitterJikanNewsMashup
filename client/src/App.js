import './App.css';
import {BrowserRouter as Router, Switch, Route} from "react-router-dom";

import Navbar from "./components/Navbar";
import Home from "./pages/Home";
import {Tweets} from "./pages/Tweets";


function App() {
  return (
    <div className="App">
      <Router>
        <Navbar />
        <Switch>
          <Route exact path="/" component={Home}/>
          {/* <Route exact path="/news" component={News}/>  */}
          <Route exact path="/tweets" component={Tweets}/>
        </Switch>
      </Router>
    </div>
  );
}

export default App;
