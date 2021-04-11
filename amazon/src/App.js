import "./App.css";
import Header from "./component/Header";
import Home from "./component/Home";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import Checkout from "./component/Checkout";
import Login from "./component/Login";

function App() {
  return (
    <Router>
      <div className="App">
     
        <Switch>
          <Route exact path="/">
          <Header />
            <Home />
          </Route>
          <Route path="/login">
            <Login/>
          </Route>
          <Route path="/checkout">
          <Header />
              <Checkout/>
          </Route>
        </Switch>
      </div>
    </Router>
  );
}

export default App;
