import React from "react";
import FirstPage from "./FirstPage";
import SecondPage from "./SecondPage";
import { connect } from "react-redux";
import "./App.css";
import { State } from "../store/types";
import { AppBar, Toolbar, Button } from "@material-ui/core";
import logo from "../img/logo.png";
import AddIcon from "@material-ui/icons/Add";
import ViewHeadlineIcon from "@material-ui/icons/ViewHeadline";
import { showEventInfo, showBuildEvent } from "../store/actions";
interface AppProps {
  loggedIn: boolean;
  showEventInfo: () => void;
  showBuildEvent: () => void;
}

const mapStateToProps = (state: State) => ({
  loggedIn: state.loggedIn
});

const mapDispatchToProps = (dispatch: any) => ({
  showEventInfo: () => dispatch(showEventInfo()),
  showBuildEvent: () => dispatch(showBuildEvent())
});

class App extends React.Component<AppProps, {}> {
  render() {
    return (
      <div className="App">
        <AppBar position="static">
          <Toolbar>
            <img
              src={logo}
              style={{ width: "70px" }}
              alt="the logo is not loaded"
            />
            {this.props.loggedIn ? (
              <Button onClick={this.props.showEventInfo}>
                <ViewHeadlineIcon />
                My Events
              </Button>
            ) : null}
            {this.props.loggedIn ? (
              <Button onClick={this.props.showBuildEvent}>
                <AddIcon />
                Build Event
              </Button>
            ) : null}
          </Toolbar>
        </AppBar>
        {!this.props.loggedIn ? <FirstPage /> : <SecondPage />}
      </div>
    );
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(App);
