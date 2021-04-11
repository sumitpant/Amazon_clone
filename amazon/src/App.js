import "./App.css";
import {useEffect} from 'react'
import Header from "./component/Header";
import Home from "./component/Home";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import Checkout from "./component/Checkout";
import Login from "./component/Login";
import {auth} from './firebase/firebase'
import { useStateValue } from "./Context/StateProvider";

function App() {
  const[{},dispatch]=useStateValue()
  useEffect(()=>{
    auth.onAuthStateChanged(authUser=>{
      console.log()
      if(authUser){
        console.log("thi user",authUser)
        dispatch({
          type:'SET_USER',
          user:authUser
        })

      }
      else{
        //uer is logged out
        dispatch({
          type:'SET_USER',
          user:null
        })
      }
    })
},[])
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
