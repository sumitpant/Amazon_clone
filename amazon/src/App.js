import "./App.css";
import { useEffect } from "react";
import Header from "./component/Header";
import Home from "./component/Home";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import Checkout from "./component/Checkout";
import Login from "./component/Login";
import { auth } from "./firebase/firebase";
import { useStateValue } from "./Context/StateProvider";
import Payment from "./component/Payment";
import { loadStripe } from "@stripe/stripe-js";
import { Elements } from "@stripe/react-stripe-js";
import Orders from "./component/Orders";

const promise = loadStripe(
  "pk_test_51IfSoESBe8g8j7vzfIgSK3Uqm2iG6Qa7UnhKhppmmym0ENnqZZ4F51llI1JeuS1vAfqi9wwO1wc2DbuT37sGl2qm00rUXNua1X"
);

function App() {
  const [{}, dispatch] = useStateValue();
  useEffect(() => {
    auth.onAuthStateChanged((authUser) => {
      console.log();
      if (authUser) {
        console.log("thi user", authUser);
        dispatch({
          type: "SET_USER",
          user: authUser,
        });
      } else {
        //uer is logged out
        dispatch({
          type: "SET_USER",
          user: null,
        });
      }
    });
  }, []);
  return (
    <Router>
      <div className="App">
        <Switch>
          <Route exact path="/">
            <Header />
            <Home />
          </Route>
          <Route path="/login">
            <Login />
          </Route>
          <Route path="/checkout">
            <Header />
            <Checkout />
          </Route>
          <Route path="/payment">
            <Header />
            {/* HOC */}
            <Elements stripe={promise}>
              <Payment />
            </Elements>
          </Route>
          <Route path="/orders">
            <Header/>
            <Orders/>

          </Route>
        </Switch>
      </div>
    </Router>
  );
}

export default App;
