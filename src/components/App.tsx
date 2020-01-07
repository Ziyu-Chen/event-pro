import React from "react";
import FirstPage from "./FirstPage";
import SecondPage from "./SecondPage";
import { connect } from "react-redux";
import './App.css';
import { State } from "../store/types";
import { AppBar, Toolbar, Button } from "@material-ui/core";
import logo from "../img/logo.png"
interface AppProps {
  loggedIn: boolean
}

const mapStateToProps = (state: State) => (
  {
    loggedIn: state.loggedIn
  }
)

class App extends React.Component<AppProps, {}> {
  render() {
    return (
      <div className="App">
        <AppBar position="static">
          <Toolbar>
            <img src={logo} style={{width:"70px"}}/>
          </Toolbar>
        </AppBar>
        {!this.props.loggedIn ? <FirstPage /> : <SecondPage />}
      </div>
    );
  }
}

export default connect(mapStateToProps)(App);
